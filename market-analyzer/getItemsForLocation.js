const { MarketOrder } = require("../utils/models.js");

async function getItemsForLocation(location, auctionType) {
    
    const agg = await MarketOrder.aggregate([
        { $match: { LocationId: location, AuctionType: auctionType }},
        { $group: { 
            _id: 
            { name: "$ItemTypeId", quality: "$QualityLevel" }, 
            price: auctionType === 'offer' ? { $min: '$UnitPriceSilver' } : { $max: '$UnitPriceSilver' },
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

module.exports = { getItemsForLocation }