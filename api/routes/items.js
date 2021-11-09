const express = require('express')
const { Item } = require('../../utils/models');

const router = express.Router()

let query = {};

router.get('/', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')

    if (req.query.search) {
        query = {
            $text: {
                $search: req.query.search, 
                $caseSensitive: false, 
                $language: 'none'
            }
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
