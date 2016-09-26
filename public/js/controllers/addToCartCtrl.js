app.controller('addToCartCtrl',function ($scope, User) {
  var cart = undefined;
  var newItem = undefined;
  var me = undefined;
  $scope.success = false;

  $scope.addToCart = function (product){
     User.getInfo()
          .then(function(res) {
              $scope.user = res.data;
          });

    newItem = true;
    var obj = { product: product._id, quantity: 1};

    if(!$scope.user){
      alert("you must be logged");
      return false;
    }
    cart = $scope.user.data.cart.map(function (i) {
      console.log(i.product," ",obj.product);
      if(i.product === obj.product){
        i.quantity++;
        newItem = false;
      }
      return  i;
    });
    if(newItem)
      cart.push(obj);

    User.cart(cart)
      .then(function (user) {
        $scope.success = true;
        $scope.user = user.data;
        me = user.data;
        console.log("updated cart",me.data.cart);
      })
      .catch(function (err) {
        $scope.success = false;
        console.log(err);
      });

  }
});
