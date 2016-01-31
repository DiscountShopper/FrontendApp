angular.module('grocery.controllers')
  .controller('CartController', function ($scope, $stateParams, $ionicLoading, Cart, Items)
  {
    $scope.refresh = function(){
        $scope.cartProducts = Cart.all();
        $scope.$broadcast('scroll.refreshComplete');
        $ionicLoading.hide();
    }
    
    $scope.$on('refresh', function(event, args) {
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
      $scope.product.effective_start_date = pattern.exec($scope.product.effective_start_date)[0];
      $scope.product.effective_end_date = pattern.exec($scope.product.effective_end_date)[0];
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
          _.extend(_.findWhere(productList, { CartQuantity: cartProduct.CartQuantity }), cartProduct);
          localStorage.setObject("cartProducts", productList);
        }
        $scope.cartProducts = productList;
      }
    };

    $scope.$on("refreshCart", function ()
    {
      $scope.refresh();
    });
  });
