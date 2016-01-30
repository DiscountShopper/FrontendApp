angular.module('grocery.controllers')
  .controller('ItemController', function ($scope, $stateParams, Items)
  {
    $scope.product = Items.get($stateParams.itemId);
    var pattern = new RegExp(/\d+/);
    $scope.product.EffectiveStartDate  = pattern.exec($scope.product.EffectiveStartDate)[0];
    $scope.product.EffectiveEndDate  = pattern.exec($scope.product.EffectiveEndDate)[0];
  });
