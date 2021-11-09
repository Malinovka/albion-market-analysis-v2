const { mongoConnector } = require('../utils/mongoConnector')
const { checkItemCollection } = require('./updateItems')
const { getItemsForLocation } = require('./getItemsForLocation')
const { generateProfitOrder } = require('./generateProfitOrder')
const { deleteProfitOrders } = require('./deleteProfitOrders')
const locations = require('./locations.json')

BUY_ORDER_REQUEST = 'request';
SELL_ORDER_OFFER = 'offer';

async function main() {
    mongoConnector();
    checkItemCollection();

    while(true) {
        const startTime = new Date();

        const buyLocations = {};
        const sellLocations = {};

        for (location in locations) {
            location = parseInt(location);
            buyLocations[location] = await getItemsForLocation(location, SELL_ORDER_OFFER);
            sellLocations[location] = await getItemsForLocation(location, BUY_ORDER_REQUEST);
        }

        const promiseStack = [];

        for (buyLocation in locations) {
            buyLocation = parseInt(buyLocation);

            for (sellLocation in locations) {
                sellLocation = parseInt(sellLocation);
                
                if (buyLocation != sellLocation) {
                    let sellItems = sellLocations[sellLocation];
                    let buyItems = buyLocations[buyLocation];
                    
                    for (item in buyItems) {
                        if (item in sellItems && buyItems[item].price < sellItems[item].price * 0.94) {
                            promiseStack.push(
                                generateProfitOrder(buyItems[item].name, buyItems[item].quality, buyLocation, sellLocation)
                            );
                        }
                    }
                }
            }
        }
        const promiseResults = await Promise.allSettled(promiseStack);
        const rejected = promiseResults.filter(result => result.status === 'rejected').map(result => result.reason);
        if (rejected.length > 0) { 
            console.log(rejected);
        }

        await deleteProfitOrders(startTime);
    }
}

main().catch(console.error);