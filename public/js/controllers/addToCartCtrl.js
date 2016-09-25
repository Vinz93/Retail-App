app.controller('addToCartCtrl',function ($scope, User) {
  var cart = undefined;
  var newItem = undefined;
  $scope.success = false;
  var me = $scope.user

  $scope.addToCart = function (product){
    var newItem = true;
    var obj = { product: product._id, quantity: 1};

    if(!me){
      alert("you must be logged");
      return false;
    }
    cart = me.data.cart.map(function (i) {
      console.log(i.product._id,' ',obj.product);
      console.log(i.product._id === obj.product);
      if(i.product._id === obj.product){
        i.quantity++;
        newItem = false;
        console.log('is new ? ', newItem)
      }
      return  i;
    });
    console.log('is new ? ', newItem);
    if(newItem)
      cart.push(obj);

    User.cart(cart)
      .then(function (user) {
        $scope.success = true;
        $scope.user = user.data;
        me = user.data;
        console.log(user.data.data)
      })
      .catch(function (err) {
        $scope.success = false;
        console.log(err);
      });

  }
});
