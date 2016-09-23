var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    picture: {
        type: String,
        required: true
    },
    profile:{
        username:{ type: String},
        email:{ type: String}
      },
    data: {
        oauth: {
            type: String,
            required: true
        },
        cart: [{
            product: {
                type: Number
            },
            quantity: {
                type: Number,
                default: 1,
                min: 1
            }
        }]
    }

});


module.exports = mongoose.model('User', userSchema, 'users');
