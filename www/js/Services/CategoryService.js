angular.module('grocery.services')

  .factory('Categories', function() {
    // Might use a resource here that returns a JSON array
    var categories = [];
    return {
      all: function() {
        return $http.get(baseUrl + "categories").then(function(data){
          categories = data.data;
          return categories;
        });
      },
      getItems: function(categoryId) {
        return _.filter(products, function(p){ return p.CategoryId == categoryId; });
      }
    };
  });
