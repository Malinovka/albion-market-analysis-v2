const express = require('express');
const { mongoConnector } = require('../utils/mongoConnector')
const profitOrderRoutes = require('./routes/profitOrders')


const app = express();
mongoConnector();

app.use('/', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next();
})

app.use('/profitorders', profitOrderRoutes);

app.listen(3001);