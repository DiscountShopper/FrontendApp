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
    getForCartItem: function (storeId, banner_code) {
        var current_market = banner_code ? util.getMarketFromBanner(banner_code) : market;
        return $http.get(baseUrl + current_market + '/stores/' + postalCode).then(function(data){
            return _.find(data.data, function(x){ return x.guid == storeId; });
        });
    },
    getByBanner: function(banner_code){
        return $http.get(baseUrl + market + '/stores/' + banner_code + '/' + postalCode).then(function(data){
            return _.sortBy(data.data, 'distance');
        });
    },
    getByMarket: function(current_market){
        return $http.get(baseUrl + current_market + '/stores/' + postalCode).then(function(data){
            return _.sortBy(data.data, 'distance'); 
        });
    }
  };
});
