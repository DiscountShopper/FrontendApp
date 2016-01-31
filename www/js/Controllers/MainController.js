angular.module('grocery.controllers')
.controller('MainController', function($scope, $rootScope, $stateParams, $state, $ionicModal, $ionicSideMenuDelegate, $ionicLoading, $ionicPopup, $ionicListDelegate, Cart) {

    var regex = new RegExp(/^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( )?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i);
    var newMarket = market;
    $rootScope.data = {
        postalCode: localStorage.getItem("postalCode") || ''
    };

    $scope.cartBadge = util.sumCart();

    $ionicModal.fromTemplateUrl('templates/modal-postalcode.html' , {scope: $scope, hardwareBackButtonClose: false, backdropClickToClose: false, focusFirstInput: true}).then(function (modal) {
        $scope.modal = modal;
        if ($rootScope.data.postalCode == '')
            $scope.modal.show();
    });

    $scope.validatePostalCode = function(postalCode){
        return !regex.test(postalCode);
    };

    $scope.submitPostalCode = function(code){
        $ionicLoading.show({ template: 'Loading...' });
        $rootScope.data.postalCode = code.toUpperCase();

        if ($rootScope.data.postalCode.length == 7){
            $rootScope.data.postalCode = $rootScope.data.postalCode.substring(0,3) + $rootScope.data.postalCode.substring(4, 7);
        }

        localStorage.setItem('postalCode', $rootScope.data.postalCode);
        $scope.modal.hide();
        $scope.$broadcast('refresh');
        $ionicSideMenuDelegate.toggleLeft(false);
        $scope.setLatLng();
    };

    $scope.submitSettings = function(code){
        if (newMarket != market){
            market = newMarket;
            localStorage.setItem('market', market);
        }
        $scope.submitPostalCode(code);
    }

    $scope.setMarket = function(item){
        newMarket = item;
    }

  $scope.detectPosition = function(){
    $ionicLoading.show({ template: 'Loading...' });
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition($scope.getPostalCode);
    }
  }

  $scope.setLatLng = function(){
      var geocoder= new google.maps.Geocoder();
      geocoder.geocode( { 'address': $rootScope.data.postalCode }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
         $rootScope.data.latlng = {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()};
        localStorage.setObject("latlng",$rootScope.data.latlng);
        }
      });
  }

    if ($rootScope.data.postalCode != '')
        $scope.setLatLng();

  $scope.getPostalCode = function(position){
      $ionicLoading.show({ template: 'Loading...' });
      $rootScope.data.latlng = {lat: position.coords.latitude, lng: position.coords.longitude};
      var geocoder= new google.maps.Geocoder();
      geocoder.geocode({'location': $rootScope.data.latlng}, function(results, status) {
        $ionicLoading.hide();
        if (status === google.maps.GeocoderStatus.OK) {
            if (results[2]) {
                $rootScope.data.postalCode = results[2].address_components[0].long_name;
            } else {
                window.alert('No results found');
            }
        }
    });
  }

  $scope.addCart = function (product)
  {
    var productList = localStorage.getObject("cartProducts");
    product.CartQuantity = 1;
    if (productList == null || productList.length == 0){
      localStorage.setObject("cartProducts", [product]);
    }
    else {
      var cartProduct = _.find(productList, function(p){ return p.identifier == product.identifier; });
      if (cartProduct)
        cartProduct.CartQuantity++;
      else
        productList.push(product);
      localStorage.setObject("cartProducts", productList);
    }
    $rootScope.$broadcast('refreshCart');
    $scope.cartBadge++;
    $ionicListDelegate.closeOptionButtons();
  };

  $scope.changeQuantity = function (product, quantity)
  {
    var productList = Cart.all();
    if (productList.length > 0) {
        var product = _.find(productList, {identifier: product.identifier});
        $scope.cartBadge += quantity - product.CartQuantity;
        product.CartQuantity = quantity;
        localStorage.setObject("cartProducts", productList);
        $scope.$broadcast('refreshCart');
    }
    $ionicListDelegate.closeOptionButtons();
  };

  $scope.deleteCartMain = function(product){
      $scope.cartBadge -= product.CartQuantity;
  }

    $scope.redirectToMap = function(){
        $state.go('tab.cart-map')
    };

  $scope.showPopupQuantity = function (product)
  {
    $scope.data.cartQuantity = product.CartQuantity;
    $ionicPopup.show({
      template: '<input type="number" ng-model="data.cartQuantity">',
      title: 'Entrer la quantité de votre item',
      subTitle: 'Entrer un nombre',
      scope: $scope,
      buttons: [
        {text: 'Annuler'},
        {
          text: '<b>Enregistrer</b>',
          type: 'button-positive',
          onTap: function (quantity)
          {
            if (!$scope.data.cartQuantity)
            {
              quantity.preventDefault();
            }
            else
            {
              $scope.changeQuantity(product, $scope.data.cartQuantity);
              return $scope.data.cartQuantity;
            }
          }
        }
      ]
    });
  };

  $scope.getBackDefault = function(href){
    window.location.href = href;
  };
});
