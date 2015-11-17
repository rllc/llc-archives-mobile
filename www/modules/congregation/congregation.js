(function () {
'use strict';

angular.module('llc.archives.congregation', [])
.config(['$stateProvider', function($stateProvider) {

  $stateProvider
    .state('tab.congregations', {
      url: '/congregations',
      views: {
        'congregations': {
          templateUrl: 'modules/congregation/congregationList.html',
          controller: 'CongregationListCtrl as congregationListCtrl',
          resolve: {
            congregations: ['Congregation', function (Congregation) {
              return Congregation.query().$promise;
            }]
          }
        }
      }
    })
    .state('tab.congregation', {
      url: '/congregations/:id',
      views: {
        'congregations': {
          templateUrl: 'modules/congregation/congregation.html',
          controller: 'CongregationCtrl as congregationCtrl',
          resolve: {
            congregation: ['Congregation', '$stateParams', function (Congregation, $stateParams) {
              return  Congregation.get({ id: $stateParams.id }).$promise;
            }],
            sermons: ['Sermon', '$stateParams', function (Sermon, $stateParams) {
              return Sermon.findAllByCongregation({ congregationId: $stateParams.id }).$promise;
            }]
          }
        }
      }
    })

}]);
})();
