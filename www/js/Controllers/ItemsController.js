angular.module('grocery.controllers')
.controller('ItemsController', function($scope, $stateParams, Items) {
    $scope.refresh = function(){
        $scope.products = Items.all();
        $scope.$broadcast('scroll.refreshComplete');
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
