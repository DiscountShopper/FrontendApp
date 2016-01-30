angular.module('grocery.services')
.factory('Stores', function($http) {
  var stores = [];
  return {
    all: function () {
        var postal_code = 'G6P6S8';
        return $http.get('http://localhost:3000/api/stores/' + postal_code).then(function(data){ 
            stores = data.data;
            return stores; 
         });
    },
    get: function (storeId) {
        return _.find(stores, function(x){ return x.guid == storeId; });
    }
  };
});