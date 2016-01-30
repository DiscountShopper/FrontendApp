angular.module('grocery.services', [])

.factory('Items', function() {
  // Might use a resource here that returns a JSON array

  return {
    all: function() {
      return products;
    },
    get: function(itemId) {
      return _.find(products, function(p){ return p.Id == itemId; });
    }
  };
});
