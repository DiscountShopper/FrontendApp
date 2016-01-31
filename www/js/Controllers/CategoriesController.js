angular.module('grocery.controllers')
  .controller('CategoriesController', function ($scope, $stateParams, $ionicLoading, Categories)
  {
    $scope.refresh = function ()
    {

      Categories.all($scope.postalCode).then(function (data)
      {
        $scope.categories = data;
        $scope.$broadcast('scroll.refreshComplete');
        $ionicLoading.hide();
      });
    }

    $scope.$on('refresh', function (event, args)
    {
      $scope.refresh();
    });

    if (postalCode != '')
    {
      $scope.refresh();
    }
  });
