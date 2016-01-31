angular.module('grocery.services')

.factory('Items', function($http) {
  // Might use a resource here that returns a JSON array
  var products = [];
  return {
    all: function() {
      return $http.get(baseUrl + "closest/publications/" + postalCode).then(function(data){
          products = [];
          data.data.forEach(function(e){ 
              e.items.forEach(function(i){ 
                  i.title_fr = util.toUpper(i.title_fr);
                  products.push(i);
              });
          });
          products = _.sortBy(products, 'category_fr');
          return products;
      });
    },
    get: function(itemId) {
      return _.find(products, function(p){ return p.id == itemId; });
    }
  };
});
