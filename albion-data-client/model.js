const mongoose = require('mongoose')
const { Schema } = mongoose;

const marketOrderSchema = new Schema({
    _id: Number,
    ItemTypeID: String,
    LocationID: Number,
    QualityLevel: Number,
    EnchantmentLevel: Number,
    UnitPriceSliver: Number,
    Amount: Number,
    AuctionType: String,
    Expires: Date,
    ItemGroupTypeId: String
  },
  { timestamps: true }
  );
  
  const MarketOrder = mongoose.model('MarketOrder', marketOrderSchema);
  module.exports = { MarketOrder };