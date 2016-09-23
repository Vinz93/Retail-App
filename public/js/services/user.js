'use strict';
app.factory('User', function ($http) {
  return {
    getInfo: getInfo,
    cart: cart
  };

  function getInfo() {
    return $http.get('/users/me');
  }

  function cart(cart) {
    return $http.put('/users/me/cart', { cart: cart });
  }

});
