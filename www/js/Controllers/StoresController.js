angular.module('grocery.controllers')
.controller('StoresController', function($scope, $stateParams, Stores) {
     Stores.all().then(function(data) {
        $scope.stores = data;
        $scope.$broadcast('scroll.refreshComplete');
     });
});