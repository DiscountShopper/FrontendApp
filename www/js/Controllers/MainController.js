angular.module('grocery.controllers')
.controller('MainController', function($scope, $stateParams, $ionicModal, $ionicSideMenuDelegate, $ionicLoading, $ionicPopup) {

    var regex = new RegExp(/^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( )?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i);
    var newMarket = market;
    
    if (postalCode != ''){
        $scope.postalCode = postalCode
    }

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
    

  $scope.addCart = function (product)
  {
    var productList = localStorage.getObject("cartProducts");
    _.extend(product, {CartQuantity: 1});
    console.log(product);
    if (productList == null || productList.length == 0)
    {
      localStorage.setObject("cartProducts", [product]);
    }
    else
    {
      var cartProduct = _.find(productList, {id: product.id});
      console.log(cartProduct);
      if (cartProduct !== undefined)
      {
        cartProduct.CartQuantity++;
        _.extend(_.findWhere(productList, { CartQuantity: cartProduct.CartQuantity }), cartProduct);
        localStorage.setObject("cartProducts", productList);
      }
      else
      {
        productList.push(product);
        localStorage.setObject("cartProducts", productList);
      }
    }
    console.log(productList);
    $scope.$broadcast('refreshCart');
  };

  $scope.data = {};

  $scope.changeQuantity = function (product, quantity)
  {
    var productList = localStorage.getObject("cartProducts");
    if (productList != null && productList.length > 0)
    {
      var cartProduct = _.find(productList, {id: product.id});
      console.log(cartProduct);
      cartProduct.CartQuantity = quantity;
      _.extend(_.findWhere(productList, {CartQuantity: cartProduct.CartQuantity}), cartProduct);
      localStorage.setObject("cartProducts", productList);
      $scope.$broadcast('refreshCart');
    }
  };

  $scope.showPopupQuantity = function (product)
  {
    console.log(product)
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
              //don't allow the user to close unless he enters wifi password
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
