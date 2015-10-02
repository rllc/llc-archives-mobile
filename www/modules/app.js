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
  })

  .state('tab.congregations', {
    url: '/congregations',
    views: {
      'tab-congregations': {
        templateUrl: 'templates/tab-congregations.html',
        controller: 'CongregationsCtrl'
      }
    }
  })
  .state('tab.congregation', {
    url: '/congregations/:name',
    views: {
      'tab-congregations': {
        templateUrl: 'templates/congregation.html',
        controller: 'CongregationCtrl'
      }
    }
  })
  .state('tab.sermon', {
    url: '/congregations/:name/sermons/:index',
    views: {
      'tab-congregations': {
        templateUrl: 'templates/sermon.html',
        controller: 'SermonCtrl'
      }
    }
  })
  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'templates/tab-settings.html',
        controller: 'SettingsCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/congregations');

});


})();
