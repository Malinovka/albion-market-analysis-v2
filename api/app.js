const express = require('express');
const { mongoConnector } = require('../utils/mongoConnector')
const profitOrderRoutes = require('./routes/profitOrders')
const itemsRoutes = require('./routes/items')

const app = express();
mongoConnector();

// Catch-all first step to allow CORS
app.use('/api', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next();
})

// Routing to specific resources
app.use('/api/profitorders', profitOrderRoutes);
app.use('/api/items', itemsRoutes);

app.listen(3001);