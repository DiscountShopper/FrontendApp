angular.module('grocery.controllers')
  .controller('CategoryController', function ($scope, $stateParams, $http, Categories, Items)
  {
    var itemId = $stateParams.itemId;
    if (itemId === undefined)
    {
      var categoryId = $stateParams.categoryId;
      Categories.getItems(categoryId).then(function(data) {
        $scope.products = data.data;
        $ionicLoading.hide();
      });
      $scope.controller = "category";
      $scope.isNested = true;
    }
    else
    {
      $scope.product = Items.get(itemId);
      var pattern = new RegExp(/\d+/);
      $scope.product.EffectiveStartDate  = pattern.exec($scope.product.EffectiveStartDate)[0];
      $scope.product.EffectiveEndDate  = pattern.exec($scope.product.EffectiveEndDate)[0];
    }
  });
