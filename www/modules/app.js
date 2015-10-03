(function () {
'use strict';

angular.module('llc.archives.services', []);

angular.module('llc.archives', [
  'ionic',
  'llc.archives.congregation',
  'llc.archives.sermon',
  'llc.archives.settings',
  'llc.archives.services'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    });

  // if no state is matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/congregations');

})

.run(['$rootScope', '$ionicLoading', function ($rootScope, $ionicLoading) {

  $rootScope.$on('$stateChangeStart', function () {
    $ionicLoading.show({template: 'Loading...'});
  });

  $rootScope.$on('$stateChangeSuccess', function () {
    $ionicLoading.hide();
  });

}])


})();
