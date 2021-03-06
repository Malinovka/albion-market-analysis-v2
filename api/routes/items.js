const express = require('express')
const { Item } = require('../../utils/models');

const router = express.Router()

let query = {};

// Returns item names for use with search suggestions

// Example query:
// http://localhost:3000/api/items?search=Carrots&lang=EN-US

router.get('/', function (req, res, next) {
    
    // CORS limited to local client
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    
    if (req.query.search && req.query.lang) {
        query[`LocalizedNames.${req.query.lang}`] = {
            "$regex": req.query.search, "$options":"i"
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
