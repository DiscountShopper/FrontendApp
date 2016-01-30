angular.module('grocery.controllers')
.controller('MainController', function($scope, $stateParams, $ionicModal, $ionicSideMenuDelegate, $ionicLoading) {
    
    var regex = new RegExp(/^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( )?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i);
    
    if (postalCode != ''){
        $scope.postalCode = postalCode
    }
    
    $ionicModal.fromTemplateUrl('templates/modal-postalcode.html' , {scope: $scope, hardwareBackButtonClose: false, backdropClickToClose: false, focusFirstInput: true}).then(function (modal) {
        $scope.modal = modal;
        if (postalCode == '')
            $scope.modal.show();
    });
        
    $scope.validatePostalCode = function(postalCode){
        return !regex.test(postalCode);
    };
    
    $scope.submitPostalCode = function(code){
        postalCode = code.toUpperCase();
        
        if (postalCode.length == 7){
            postalCode = postalCode.substring(0,3) + postalCode.substring(4, 7);
        }
        
        $scope.postalCode = postalCode
        localStorage.setItem('postalCode', postalCode);
        $scope.modal.hide();
        $scope.$broadcast('refresh');
        $ionicSideMenuDelegate.toggleLeft(false);
        $ionicLoading.show({
            template: 'Loading...'
        });
    }
});
