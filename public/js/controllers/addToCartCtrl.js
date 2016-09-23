app.controller('addToCartCtrl',function ($scope, User) {
  var me = $scope.user;

  $scope.addToCart = function (product) {

    var obj = { product: product._id, quantity: 1};
    me.data.cart.push(obj);

    User.cart(me.data.cart)
      .then(function (user) {
        $scope.success = true;
        console.log(user.data);
      })
      .catch(function (err) {
        $scope.success = false;
        console.log(err);
      });

  }
});
