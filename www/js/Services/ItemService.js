angular.module('grocery.services')
.factory('Items', function() {
  return {
    all: function() {
      return products;
    },
    get: function(itemId) {
      return _.find(products, function(p){ return p.Id == itemId; });
    }
  };
});
