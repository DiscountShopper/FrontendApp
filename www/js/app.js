// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('grocery', ['ionic', 'grocery.controllers', 'grocery.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.category', {
      url: '/category',
      views: {
        'tab-category': {
          templateUrl: 'templates/tab-category.html',
          controller: 'CategoriesController'
        }
      }
    })

    .state('tab.category-detail', {
      url: '/category/:categoryId',
      views: {
        'tab-category': {
          templateUrl: 'templates/tab-item.html',
          controller: 'CategoryController'
        }
      }
    })

    .state('tab.category-detail-item-detail', {
      url: '/category/:categoryId/:itemId',
      views: {
        'tab-category': {
          templateUrl: 'templates/tab-item-detail.html',
          controller: 'CategoryController'
        }
      }
    })

  .state('tab.item', {
    url: '/item',
    views: {
      'tab-item': {
        templateUrl: 'templates/tab-item.html',
        controller: 'ItemsController'
      }
    }
  })

    .state('tab.item-detail', {
      url: '/item/:itemId',
      views: {
        'tab-item': {
          templateUrl: 'templates/tab-item-detail.html',
          controller: 'ItemController'
        }
      }
    })

  .state('tab.store', {
    url: '/store',
    views: {
      'tab-store': {
        templateUrl: 'templates/tab-store.html',
        controller: 'StoreController'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/item');

});
