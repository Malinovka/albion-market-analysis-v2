const express = require('express')
const { ProfitOrder } = require('../../utils/models');

const router = express.Router()
const locationFilters = ['BuyFrom', 'SellTo'];
let skip = 1;
let limit = 30;
let orderCount;

// Returns profitorder objects
// Default page size is 30 if none is given
// Max page size is 200

// Examples of requests:
// https://albionsniper.com/api/profitorders?page=1
// https://albionsniper.com/api/profitorders?page=1&limit=1
// https://albionsniper.com/api/profitorders?page=1&search=Carrots
// https://albionsniper.com/api/profitorders?page=1&BuyFrom=Caerleon&SellTo=Bridgewatch

router.get('/', function (req, res, next) {
    let query = {};

    // Building query if any exists
    if (req.query !== {}) {
        for (let field of locationFilters) {
            if (field in req.query) {
                const array = req.query[field].split(',')
                query[`${field}.Name`] = { $in: array }
            }
        }
        
        if (req.query.limit) {
            if (req.query.limit > 200) {
                limit = 200;
            }
            else {
                limit = Number(req.query.limit);
            }
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

    // Get count of queried orders for pagination
    ProfitOrder.count(query, function( e, count){
        queryOrderCount = count;
    })

    ProfitOrder
    .find(query || {})
    .sort({Profit: -1})
    .limit(limit || 30)
    .skip(skip || 0)
    // Populates the referenced market orders from the marketOrders collection
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