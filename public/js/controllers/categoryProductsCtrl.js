app.controller('categoryProductsCtrl', function($scope, Product, $routeParams) {
    var category = $routeParams.id;
    $scope.price = null;
    loadProducts();

    $scope.sortByPrice = function() {
        if ($scope.price == null) {
            $scope.price = -1;
        } else {
            $scope.price *= -1;
        }
        loadProducts($scope.price);
    }

    function loadProducts(price) {
        Product.byCategory(category,price)
            .then(function(res) {
                $scope.products = res.data;
            })
            .catch(function(err) {
                console.log(err);
            });
    }
});
