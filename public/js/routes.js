app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl',
    })
    .when('/main', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl',
    })
    .when('/product/:id',{
      template: '<product-detail></product-detail>',
      controller: 'productDetailCtrl',
    })
    .when('/category/:id',{
      templateUrl: 'views/category.html',
      controller: 'categoryCtrl',
    })
    .otherwise({
      redirectTo: '/'
    });
});
