angular.module('grocery.controllers')
  .controller('CartController', function ($scope, $stateParams, $ionicLoading, $ionicPopup, Cart, Items)
  {
    $scope.data = {};
    $scope.refresh = function ()
    {
      $scope.cartProducts = Cart.all();
      $scope.$broadcast('scroll.refreshComplete');
      $ionicLoading.hide();
    }

    $scope.$on('refresh', function (event, args)
    {
      $scope.refresh();
    });

    var itemId = $stateParams.itemId;
    console.log(itemId);
    if (itemId === undefined && postalCode != '')
    {
      $scope.refresh();
      $scope.controller = "cart";
      $scope.isNested = false;
    }
    else
    {
      $scope.product = Items.get(itemId);
      var pattern = new RegExp(/\d+/);
      console.log(product);
      $scope.product.EffectiveStartDate = pattern.exec($scope.product.EffectiveStartDate)[0];
      $scope.product.EffectiveEndDate = pattern.exec($scope.product.EffectiveEndDate)[0];
    }

    $scope.deleteCart = function (product)
    {
      var productList = localStorage.getObject("cartProducts");
      if (productList != null && productList.length > 0)
      {
        var cartProduct = _.find(productList, {Id: product.Id});
        if (cartProduct.CartQuantity == 1)
        {
          productList = _.without(productList, _.findWhere(productList, {Id: product.Id}));

          localStorage.setObject("cartProducts", productList);
        }
        else
        {
          cartProduct.CartQuantity--;
          _.extend(_.findWhere(productList, {CartQuantity: cartProduct.CartQuantity}), cartProduct);
          localStorage.setObject("cartProducts", productList);
        }
        $scope.cartProducts = productList;
      }
    };

    $scope.changeQuantity = function (product, quantity)
    {
      var productList = localStorage.getObject("cartProducts");
      if (productList != null && productList.length > 0)
      {
        var cartProduct = _.find(productList, {Id: product.Id});
        cartProduct.CartQuantity = quantity;
        _.extend(_.findWhere(productList, {CartQuantity: cartProduct.CartQuantity}), cartProduct);
        localStorage.setObject("cartProducts", productList);
        console.log("cart prod"+cartProduct.CartQuantity);
        $scope.cartProducts = productList;
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
                $scope.changeQuantity(product,$scope.data.cartQuantity);
                return $scope.data.cartQuantity;
              }
            }
          }
        ]
      });
    }


    $scope.$on("refreshCart", function ()
    {
      $scope.refresh();
    });
  });
