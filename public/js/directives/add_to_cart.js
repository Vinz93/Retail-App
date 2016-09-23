app.directive('addToCart',function () {
  return {
    replace: true,
    restric: "E",
    templateUrl: "views/directives/add_to_cart.html",
    controller: 'addToCartCtrl'
  }
});
