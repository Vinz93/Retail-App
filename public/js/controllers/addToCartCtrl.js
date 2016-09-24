app.controller('addToCartCtrl',function ($scope, User) {
  var me = $scope.user;

  $scope.addToCart = function (product) {
    var obj = { product: product._id, quantity: 1};

    if(!me){
      alert("you must be logged");
      return false;
    }

    me.data.cart.push(obj);

    User.cart(me.data.cart)
      .then(function (user) {
        $scope.success = true;
        console.log(user);
      })
      .catch(function (err) {
        $scope.success = false;
        console.log(err);
      });

  }
});
