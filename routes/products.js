const express = require('express');
const Product = require('./../models/product');

var router = express.Router();

router.route('/:id')
    .get(function(req, res) {
        Product.findOne({
                _id: req.params.id
            })
            .exec(handleResponse.bind(null, req, res));
    });
router.route('/category/:id')
    .get(function(req, res) {
        var sort = { name : 1};
        if(req.query.price == 1){
          sort = {"internal.aproximatePriceUSD" : 1};
        }else if(req.query.price == -1){
        sort = {"internal.aproximatePriceUSD" : -1};
        }
        Product.find({
                "category.ancestors": req.params.id
            })
            .sort(sort)
            .exec(handleResponse.bind(null, req, res));
    });

module.exports = router;

function handleResponse(req, res, err, result) {
    if (err) {
        res.status(500).json({
            err: "error searching the product "
        });
        return res;
    }
    if (!result) {
        res.status(404).json({
            err: "not found " + req.params.id
        });
        return res;
    }
    res.json(result);
    return res;
}
