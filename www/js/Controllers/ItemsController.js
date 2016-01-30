angular.module('grocery.controllers')
.controller('ItemsController', function($scope, $stateParams, Items) {
    $scope.products = Items.all();
  $scope.controller = "item";
  $scope.isCategory = false;
  $scope.title = "Articles"
});
