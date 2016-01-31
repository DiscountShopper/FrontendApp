angular.module('grocery.controllers')
.controller('ItemsController', function($scope, $stateParams, $ionicLoading, Items) {
    
    $scope.refresh = function(){
        $scope.products = Items.all();
        $scope.$broadcast('scroll.refreshComplete');
        $ionicLoading.hide();
    }
    
    $scope.$on('refresh', function(event, args) {
        $scope.refresh();
    });
    
    if (postalCode != ''){
        $scope.refresh();
    }
    
    $scope.controller = "item";
    $scope.isNested = false;
    $scope.title = "Articles"
});
