angular.module('grocery.controllers')
.controller('ItemsController', function($scope, $stateParams, Items) {
    $scope.products = Items.all();
});