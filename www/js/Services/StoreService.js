angular.module('grocery.services')
.factory('Stores', function($http) {
  var stores = [];
  return {
    all: function () {
        return $http.get(baseUrl + 'stores/' + postalCode).then(function(data){ 
            stores = _.sortBy(data.data, 'distance');
            return stores; 
         });
    },
    get: function (storeId) {
        return _.find(stores, function(x){ return x.guid == storeId; });
    }
  };
});