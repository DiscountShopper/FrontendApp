angular.module('grocery.controllers')
.controller('ItemController', function($scope, $stateParams, Items) {
    $scope.product = Items.get($stateParams.itemId);
});