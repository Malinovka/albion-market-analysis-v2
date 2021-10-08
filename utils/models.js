const mongoose = require('mongoose')
const { Schema } = mongoose;

const marketOrderSchema = new Schema({
    _id: Number,
    ItemTypeId: String,
    LocationId: Number,
    QualityLevel: Number,
    EnchantmentLevel: Number,
    UnitPriceSilver: Number,
    Amount: Number,
    AuctionType: String,
    Expires: Date,
    ItemGroupTypeId: String
  },
  { timestamps: true }
  );
  
  const MarketOrder = mongoose.model('MarketOrder', marketOrderSchema);
  module.exports = { MarketOrder };