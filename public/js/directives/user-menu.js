app.directive('userMenu', function() {
    return {
        replace: true,
        restric: "E",
        templateUrl: "views/directives/user-menu.html",
        controller: function($scope, User) {
            // Init de user info if exist
            User.getInfo()
                .then(function(res) {
                    $scope.user = res.data;
                });
        }
    }
});
