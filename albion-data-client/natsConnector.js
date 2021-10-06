const { connect } = require('nats')

nats = {
    SERVER: 'www.albion-online-data.com:4222',
    USER: 'public',
    PASS: 'thenewalbiondata',
  }

  //Returns a subscription object that recieves messages. Can create additional
  //subscriptions for other topics if you want more than just market orders
  async function natsConnector() {
    console.log('Connecting to NATS...')
    const nc = await connect({
      servers: nats.SERVER,
      user: nats.USER,
      pass: nats.PASS,
    })
    console.log(`Connected to ${nc.getServer()}`)
  
    return nc.subscribe('marketorders.deduped')
  }

  module.exports = { natsConnector };