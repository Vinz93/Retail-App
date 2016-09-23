var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    parent: {
        type: String,
        ref: "Category"
    },
    ancestors: [{
        type: String,
        ref: "Category"
    }]
});

module.exports = mongoose.model('Category', categorySchema, 'categories');
