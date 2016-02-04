angular.module('grocery.controllers')
.controller('StoreController', function($scope, $stateParams, $ionicLoading, $compile, Stores) {
    
    var loadMap = function(position) {
        var mapOptions = { center: position, zoom: 16, mapTypeId: google.maps.MapTypeId.ROADMAP };
        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        var marker = new google.maps.Marker({
            position: position,
            map: $scope.map,
            title: $scope.store.name
        });
    };
    
    Stores.getForCartItem($stateParams.storeId, $stateParams.bannerCode).then(function(data){
          $scope.store = data;
          loadMap(new google.maps.LatLng($scope.store.latitude, $scope.store.longitude));
      });
});
