angular.module('grocery.controllers')
.controller('MapController', function($scope, $stateParams, $ionicLoading, $compile, Stores, Cart) {
    var products = Cart.all();
    var storeTypes = [];
    var stores = [];
    var validStores = [];
    
    products.forEach(function(product){
        var storeType = util.getMarketFromBanner(product.banner_code);
        if (storeTypes.indexOf(storeType) == -1){
            storeTypes.push(storeType);
        }
    });
    
    var i = 0;
    
    $scope.loadMap = function(){
        products.forEach(function(product){
            var store = _.find(stores, function(s){ return s.banner_code == product.banner_code; });
            if (validStores.indexOf(store) == -1){
                validStores.push(store);
            }
        });
        
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 6,
            center: {lat : 45.4913594,lng : -73.56020579999999 }
        });
        
        var waypts = [];
        validStores.forEach(function(s){
            waypts.push({
                location: { lat : s.latitude, lng : s.longitude },
                stopover: true
            });
        });
        
        var position = new google.maps.LatLng(45.4913594, -73.56020579999999);
        var mapOptions = { center: position, zoom: 16, mapTypeId: google.maps.MapTypeId.ROADMAP };
        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        
        directionsDisplay.setMap($scope.map);
        
        directionsService.route({
        origin: postalCode,
        destination: postalCode,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING
    }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        } else {
        window.alert('Directions request failed due to ' + status);
        }
    });
        
    }
    
    storeTypes.forEach(function(type){
        Stores.getByMarket(type).then(function(data){
            stores = stores.concat(data);
            i++;
            if (i == storeTypes.length){
                $scope.loadMap();
            }
        });
    });
    
    /*var marker = new google.maps.Marker({
        position: position,
        map: $scope.map,
        title: $scope.store.name
    });*/
    
});