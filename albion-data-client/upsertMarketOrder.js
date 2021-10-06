async function upsertMarketOrder(collection, msg) {
    await collection.updateOne({ _id: msg.Id }, 
      {
      _id: msg.Id,
      ItemTypeID: msg.ItemTypeID,
      LocationID: msg.LocationID,
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