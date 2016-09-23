const express = require('express');
const Category = require('./../models/category');

var router = express.Router();

router.route('/:id')
    .get(function(req, res) {
        Category.findOne({
                _id: req.params.id
            })
            .exec(function(err, category) {
                if (err) {
                    res.status(500).json({
                        err: "error searching category"
                    });
                    return res;
                }
                if (!category) {
                    res.status(404).json({
                        err: "not found " + req.params.id
                    });
                    return res;
                }
                res.json(category);
                return res;
            });
    });
router.route('/parent/:id')
    .get(function(req, res) {
        Category.find({
                parent: req.params.id
            })
            .sort({
                _id: 1
            })
            .exec(function(err, categories) {
                if (err) {
                    res.status(500).json({
                        err: "error searching categories "
                    });
                    return res;
                }
                if (!categories) {
                    res.status(404).json({
                        err: "not found any child of " + req.params.id
                    });
                    return res;
                }
                res.json(categories);
                return res;
            });
    });



module.exports = router;
