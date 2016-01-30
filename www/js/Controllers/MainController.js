angular.module('grocery.controllers')
  .controller('MainController', function ($scope, $stateParams)
  {

    $scope.validatePostalCode = function (postalCode)
    {
      return !regex.test(postalCode);
    };

    $scope.showForm = function ()
    {
      $scope.modal.show();
    };

    $scope.submitPostalCode = function (code)
    {
      postalCode = code.toUpperCase();

      if (postalCode.length == 7)
      {
        postalCode = postalCode.substring(0, 3) + postalCode.substring(4, 7);
      }

      localStorage.setItem('postalCode', postalCode);
      $scope.handler.change(new postalCodeSet());
      $scope.handler.closeForm();
    };

    $scope.addCart = function (product)
    {
      var productList = localStorage.getObject("cartProducts");
      _.extend(product, {CartQuantity: 1});
      console.log(product);
      if (productList == null || productList.length == 0)
      {
        localStorage.setObject("cartProducts", [product]);
      }
      else
      {
        var cartProduct = _.find(productList, {Id: product.Id});
        console.log(cartProduct);
        if (cartProduct !== undefined)
        {
          cartProduct.CartQuantity++;
          _.extend(_.findWhere(productList, { CartQuantity: cartProduct.CartQuantity }), cartProduct);
          localStorage.setObject("cartProducts", productList);
        }
        else
        {
          productList.push(product);
          localStorage.setObject("cartProducts", productList);
        }
      }
      $scope.$broadcast('refreshCart');
    };
  });
