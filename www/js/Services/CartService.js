angular.module('grocery.services')

  .factory('Cart', function() {
    // Might use a resource here that returns a JSON array

    return {
      all: function() {
        var cartProducts = localStorage.getObject("cartProducts");
        console.log("cartProducts ="+cartProducts);
        return cartProducts;
      },
      getItems: function(productId) {
        return _.find(products, function(p){ return p.Id == productId; });
      }
    };
  });
