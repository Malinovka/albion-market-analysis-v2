const { mongoConnector } = require('../utils/mongoConnector')
const items = require('./items.json')
const { Item } = require('../utils/models.js')

mongoConnector();

async function checkItemCollection() {
    if (await Item.count() === 0) {
        updateItemCollection();
    }
}

async function updateItemCollection() {
    if (await Item.count() > 0) {
        Item.collection.drop();
    }
    Item.insertMany(items);
    Item.deleteMany({ LocalizedNames: null });
}

updateItemCollection().catch(console.error);

module.exports = { checkItemCollection };
