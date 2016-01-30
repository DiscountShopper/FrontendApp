angular.module('grocery.controllers')
.controller('MainController', function($scope, $stateParams) {
    
    $scope.validatePostalCode = function(postalCode){
        return !regex.test(postalCode);
    };
    
    $scope.showForm = function(){
        $scope.modal.show();
    };
    
    $scope.submitPostalCode = function(code){
        postalCode = code.toUpperCase();
        
        if (postalCode.length == 7){
            postalCode = postalCode.substring(0,3) + postalCode.substring(4, 7);
        }
        
        localStorage.setItem('postalCode', postalCode);
        $scope.handler.change(new postalCodeSet());
        $scope.handler.closeForm();
    }
});
