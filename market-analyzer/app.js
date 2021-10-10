const { mongoConnector } = require('../utils/mongoConnector')
const { MarketOrder, ProfitOrder } = require('../utils/models.js');
const { checkItemCollection } = require('./updateItems')

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
//translate the item and location IDs into human readable strings
//create a profit order with the above info

    for await (const doc of agg) {
       console.log(doc);
    }

    //console.log(await MarketOrder.find().distinct('LocationId'));
}

main().catch(console.error);