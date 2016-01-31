angular.module('grocery.controllers')
  .controller('CategoryController', function ($scope, $stateParams, Categories, $ionicLoading, Items)
  {
    var itemId = $stateParams.itemId;
    $scope.refresh = function ()
    {
      var categoryId = $stateParams.categoryId;
      Categories.allFromCategory(categoryId).then(function (data)
      {
        console.log(data);
        $scope.products = data;
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

      $scope.product = Items.getOne(itemId, $stateParams.publicationId);
      console.log($scope.product);
      var pattern = new RegExp(/\d+/);
      $scope.product.effective_start_date = pattern.exec($scope.product.effective_start_date)[0];
      $scope.product.effective_end_date = pattern.exec($scope.product.effective_end_date)[0];
    }



    $scope.$on('refresh', function (event, args)
    {
      $scope.refresh();
    });
  });
