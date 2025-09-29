'use strict';

const { Contract } = require('fabric-contract-api');

class FasaLink extends Contract {
    // ... (InitLedger, CreateLot, ReadLot, UpdateLotStatus functions remain the same) ...
    async InitLedger(ctx) { console.info('Ledger initialized'); }

    async CreateLot(ctx, id, produce, quantity, farmer) {
        const lot = { docType: 'lot', produce, quantity, farmer, owner: farmer, status: 'Harvested' };
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(lot)));
    }

    async ReadLot(ctx, id) {
        const lotJSON = await ctx.stub.getState(id);
        if (!lotJSON || lotJSON.length === 0) { throw new Error(`The lot ${id} does not exist`); }
        return lotJSON.toString();
    }

    async UpdateLotStatus(ctx, id, newStatus, newOwner) {
        const lotString = await this.ReadLot(ctx, id);
        const lot = JSON.parse(lotString);
        lot.status = newStatus;
        lot.owner = newOwner;
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(lot)));
    }
    
    // --- NEW FUNCTION ---
    // QueryLotsByFarmer finds all lots for a given farmer
    async QueryLotsByFarmer(ctx, farmer) {
        const queryString = {
            selector: {
                docType: 'lot',
                farmer: farmer
            }
        };

        const queryResults = await ctx.stub.getQueryResult(JSON.stringify(queryString));
        const allResults = [];
        let result = await queryResults.next();
        while (!result.done) {
            if (result.value && result.value.value.toString()) {
                const jsonRes = {};
                jsonRes.Key = result.value.key;
                try {
                    jsonRes.Record = JSON.parse(result.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    jsonRes.Record = result.value.value.toString('utf8');
                }
                allResults.push(jsonRes);
            }
            result = await queryResults.next();
        }
        return JSON.stringify(allResults);
    }
}

module.exports = FasaLink;
module.exports.contracts = [ FasaLink ];