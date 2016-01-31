angular.module('grocery.services')

.factory('Items', function($http) {
  // Might use a resource here that returns a JSON array
  var products = [];
  return {
    all: function() {
      return $http.get(baseUrl + "publications/MAXI/83bb2f98-3bd6-488e-843d-b9fb977e4f11").then(function(data){
          data.data[0].items.forEach(function(i){ i.title_fr = util.toUpper(i.title_fr); });
          products = data.data[0].items;
          return products;
      });
    },

    get: function(itemId) {
      return _.find(products, function(p){ return p.id == itemId; });
    }
  };
});
