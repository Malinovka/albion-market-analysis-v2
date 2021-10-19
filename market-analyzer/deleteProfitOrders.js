const { ProfitOrder } = require("../utils/models")

async function deleteProfitOrders(start) {
    await ProfitOrder.deleteMany(
        { updatedAt: { $lt: start } }
    );
}

module.exports = { deleteProfitOrders }