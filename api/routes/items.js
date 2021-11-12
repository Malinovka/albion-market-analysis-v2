const express = require('express')
const { Item } = require('../../utils/models');

const router = express.Router()

let query = {};

router.get('/', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')

    if (req.query.search) {
        query = {
            "$or": [
                { "LocalizedNames.DE-DE" :  { "$regex": req.query.search, "$options":"i"} },
                { "LocalizedNames.EN-US" :  { "$regex": req.query.search, "$options":"i"} }, 
                { "LocalizedNames.ES-ES" :  { "$regex": req.query.search, "$options":"i"} }, 
                { "LocalizedNames.FR-FR" :  { "$regex": req.query.search, "$options":"i"} }, 
                { "LocalizedNames.KO-KR" :  { "$regex": req.query.search, "$options":"i"} }, 
                { "LocalizedNames.PL-PL" :  { "$regex": req.query.search, "$options":"i"} },
                { "LocalizedNames.PT-BR" :  { "$regex": req.query.search, "$options":"i"} },
                { "LocalizedNames.RU-RU" :  { "$regex": req.query.search, "$options":"i"} },
                { "LocalizedNames.ZH-CN" :  { "$regex": req.query.search, "$options":"i"} }
            ]
        }
    }

    Item
    .find(query)
    .limit(5)
    .exec()
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => {
        res.status(500).json({error: err});
    })
})

module.exports = router;
