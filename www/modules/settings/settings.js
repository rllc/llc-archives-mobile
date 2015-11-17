(function  () {
'use strict';

angular.module('llc.archives.settings', [])
.config(['$stateProvider', function ($stateProvider) {

  $stateProvider
    .state('tab.settings', {
      url: '/settings',
      views: {
        'settings': {
          templateUrl: 'modules/settings/settings.html',
          controller: 'SettingsCtrl as settingsCtrl',
          resolve: {
            settings: ['Settings', function (Settings) {
              return Settings.get();
            }],
            congregations: ['Congregation', function (Congregation) {
                return Congregation.query().$promise;
            }]
          }
        }
      }
    });

}])

})();
