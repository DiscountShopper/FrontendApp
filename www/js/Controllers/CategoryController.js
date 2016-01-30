angular.module('grocery.controllers')
  .controller('CategoryController', function ($scope, $stateParams, Categories, Items)
  {
    var itemId = $stateParams.itemId;
    if (itemId === undefined)
    {
      var categoryId = $stateParams.categoryId
      $scope.products = Categories.getItems(categoryId);
      $scope.controller = "category";
      $scope.isCategory = true;
      $scope.title = "Categorie: " + products[0].CategoryName_fr;

    }
    else
    {
      $scope.product = Items.get(itemId);
      var pattern = new RegExp(/\d+/);
      $scope.product.EffectiveStartDate  = pattern.exec($scope.product.EffectiveStartDate)[0];
      $scope.product.EffectiveEndDate  = pattern.exec($scope.product.EffectiveEndDate)[0];
    }
  });
