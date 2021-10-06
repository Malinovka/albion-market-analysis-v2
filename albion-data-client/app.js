const { JSONCodec } = require('nats')
const cron = require('node-cron')
const { natsConnector } = require('./natsConnector')
const { mongoConnector } = require('./mongoConnector')
const { upsertMarketOrder } = require('./upsertMarketOrder')
const { deleteMarketOrders } = require('./deleteMarketOrders')
const { MarketOrder } = require('./model.js')

//Big thanks to the Albion Data Project
//https://www.albion-online-data.com/

async function main() {
  //Establish subscription to NATS stream and connect to MongoDB
  //Connection deets can be changed in their respective modules
  const sub = await natsConnector();
  await mongoConnector();

  //Cron job to check for and delete expired orders
  //Currently checks every minute and deletes orders that haven't been updated in over 24 hours
  cron.schedule('* * * * *', () => {
    deleteMarketOrders();
  });

  //Codec to translate byte array into JSON
  const codec = JSONCodec();

  //Each message recieved will either update or create a document
  for await (const msg of sub) {
    upsertMarketOrder(MarketOrder, codec.decode(msg.data));
  }
}

main().catch(console.error);