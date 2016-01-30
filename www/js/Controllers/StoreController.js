angular.module('grocery.controllers')
.controller('StoreController', function($scope, $stateParams, $ionicLoading, $compile, Stores) {
     $scope.store = Stores.get($stateParams.storeId);
     
        var myLatlng = new google.maps.LatLng(43.07493,-89.381388);
        
        var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        
        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        var marker = new google.maps.Marker({
          position: myLatlng,
          map: $scope.map,
          title: 'Uluru (Ayers Rock)'
        });
      
      
});