angular.module('grocery.services')

  .factory('Categories', function ($http,Items)
  {
    // Might use a resource here that returns a JSON array
    var categories = [];
    return {
      all: function (postalCode)
      {
        return $http.get(baseUrl + market + "/closest/categories/" + postalCode).then(function (data)
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
        return Items.all().then(function (products)
        {
          var dataz = _.filter(products, function (product)
          {
            return product.category_id == categoryId;
          });
          return dataz;
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
