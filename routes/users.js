const express = require('express');
const bodyParser = require('body-parser');
var User = require('./../models/user');

var router = express.Router();
router.use(bodyParser.json());

router.route('/me/cart')
  .put(function (req , res) {
    try{
      var cart = req.body.cart;
    }catch(e){
      res.status(400).json({error: "cart no especified"});
      return res;
    }
    req.user.data.cart = cart;
    req.user.save(function (err, user) {
      if(err){
        res.status(500).json({err: err.toString() });
        return res;
      }
      res.json(user);
      return res;
    });
  });

router.route('/me')
  .get(function (req,res) {
    if(!req.user){
      res.status(401).json({error: "User is not logged"});
      return res;
    }
    req.user.populate({
      path:"data.cart.product",
      model: "Product"
    },function (err,user) {
        if(err)
          res.status(500).json({error: "error searching products in cart"});
        res.json(user);
      }
    );
});


module.exports = router;
