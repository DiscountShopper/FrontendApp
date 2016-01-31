angular.module('grocery.controllers')
.controller('MainController', function($scope, $stateParams, $state, $ionicModal, $ionicSideMenuDelegate, $ionicLoading, $ionicPopup, $ionicListDelegate, Cart) {

    var regex = new RegExp(/^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( )?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i);
    var newMarket = market;
    $scope.data = {};
    
    if (postalCode != ''){
        $scope.postalCode = postalCode
    }
    
    $scope.cartBadge = util.sumCart();

    $ionicModal.fromTemplateUrl('templates/modal-postalcode.html' , {scope: $scope, hardwareBackButtonClose: false, backdropClickToClose: false, focusFirstInput: true}).then(function (modal) {
        $scope.modal = modal;
        if (postalCode == '')
            $scope.modal.show();
    });

    $scope.validatePostalCode = function(postalCode){
        return !regex.test(postalCode);
    };
    
    $scope.submitPostalCode = function(code){
        $ionicLoading.show({ template: 'Loading...' });
        postalCode = code.toUpperCase();

        if (postalCode.length == 7){
            postalCode = postalCode.substring(0,3) + postalCode.substring(4, 7);
        }

        $scope.postalCode = postalCode
        localStorage.setItem('postalCode', postalCode);
        $scope.modal.hide();
        $scope.$broadcast('refresh');
        $ionicSideMenuDelegate.toggleLeft(false);
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
      var mapURL = "http://maps.googleapis.com/maps/api/geocode/json?address=";
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
    $scope.$broadcast('refreshCart');
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
        alert("sadf");
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
});
