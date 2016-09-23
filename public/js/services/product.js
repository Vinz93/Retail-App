'use strict';
app.factory('Product', function ($http) {
  return {
    getInfo: getInfo,
    byCategory: byCategory
  };

  function getInfo(id) {
    return $http.get('/products/' + id);
  }

  function byCategory(category,price) {
    var queryParams = { price: price};
    return $http.get('/products/category/' + category, {params : queryParams});
  }

});
