'use strict';

const express = require('express');
const cors = require('cors');
const { Gateway, Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const fs = require('fs');

// IMPORTANT: Update this path to your fabric-samples directory
const FABRIC_SAMPLES_PATH = '/Users/10doshi12/Desktop/SIH_Blockchain_Demo/fabric-samples';

const app = express();
app.use(cors());
app.use(express.json());

async function main() {
    try {
        const ccpPath = path.resolve(FABRIC_SAMPLES_PATH, 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
        const caURL = ccp.certificateAuthorities['ca.org1.example.com'].url;
        const ca = new FabricCAServices(caURL);

        const walletPath = path.join(__dirname, 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        const adminIdentity = await wallet.get('admin');
        if (!adminIdentity) {
            console.log('Enrolling admin user "admin"...');
            const enrollment = await ca.enroll({ enrollmentID: 'admin', enrollmentSecret: 'adminpw' });
            const x509Identity = { credentials: { certificate: enrollment.certificate, privateKey: enrollment.key.toBytes() }, mspId: 'Org1MSP', type: 'X.509' };
            await wallet.put('admin', x509Identity);
            console.log('Successfully enrolled admin user.');
        }

        const appUserIdentity = await wallet.get('appUser');
        if (!appUserIdentity) {
            console.log('Registering and enrolling application user "appUser"...');
            const admin = await wallet.get('admin');
            const provider = wallet.getProviderRegistry().getProvider(admin.type);
            const adminUser = await provider.getUserContext(admin, 'admin');
            const secret = await ca.register({ affiliation: 'org1.department1', enrollmentID: 'appUser', role: 'client' }, adminUser);
            const enrollment = await ca.enroll({ enrollmentID: 'appUser', enrollmentSecret: secret });
            const x509Identity = { credentials: { certificate: enrollment.certificate, privateKey: enrollment.key.toBytes() }, mspId: 'Org1MSP', type: 'X.509' };
            await wallet.put('appUser', x509Identity);
            console.log('Successfully enrolled application user.');
        }

        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });
        const network = await gateway.getNetwork('mychannel');
        const contract = network.getContract('fasalink');
        console.log('Fabric gateway connected. API server is ready.');

        app.get('/api/query/:lotId', async (req, res) => {
            try {
                const result = await contract.evaluateTransaction('ReadLot', req.params.lotId);
                res.status(200).json(JSON.parse(result.toString()));
            } catch (error) { res.status(500).json({ error: error.message }); }
        });

        app.post('/api/create', async (req, res) => {
            try {
                const { id, produce, quantity, farmer } = req.body;
                await contract.submitTransaction('CreateLot', id, produce, quantity, farmer);
                res.status(201).send('Transaction submitted successfully!');
            } catch (error) { res.status(500).json({ error: error.message }); }
        });

        app.get('/api/history/:farmer', async (req, res) => {
                try {
                    const result = await contract.evaluateTransaction('QueryLotsByFarmer', req.params.farmer);
                    console.log(`History for ${req.params.farmer} retrieved successfully.`);
                    res.status(200).json(JSON.parse(result.toString()));
                } catch (error) {
                    console.error(`Failed to retrieve history: ${error}`);
                    res.status(500).json({ error: error.message });
                }
            });

        app.listen(3001, () => { console.log('API server running on port 3001'); });

    } catch (error) {
        console.error(`Failed to start the application: ${error}`);
        process.exit(1);
    }
}
main();