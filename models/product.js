var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var connection = require('./../config/db');
// inicializate the autoincrementable _id in the db
autoIncrement.initialize(connection);
var currecyValues = {
    USD: 1,
    EUR: 1.1,
    GBP: 1.5
}
var currencySymbol = {
    USD: "$",
    EUR: "&",
    GBP: "%"
};

var productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    photos:[{ type: String}],
    price: {
        amount: {
            type: Number,
            required: true,
            set: function(v) {
                this.internal.aproximatePriceUSD = Math.floor(v * currecyValues[this.price.currency] * 100) / 100;
                return v;
            }
        },
        currency: {
            type: String,
            required: true,
            enum: ["USD", "EUR", "GBP"],
            set: function(v) {
                this.internal.aproximatePriceUSD = Math.floor(this.price.amount * currecyValues[v] * 100) / 100;
                return v;
            }
        }
    },
    internal: {
        aproximatePriceUSD: Number
    },
    category: {
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
    }
},{
  toObject: {
    virtuals: true
  },
  toJSON: {
      virtuals: true
  },
});

productSchema.virtual('displayPrice').get(function() {
    var res = this.price.amount + ' ' + currencySymbol[this.price.currency];
    return res;
});

// autoIncrement module adds a number (_id)  autoincrementable
productSchema.plugin(autoIncrement.plugin, 'Product');

module.exports = mongoose.model('Product', productSchema, 'products');
