angular.module('grocery.controllers')
  .controller('CartController', function ($scope, $stateParams, Cart, Items)
  {
    var itemId = $stateParams.itemId;
    console.log(itemId);
    if (itemId === undefined)
    {
      $scope.cartProducts = Cart.all();
      console.log($scope.cartProducts);
      $scope.controller = "cart";
      $scope.isNested = false;
    }
    else
    {
      $scope.product = Items.get(itemId);
      var pattern = new RegExp(/\d+/);
      $scope.product.EffectiveStartDate  = pattern.exec($scope.product.EffectiveStartDate)[0];
      $scope.product.EffectiveEndDate  = pattern.exec($scope.product.EffectiveEndDate)[0];
    }
  });
