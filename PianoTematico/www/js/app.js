angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/tab-login.html',
        controller: 'LoginCtrl'
      }
    }
  })
  .state('app.jugar', {
      url: '/jugar/:nombre',
      views: {
        'menuContent': {
          templateUrl: 'templates/tab-jugar.html',
          controller: 'JugarCtrl'
        }
      }
    })
  .state('app.acercade', {
    url: '/acercade',
    views: {
      'menuContent': {
        templateUrl: 'templates/tab-acercade.html',
        controller: 'AcercadeCtrl'
      }
    }
  })
  .state('app.inicio', {
    url: '/inicio',
    views: {
      'menuContent': {
        templateUrl: 'templates/inicio.html',
        controller: 'InicioCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/app/inicio');

});



