angular.module('grocery.controllers')
  .controller('CategoryController', function ($scope, $stateParams, Categories, $ionicLoading, Items)
  {
    var itemId = $stateParams.itemId;
    $scope.refresh = function ()
    {
      var categoryId = $stateParams.categoryId;
      Categories.allFromCategory(categoryId).then(function (data)
      {
        $scope.products = data;
        console.log("Data"+data);
        $ionicLoading.hide();
      });
    };
    if (itemId === undefined)
    {
      console.log("no item");
      $scope.refresh();
      $scope.controller = "category";
      $scope.isNested = true;
    }
    else
    {
      $scope.product = Items.get(itemId);
      var pattern = new RegExp(/\d+/);
      $scope.product.EffectiveStartDate = pattern.exec($scope.product.EffectiveStartDate)[0];
      $scope.product.EffectiveEndDate = pattern.exec($scope.product.EffectiveEndDate)[0];
    }



    $scope.$on('refresh', function (event, args)
    {
      $scope.refresh();
    });
  });
