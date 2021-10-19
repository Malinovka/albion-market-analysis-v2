const items = require('./items.json')
const { Item } = require('../utils/models.js')
const { mongoConnector } = require('../utils/mongoConnector');

async function checkItemCollection() {
    if (await Item.count() === 0) {
        updateItemCollection();
    }
}

async function updateItemCollection() {
    if (require.main === module) {
        mongoConnector();
    }
    if (await Item.count() > 0) {
        await Item.deleteMany({});
    }
    Item.insertMany(items);
    Item.deleteMany({ LocalizedNames: null });
}

updateItemCollection().catch(console.error);

module.exports = { checkItemCollection };
