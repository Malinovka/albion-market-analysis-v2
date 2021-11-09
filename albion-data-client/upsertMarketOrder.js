async function upsertMarketOrder(collection, msg) {
    const yearFromNow = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
    const weekFromNow = new Date(new Date().setDate(new Date().getDate() + 7));

    await collection.updateOne({ _id: msg.Id }, 
      {
      _id: msg.Id,
      ItemTypeId: msg.ItemTypeId,
      LocationId: msg.LocationId,
      QualityLevel: msg.QualityLevel,
      EnchantmentLevel: msg.EnchantmentLevel,
      UnitPriceSilver: msg.UnitPriceSilver,
      Amount: msg.Amount,
      AuctionType: msg.AuctionType,
      Expires: msg.Expires > yearFromNow? weekFromNow : msg.Expires,
      ItemGroupTypeId: msg.ItemGroupTypeId
      }, 
      { upsert: true });
  }

module.exports = { upsertMarketOrder };