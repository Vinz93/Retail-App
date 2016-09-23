app.controller('categoryBreadCrumbCtrl',function($scope, Category, $routeParams) {
    var categoryId = $routeParams.id;
    $scope.display = false;
    Category.getInfo(categoryId)
        .then(function(res) {
            $scope.category = res.data;
        })
        .catch(handleError);

    Category.children(categoryId)
        .then(function(res) {
            $scope.children = res.data
        })
        .catch(handleError);

    function handleError(err) {
        console.log(err);
    }

    $scope.showChildren = function() {
        if ($scope.display == true) {
            $scope.display = false
        } else {
            $scope.display = true
        }
    }
});
