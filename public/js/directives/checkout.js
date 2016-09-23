app.directive('checkout',function () {
  return {
      replace: true,
      restric: "E",
      templateUrl: "views/directives/checkout.html",
      controller: 'checkoutCtrl'
  }
});
