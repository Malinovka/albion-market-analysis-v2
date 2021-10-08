const mongoose = require('mongoose')

db = {
    URI: 'mongodb://127.0.0.1:27017/albionDB?directConnection=true&serverSelectionTimeoutMS=2000'
  }

async function mongoConnector() {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(db.URI);
    console.log(`Connected to ${mongoose.connection.host}/${mongoose.connection.name}:${mongoose.connection.port}`);
  }

module.exports = { mongoConnector };