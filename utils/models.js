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
{ timestamps: true });
 
const MarketOrder = mongoose.model('MarketOrder', marketOrderSchema);

const profitOrderSchema = new Schema({
  Item: {
    Id: String,
    Name: String,
    Enchantement: Number,
    Quality: Number
  },
  BuyFrom: {
    Id: Number,
    Name: String
  },
  SellTo: {
    Id: Number,
    Name: String
  },
  Quantity: Number,
  TotalBuyPrice: Number,
  TotalSellPrice: Number,
  Profit: Number
},
{ timestamps: true });

const ProfitOrder = mongoose.model('ProfitOrder', profitOrderSchema);

module.exports = { MarketOrder, ProfitOrder };