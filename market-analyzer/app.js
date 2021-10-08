const { mongoConnector } = require('../utils/mongoConnector')
const { MarketOrder, ProfitOrder } = require('../utils/models.js');

async function main() {
    mongoConnector();

//Create aggregator function for searching db
    const agg = MarketOrder.aggregate([
        { $match: { LocationId: 3005, AuctionType: 'request' }},
        { $sort: { UnitPriceSilver: -1 }},
        { $limit: 50 }
    ])

//TODO:
//Loop through aggregators to comapre lowest priced sell orders
//vs highest asking buy orders, for each location
//if sell order price < buy order ask then add quantity/prices
//record marketorder ids too for later reference
//create a profit order with the above info
//translate the item and location IDs into human readable
    for await (const doc of agg) {
        console.log(doc);
    }
}

main().catch(console.error);