import React, { useState, useEffect } from 'react';
import { FaTractor, FaTruck, FaStore, FaLeaf } from 'react-icons/fa';
import './HyperledgerDemo.css'; // Import the new CSS file

// --- MOCK CHAINCODE (Smart Contract Simulation) ---
// In a real app, this logic lives on the blockchain.
// Here, we simulate it to show how the frontend would interact with it.
const initialLot = {
    id: 'Lot #123',
    produce: 'Kashmiri Apples',
    quantity: '500 Kg',
    farmer: 'Kisan Agro Farms',
    history: [
        {
            txId: 'a1b2c3d4',
            timestamp: new Date().toISOString(),
            status: 'Harvested',
            owner: 'Kisan Agro Farms',
            details: 'Initial harvest recorded.'
        }
    ]
};

const HyperledgerDemo = () => {
    const [lot, setLot] = useState(initialLot);
    const [currentUser, setCurrentUser] = useState('Farmer');
    const [newStatus, setNewStatus] = useState('');
    const [details, setDetails] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Function to simulate invoking the chaincode
    const invokeChaincode = (status, details) => {
        setIsLoading(true);
        // Simulate network delay
        setTimeout(() => {
            const newTransaction = {
                txId: Math.random().toString(36).substring(2, 10),
                timestamp: new Date().toISOString(),
                status: status,
                owner: currentUser,
                details: details || `Status updated to ${status}`
            };

            setLot(prevLot => ({
                ...prevLot,
                history: [...prevLot.history, newTransaction]
            }));
            
            setNewStatus('');
            setDetails('');
            setIsLoading(false);
        }, 1500); // 1.5 second delay
    };
    
    const handleTransactionSubmit = (e) => {
        e.preventDefault();
        if (!newStatus) {
            alert('Please select a status to update.');
            return;
        }
        invokeChaincode(newStatus, details);
    };

    const userRoles = {
        'Farmer': {
            icon: <FaTractor />,
            description: 'The Farmer initiates the process by harvesting the produce and creating the initial record (the genesis block for this lot) on the ledger.',
            actions: ['Packaged']
        },
        'Distributor': {
            icon: <FaTruck />,
            description: 'The Distributor transports the produce. They update the ledger to reflect when the lot is in transit and when it is delivered to the retailer.',
            actions: ['In Transit', 'Delivered to Retailer']
        },
        'Retailer': {
            icon: <FaStore />,
            description: 'The Retailer receives the produce and makes it available to consumers. They update the ledger upon receiving the shipment.',
            actions: ['Received', 'On Shelves']
        }
    };
    
    useEffect(() => {
        // Reset form when user changes
        setNewStatus('');
        setDetails('');
    }, [currentUser]);


    return (
        <div className="demo-container">
            <header className="demo-header">
                <FaLeaf className="header-icon" />
                <h1>Hyperledger Fabric Simulation</h1>
                <p>Visualizing the FasaLink Supply Chain</p>
            </header>

            <div className="main-content">
                {/* --- ROLE SELECTOR --- */}
                <section className="card role-selector">
                    <h2>1. Select a Participant</h2>
                    <p>In Hyperledger Fabric, every participant has a defined role. Choose a role to see their perspective and available actions.</p>
                    <div className="role-buttons">
                        {Object.keys(userRoles).map(role => (
                            <button 
                                key={role} 
                                className={`role-btn ${currentUser === role ? 'active' : ''}`}
                                onClick={() => setCurrentUser(role)}
                            >
                                {userRoles[role].icon} {role}
                            </button>
                        ))}
                    </div>
                    <div className="role-description">
                        <p><strong>Current Role: {currentUser}</strong></p>
                        <p>{userRoles[currentUser].description}</p>
                    </div>
                </section>

                {/* --- ACTION SIMULATOR --- */}
                <section className="card action-simulator">
                    <h2>2. Perform an Action (Invoke Chaincode)</h2>
                    <p>The selected participant can perform actions by "invoking" a smart contract function. This creates a new transaction proposal.</p>
                    <form onSubmit={handleTransactionSubmit}>
                         <label htmlFor="status-select">Update Lot Status:</label>
                         <select id="status-select" value={newStatus} onChange={(e) => setNewStatus(e.target.value)} required>
                            <option value="">-- Choose Action --</option>
                            {userRoles[currentUser].actions.map(action => (
                                <option key={action} value={action}>{action}</option>
                            ))}
                         </select>
                         <label htmlFor="details-input">Additional Details (Optional):</label>
                         <input 
                            id="details-input" 
                            type="text" 
                            placeholder="e.g., Vehicle No. MH14-AB1234"
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                         />
                        <button type="submit" className="submit-btn" disabled={isLoading}>
                            {isLoading ? 'Submitting to Peers...' : 'Submit Transaction'}
                        </button>
                    </form>
                </section>

                {/* --- BLOCKCHAIN VISUALIZER --- */}
                <section className="card blockchain-visualizer">
                    <h2>3. The Blockchain Ledger</h2>
                     <p>Once the transaction is validated by network peers and ordered, it's committed to the ledger, forming an immutable, chained block.</p>
                    <div className="chain">
                        {lot.history.map((block, index) => (
                             <React.Fragment key={block.txId}>
                                <div className="block">
                                    <div className="block-header">Block #{index}</div>
                                    <div className="block-content">
                                        <strong>Status:</strong> {block.status}<br/>
                                        <strong>Owner:</strong> {block.owner}<br/>
                                        <strong>TxID:</strong> <span className="tx-id">{block.txId}</span>
                                    </div>
                                </div>
                                {index < lot.history.length - 1 && <div className="chain-link"></div>}
                            </React.Fragment>
                        ))}
                         {isLoading && <div className="chain-link"></div>}
                         {isLoading && <div className="block pending">Creating...</div>}
                    </div>
                </section>
                
                {/* --- TRANSACTION HISTORY --- */}
                <section className="card transaction-history">
                    <h2>4. Immutable Transaction History for {lot.id}</h2>
                    <p>Anyone with permission can query the chaincode to retrieve the full, unchangeable history of the asset.</p>
                    <div className="history-table">
                        <div className="history-header">
                            <span>Status</span>
                            <span>Owner</span>
                            <span>Details</span>
                            <span>Timestamp</span>
                        </div>
                        {lot.history.slice(0).reverse().map(tx => (
                            <div className="history-row" key={tx.txId}>
                                <span>{tx.status}</span>
                                <span>{tx.owner}</span>
                                <span>{tx.details}</span>
                                <span>{new Date(tx.timestamp).toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HyperledgerDemo;