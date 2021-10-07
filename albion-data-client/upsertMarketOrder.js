async function upsertMarketOrder(collection, msg) {

    await collection.updateOne({ _id: msg.Id }, 
      {
      _id: msg.Id,
      ItemTypeId: msg.ItemTypeId,
      LocationId: msg.LocationId,
      QualityLevel: msg.QualityLevel,
      EnchantmentLevel: msg.EnchantmentLevel,
      UnitPriceSliver: msg.UnitPriceSliver,
      Amount: msg.Amount,
      AuctionType: msg.AuctionType,
      Expires: msg.Expires,
      ItemGroupTypeId: msg.ItemGroupTypeId
      }, 
      { upsert: true });
  }

module.exports = { upsertMarketOrder };