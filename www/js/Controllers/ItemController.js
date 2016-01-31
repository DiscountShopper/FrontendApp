angular.module('grocery.controllers')
  .controller('ItemController', function ($scope, $stateParams, Items)
  {
    $scope.product = Items.get($stateParams.itemId);
    var pattern = new RegExp(/\d+/);
    $scope.product.effective_start_date  = pattern.exec($scope.product.effective_start_date)[0];
    $scope.product.effective_end_date  = pattern.exec($scope.product.effective_end_date)[0];
  });
