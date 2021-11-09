const express = require('express')
const { ProfitOrder } = require('../../utils/models');

const router = express.Router()
const locationFilters = ['BuyFrom', 'SellTo'];

router.get('/', function (req, res, next) {
    let query = {};

    if (req.query !== {}) {
        
        for (let field of locationFilters) {
            if (field in req.query) {
                const array = req.query[field].split(',')
                query[`${field}.Name`] = { $in: array }
            }
        }
    }

    ProfitOrder.find(query)
    .sort({Profit: -1})
    .limit(30)
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
        res.status(200).json(data);
    })
    .catch(err => {
        res.status(500).json({error: err});
    })
})

module.exports = router;