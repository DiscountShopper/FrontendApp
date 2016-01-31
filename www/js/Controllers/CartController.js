angular.module('grocery.controllers')
  .controller('CartController', function ($scope, $stateParams, $ionicLoading, Cart)
  {
    $scope.productList = localStorage.getObject("cartProducts");

    $scope.getTotal = function ()
    {
      var total = 0;
      for (var i = 0; i < $scope.productList.length; i++)
      {
        var product = $scope.productList[i];
        var price = product.price.replace(/\D+$/g, "").replace(',', '.');
        console.log(price);

        total += (price * product.CartQuantity);
      }

      $scope.totalPrice = total;
    };

    $scope.getTotal();

    $scope.refresh = function ()
    {
      $scope.cartProducts = Cart.all();
      $scope.$broadcast('scroll.refreshComplete');
      $scope.getTotal();
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
      $scope.product = _.find($scope.productList, {id: itemId});
      var pattern = new RegExp(/\d+/);
      $scope.product.effective_start_date = pattern.exec($scope.product.effective_start_date)[0];
      $scope.product.effective_end_date = pattern.exec($scope.product.effective_end_date)[0];
    }

    $scope.deleteCart = function (product)
    {
      if ($scope.productList != null && $scope.productList.length > 0)
      {
        var cartProduct = _.find($scope.productList, {id: product.id});
        console.log(cartProduct);
        console.log(cartProduct.id);

        if (cartProduct.CartQuantity == 1)
        {
          $scope.productList = _.without($scope.productList, _.findWhere($scope.productList, {id: product.id}));

          localStorage.setObject("cartProducts", $scope.productList);
        }
        else
        {
          cartProduct.CartQuantity--;
          _.extend(_.findWhere($scope.productList, {CartQuantity: cartProduct.CartQuantity}), cartProduct);
          localStorage.setObject("cartProducts", $scope.productList);
        }
        $scope.cartProducts = $scope.productList;
      }
    };






    $scope.$on("refreshCart", function ()
    {
      $scope.cartProducts = localStorage.getObject("cartProducts");
      $scope.refresh();
    });

  });
