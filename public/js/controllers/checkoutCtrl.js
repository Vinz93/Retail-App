app.controller('checkoutCtrl',function ($scope, User) {
  User.getInfo()
      .then(function(res) {
          $scope.user = res.data;
          $scope.subTotal = calculate(res.data.data.cart);
      });

      $scope.update = function () {
          $scope.subTotal = calculate($scope.user.data.cart);
          //call api with put;
      };

      function calculate(cart) {
        var acum = 0;
        cart.forEach(function(item) {
            acum += item.product.internal.aproximatePriceUSD * item.quantity;
        });
        return Math.floor(acum * 100) / 100;
      };


});
