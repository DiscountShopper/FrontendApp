angular.module('grocery.services')
.factory('Stores', function($http) {
  return {
    all: function () {
        return $http.get(baseUrl + market + '/stores/' + postalCode).then(function(data){ 
            return _.sortBy(data.data, 'distance');; 
         });
    },
    get: function (storeId) {
        return $http.get(baseUrl + market + '/stores/' + postalCode).then(function(data){
            return _.find(data.data, function(x){ return x.guid == storeId; });
        });
    },
    getByBanner: function(banner_code){
        return $http.get(baseUrl + market + '/stores/' + banner_code + '/' + postalCode).then(function(data){
            return _.sortBy(data.data, 'distance'); 
        });
    }
  };
});