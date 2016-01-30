angular.module('grocery.controllers')
  .controller('CategoriesController', function ($scope, $stateParams, Categories)
  {

      $scope.categories = Categories.all();

  });
