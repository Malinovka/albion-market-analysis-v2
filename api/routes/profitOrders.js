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
        
        if (req.query.limit) {
            limit = Number(req.query.limit);
        }

        if (req.query.page) {
            skip = Number((req.query.page - 1) * limit);
        }

        if (req.query.search) {
            query[`$or`] = [
                { "Item.LocalizedNames.DE-DE" :  { "$regex": req.query.search, "$options":"i"} },
                { "Item.LocalizedNames.EN-US" :  { "$regex": req.query.search, "$options":"i"} }, 
                { "Item.LocalizedNames.ES-ES" :  { "$regex": req.query.search, "$options":"i"} }, 
                { "Item.LocalizedNames.FR-FR" :  { "$regex": req.query.search, "$options":"i"} }, 
                { "Item.LocalizedNames.KO-KR" :  { "$regex": req.query.search, "$options":"i"} }, 
                { "Item.LocalizedNames.PL-PL" :  { "$regex": req.query.search, "$options":"i"} },
                { "Item.LocalizedNames.PT-BR" :  { "$regex": req.query.search, "$options":"i"} },
                { "Item.LocalizedNames.RU-RU" :  { "$regex": req.query.search, "$options":"i"} },
                { "Item.LocalizedNames.ZH-CN" :  { "$regex": req.query.search, "$options":"i"} }
            ];
        }
    }

    ProfitOrder.count(query, function( e, count){
        queryOrderCount = count;
    })

    ProfitOrder
    .find(query || {})
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
        res.status(200).json(
            {
                orders: data,
                orderCount: queryOrderCount
            }
        );
    })
    .catch(err => {
        res.status(500).json({error: err});
    })
})

module.exports = router;