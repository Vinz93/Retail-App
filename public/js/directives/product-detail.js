app.directive('productDetail', function() {
    return {
        replace: true,
        restric: "E",
        templateUrl: "views/directives/product-detail.html",
        controller: function($scope, Product, $routeParams, $location) {
            var productId = $routeParams.id;
            Product.getInfo(productId)
                    .then(function (res) {
                      $scope.product = res.data;
                    })
                    .catch(function (err) {
                      console.log(err);
                      $location.path("/");
                    });


        }
    }
});
