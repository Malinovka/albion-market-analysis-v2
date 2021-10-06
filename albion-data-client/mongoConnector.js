const mongoose = require('mongoose')

db = {
    URI: 'mongodb+srv://root:root@cluster0.aekb6.mongodb.net/albionDB?retryWrites=true&w=majority'
  }

async function mongoConnector() {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(db.URI);
    console.log(`Connected to ${mongoose.connection.host}/${mongoose.connection.name}:${mongoose.connection.port}`);
  }

module.exports = { mongoConnector };