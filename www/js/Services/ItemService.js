angular.module('grocery.services')

.factory('Items', function($http, $ionicLoading, $ionicPopup) {
  // Might use a resource here that returns a JSON array
  var products = [];
  return {
    all: function() {
      return $http.get(baseUrl + "groceries/closest/publications/" + postalCode).then(function(data){
          products = [];
          data.data.forEach(function(e){
              e.items.forEach(function(i){
                  i.title_fr = util.toUpper(i.title_fr);
                  i.words = i.key_words ? i.key_words.join(' ') : '';
                  products.push(i);
              });
          });
          products = _.sortBy(products, 'category_fr');
          return products;
        });
      },

      get: function (itemId)
      {
        return _.find(products, function (p)
        {
          return p.id == itemId;
        });
      },

      getOne: function (itemId, publicationId)
      {
        return $http.get(baseUrl + "products/" + publicationId + "/" + itemId).then(function (product)
        {
          product.title_fr = util.toUpper(i.title_fr);
          return products;
        });
      },
    };
  });
