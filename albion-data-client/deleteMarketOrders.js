
const { MarketOrder } = require('../utils/models.js')

//Age in hours that a post will be deleted if it hasn't been updated:
MAX_AGE_HOURS = 24;

//Time in hours to subtract from the expiration date
//This removes orders that would expire before anyone could realistically act upon them
//Currently set to one hour just to see how well that works
EXPIRATION_MODIFIER = 1;

//Deletes old orders by checking {Expires} and {updatedAt}
async function deleteMarketOrders () {
  //const session = await MarketOrder.startSession();
  //session.startTransaction();

  await MarketOrder.deleteMany({
    $or: [
      { Expires: { $lte: new Date(Date.now() - (EXPIRATION_MODIFIER * 3600000)) } },
      { updatedAt: { $lte: new Date(Date.now() - (MAX_AGE_HOURS * 3600000)) } },
      // Temporary fix to remove potentially fake buy requests
      { $and: [
          { AuctionType: "request" },
          { UnitPriceSilver: { $gte: 1000000 } }
      ] }
    ]
  }
  //, { session }
  );

  //await session.commitTransaction();
  //session.endSession();
}

module.exports = { deleteMarketOrders }

