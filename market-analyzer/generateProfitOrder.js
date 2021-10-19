const { MarketOrder, ProfitOrder, Item } = require("../utils/models.js")
const { calculateOrderValues } = require("./calculateOrderValues.js")

BUY_ORDER_REQUEST = 'request';
SELL_ORDER_OFFER = 'offer';

async function generateProfitOrder(item, quality, buyLocation, sellLocation) {

    const offers = await MarketOrder.aggregate([
        { $match: { ItemTypeId: item, LocationId: buyLocation, QualityLevel: quality, AuctionType: SELL_ORDER_OFFER }},
        { $sort: { UnitPriceSilver: 1 }}
    ])

    const requests = await MarketOrder.aggregate([
        { $match: { ItemTypeId: item, LocationId: sellLocation, QualityLevel: quality, AuctionType: BUY_ORDER_REQUEST }},
        { $sort: { UnitPriceSilver: -1 }}
    ])

    const itemQuery = await Item.findOne({ UniqueName: item });

    if (offers.length && requests.length) {
        const newProfitOrder = calculateOrderValues(offers, requests);

        newProfitOrder.Item.LocalizedNames = itemQuery["LocalizedNames"];

        if (newProfitOrder.Quantity) {
            await ProfitOrder.findOneAndUpdate(
                { 
                    'Item.Id': item,
                    'BuyFrom.Id': buyLocation,
                    'SellTo.Id': sellLocation,
                    'Item.Quality': quality
                }, 
                    newProfitOrder,
                {
                    upsert: true
                }
            )
        }
    } 
}

module.exports = { generateProfitOrder }