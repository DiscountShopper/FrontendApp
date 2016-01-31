angular.module('grocery.services')

  .factory('Categories', function ($http)
  {
    // Might use a resource here that returns a JSON array
    var categories = [];
    return {
      all: function (postalCode)
      {
        return $http.get(baseUrl + "closest/categories/" + postalCode).then(function (data)
        {
          categories = data.data;
          var allProducts = _.first(categories);
          categories = _.sortBy(categories, 'name');
          categories.unshift(allProducts);
          return categories;
        });
      },
      allFromCategory: function (categoryId)
      {
        console.log(categoryId)
        return $http.get(baseUrl + "publications/MAXI/83bb2f98-3bd6-488e-843d-b9fb977e4f11").then(function (data)
        {
          data.data[0].items.forEach(function (i)
          {
            i.title_fr = util.toUpper(i.title_fr);
          });
          var products = data.data[0].items;
          console.log("swag"+products);
          return _.filter(products, function (p)
          {
            return p.CategoryId == categoryId;
          });
        });
      },
      getItems: function (categoryId)
      {
        return _.filter(products, function (p)
        {
          return p.CategoryId == categoryId;
        });
      }
    };
  });
