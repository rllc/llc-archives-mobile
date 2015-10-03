(function () {
'use strict';

angular.module('llc.archives.congregation', [])
.config(function($stateProvider) {

  $stateProvider
    .state('tab.congregations', {
      url: '/congregations',
      views: {
        'congregations': {
          templateUrl: 'modules/congregation/congregationList.html',
          controller: 'CongregationListCtrl as congregationListCtrl',
          resolve: {
            congregations: ['Congregation', function (Congregation) {
              return Congregation.query();
            }]
          }
        }
      }
    })
    .state('tab.congregation', {
      url: '/congregations/:name',
      views: {
        'congregations': {
          templateUrl: 'modules/congregation/congregation.html',
          controller: 'CongregationCtrl as congregationCtrl',
          resolve: {
            congregation: ['Congregation', '$stateParams', function (Congregation, $stateParams) {
              return Congregation.findByName($stateParams.name);
            }],
            sermons: ['Sermon', '$stateParams', function (Sermon, $stateParams) {
              return Sermon.findAllByCongregation($stateParams.name);
            }]
          }
        }
      }
    })

});
})();
