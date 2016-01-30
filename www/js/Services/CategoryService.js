angular.module('grocery.services')

  .factory('Categories', function() {
    // Might use a resource here that returns a JSON array

    return {
      all: function() {
        var categories = products;
        return categories;
      },
      getItems: function(categoryId) {
        return _.filter(products, function(p){ return p.CategoryId == categoryId; });
      }
    };
  });
