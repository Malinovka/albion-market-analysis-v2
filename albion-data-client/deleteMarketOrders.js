
const { MarketOrder } = require('./model.js')

//Age in hours that a post will be deleted if it hasn't been updated:
MAX_AGE_HOURS = 24;

//Deletes old orders by checking {Expires} and {updatedAt}
async function deleteMarketOrders () {
  const { deletedCount } = await MarketOrder.deleteMany({
    $or: [
      { Expires: { $lte: new Date() } },
      { updatedAt: { $lte: new Date(Date.now() - (MAX_AGE_HOURS * 3600000)) } }
    ]
  })
  if (deletedCount > 0) {
    console.log(`Deleted ${deletedCount} expired orders`)
  }
}

module.exports = { deleteMarketOrders }

