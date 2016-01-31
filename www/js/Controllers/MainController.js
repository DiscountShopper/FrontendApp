angular.module('grocery.controllers')
.controller('MainController', function($scope, $stateParams, $ionicModal, $ionicSideMenuDelegate, $ionicLoading) {

    var regex = new RegExp(/^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( )?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i);

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
        $ionicLoading.show({
            template: 'Loading...'
        });
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
      var cartProduct = _.find(productList, {Id: product.Id});
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
    $scope.$broadcast('refreshCart');
  };
});
