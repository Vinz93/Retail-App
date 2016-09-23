app.directive('categoryBreadCrumb', function() {
    return {
        replace: true,
        restric: "E",
        templateUrl: "views/directives/category-bread-crumb.html",
        controller: 'categoryBreadCrumbCtrl'
    }
});
