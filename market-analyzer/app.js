const { mongoConnector } = require('../utils/mongoConnector')
const { MarketOrder, ProfitOrder, Item } = require('../utils/models.js');
const { checkItemCollection } = require('./updateItems')
const { locations } = require('./locations.js')

BUY_ORDER_REQUEST = 'request';
SELL_ORDER_OFFER = 'offer';

async function main() {
    mongoConnector();
    checkItemCollection();

    buyLocations = {};
    sellLocations = {};

    for (location in locations) {
        location = parseInt(location);
        buyLocations[location] = await getItemsForLocation(location, SELL_ORDER_OFFER);
        sellLocations[location] = await getItemsForLocation(location, BUY_ORDER_REQUEST);

    }

    console.log('done downloading');

    for (buyLocation in locations) {
        buyLocation = parseInt(buyLocation);

        for (sellLocation in locations) {
            sellLocation = parseInt(sellLocation);
            
            if (buyLocation != sellLocation) {
                let sellItems = sellLocations[sellLocation];
                let buyItems = buyLocations[buyLocation];
                
                for (item in buyItems) {
                    if (item in sellItems && buyItems[item].price < sellItems[item].price * 0.94) {
                        generateProfitOrder(buyItems[item].name, buyItems[item].quality, buyLocation, sellLocation);
                    }
                }
            }
        }
    }


        //Create aggregator function for searching db
    // const agg = await MarketOrder.aggregate([
    //     { $match: { LocationId: 3005, AuctionType: 'request' }},
    //     { $sort: { UnitPriceSilver: -1 }},
    //     { $limit: 50 }
    // ])

//TODO:
//Loop through aggregators to comapre lowest priced sell orders
//vs highest asking buy orders, for each location
//if sell order price < buy order ask then add quantity/prices
//record marketorder ids too for later reference
//translate the item and location IDs into human readable strings
//create a profit order with the above info
 
    

    // for await (const doc of agg) {
    //    console.log(doc);
    // }

    //console.log(await MarketOrder.find().distinct('LocationId'));

}

//Gets a list of distinct items from a market
//Returns object entries { itemName : price } 
//with price being min or max depending on auctiontype
async function getItemsForLocation(location, auctionType) {
    
    const minPrice = { $min: '$UnitPriceSilver' };
    const maxPrice = { $max: '$UnitPriceSilver' };
    
    const agg = await MarketOrder.aggregate([
        { $match: { LocationId: location, AuctionType: auctionType }},
        { $group: { 
            _id: 
            { name: "$ItemTypeId", quality: "$QualityLevel" }, 
            price: auctionType === 'offer' ? minPrice : maxPrice,
        }}
    ])

     const items = {};
     for (doc of agg) {
         items[doc._id.name + doc._id.quality] = {
             name: doc._id.name,
             quality: doc._id.quality,
             price: doc.price
         };
    }     

    return items;
}

//Loops through and compares buy and sell orders
async function generateProfitOrder(item, quality, buyLocation, sellLocation) {

    const offers = await MarketOrder.aggregate([
        { $match: { ItemTypeId: item, LocationId: buyLocation, QualityLevel: quality, AuctionType: SELL_ORDER_OFFER }},
        { $sort: { UnitPriceSilver: 1 }}
    ])

    const requests = await MarketOrder.aggregate([
        { $match: { ItemTypeId: item, LocationId: sellLocation, QualityLevel: quality, AuctionType: BUY_ORDER_REQUEST }},
        { $sort: { UnitPriceSilver: -1 }}
    ])

    if (offers && requests) {
        const newProfitOrder = await calculateOrderValues(offers, requests);

        if (newProfitOrder) {
            await ProfitOrder.findOneAndUpdate(
                { 
                    'Item.Id': item,
                    'Item.Quality': quality,
                    'BuyFrom.Id': buyLocation,
                    'SellTo.Id': sellLocation
                }, 
                    newProfitOrder,
                {
                    upsert: true
                }
            )
    
        }
    }

    
}

async function calculateOrderValues(offers, requests) {
    const newProfitOrder = {
        Item: {
            Id: offers[0].ItemTypeId,
            Enchantment: offers[0].EnchantmentLevel,
            Quality: offers[0].QualityLevel
        },
        BuyFrom: {
            Id: offers[0].LocationId,
            Name: locations[offers[0].LocationId]
        },
        SellTo: {
            Id: requests[0].LocationId,
            Name: locations[requests[0].LocationId]
        },
        Quantity: 0,
        TotalBuyPrice: 0,
        TotalSellPrice: 0,
        Profit: 0,
        Orders: {
            BuyFrom: new Set(),
            SellTo: new Set()
        }
    }

    while(true) {
        if (!requests[0].Amount) {            
            requests.shift();
            if (!requests.length) {
                break;
            }
        }

        if (!offers[0].Amount) {
            offers.shift();
            if (!offers.length) {
                break;
            }
        }
        
        if (requests[0].UnitPriceSilver * 0.94 > offers[0].UnitPriceSilver) {
            newProfitOrder.Quantity++;
            newProfitOrder.TotalSellPrice += requests[0].UnitPriceSilver;
            newProfitOrder.TotalBuyPrice += offers[0].UnitPriceSilver;
            newProfitOrder.Orders.SellTo.add(requests[0]._id);
            newProfitOrder.Orders.BuyFrom.add(offers[0]._id);
            offers[0].Amount--;
            requests[0].Amount--;

        }
        else {
            break;
        }

    }

    newProfitOrder.Orders.SellTo = Array.from(newProfitOrder.Orders.SellTo);
    newProfitOrder.Orders.BuyFrom = Array.from(newProfitOrder.Orders.BuyFrom);
    newProfitOrder.TotalSellPrice = Math.ceil(newProfitOrder.TotalSellPrice * 0.94);
    newProfitOrder.Profit = newProfitOrder.TotalSellPrice - newProfitOrder.TotalBuyPrice
    return newProfitOrder;

}


main().catch(console.error);