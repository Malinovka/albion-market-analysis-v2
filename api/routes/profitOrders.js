const express = require('express')
const { ProfitOrder } = require('../../utils/models');

const router = express.Router()
const locationFilters = ['BuyFrom', 'SellTo'];
let skip = 1;
let limit = 30;
let orderCount;

router.get('/', function (req, res, next) {
    let query = {};

    if (req.query !== {}) {
        for (let field of locationFilters) {
            if (field in req.query) {
                const array = req.query[field].split(',')
                query[`${field}.Name`] = { $in: array }
            }
        }
        
        if ('limit' in req.query) {
            limit = Number(req.query.limit);
        }

        if ('page' in req.query) {
            skip = Number((req.query.page - 1) * limit);
        }
    }

    ProfitOrder.count({}, function( e, count){
        orderCount = count;
    })

    ProfitOrder.find(query || {})
    .sort({Profit: -1})
    .limit(limit || 30)
    .skip(skip || 0)
    .populate({
        path: 'Orders',
        populate: [{
            path: 'BuyFrom',
            model: 'MarketOrder',
            options: {
                sort: { 'UnitPriceSilver': 1 }
            }
        }, {
            path: 'SellTo',
            model: 'MarketOrder',
            options: {
                sort: { 'UnitPriceSilver': -1 }
            }
        }]
    })
    .exec()
    .then(data => {
        res.status(200).json({orders: data, orderCount: orderCount});
    })
    .catch(err => {
        res.status(500).json({error: err});
    })
})

module.exports = router;