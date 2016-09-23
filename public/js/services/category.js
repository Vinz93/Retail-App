'use strict';
app.factory('Category', function ($http) {
  return {
    getInfo: getInfo,
    children: children
  };

  function getInfo(id) {
    return $http.get('/categories/' + id);
  }

  function children(id) {
    return $http.get('/categories/parent/' + id);
  }

});
