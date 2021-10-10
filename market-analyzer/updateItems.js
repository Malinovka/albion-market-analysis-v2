const { mongoConnector } = require('../utils/mongoConnector')
const items = require('./items.json')
const { Item } = require('../utils/models.js')

mongoConnector();

async function updateItems() {
    if (await Item.count() > 0) {
        Item.collection.drop();
    }
    Item.insertMany(items);
    Item.deleteMany({ LocalizedNames: null });
}

updateItems().catch(console.error);

module.exports = { updateItems };