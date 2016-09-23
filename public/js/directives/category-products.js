app.directive('categoryProducts', function() {
    return {
        replace: true,
        restric: "E",
        templateUrl: "views/directives/category-products.html",
        controller: 'categoryProductsCtrl'
    }
});
