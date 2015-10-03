(function () {
'use strict';

angular.module('llc.archives', [
  'ionic',
  'llc.archives.congregation',
  'llc.archives.sermon',
  'llc.archives.settings',
  'llc.archives.common'
])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    });

  // if no state is matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/congregations');

}])

.run(['$rootScope', '$ionicLoading', '$ionicPlatform', function ($rootScope, $ionicLoading, $ionicPlatform) {

  $rootScope.$on('$stateChangeStart', function () {
    $ionicLoading.show({template: 'Loading...'});
  });

  $rootScope.$on('$stateChangeSuccess', function () {
    $ionicLoading.hide();
  })

  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleLightContent();
    }
  });

}])

.constant('api', {
  llcArchives: 'https://llc-archives.herokuapp.com/api'
})

})();
