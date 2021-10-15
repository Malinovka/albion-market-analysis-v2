const { JSONCodec } = require('nats')
const cron = require('node-cron')
const { natsConnector } = require('./natsConnector')
const { mongoConnector } = require('../utils/mongoConnector')
const { upsertMarketOrder } = require('./upsertMarketOrder')
const { deleteMarketOrders } = require('./deleteMarketOrders')
const { MarketOrder } = require('../utils/models.js')

//Big thanks to the Albion Data Project
//https://www.albion-online-data.com/

async function main() {
  //Establish subscription to NATS stream and connect to MongoDB
  //Connection deets can be changed in their respective modules
  const sub = await natsConnector();
  await mongoConnector();

  //Cron job to check for and delete expired orders.
  //Timers can be modifed in the deleteMarketOrders module.
  //Currently checks every minute and deletes orders that 
  //haven't been updated in over 24 hours or will expire within an hour

  cron.schedule('* * * * *', () => {
    deleteMarketOrders();
  });

  //Codec to translate byte array into JSON
  const codec = JSONCodec();
  let i =0;
  //Each message recieved will either update or create a document
  for await (const msg of sub) {
    for (doc of codec.decode(msg.data)) {
      upsertMarketOrder(MarketOrder, doc);
    }
  }
}

main().catch(console.error);