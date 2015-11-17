(function () {
'use strict';

angular.module('llc.archives.sermon', [])
.config(['$stateProvider', function ($stateProvider) {

  $stateProvider
    .state('tab.sermon', {
      url: '/congregations/:name/sermons/:id',
      views: {
        'congregations': {
          templateUrl: 'modules/sermon/sermon.html',
          controller: 'SermonCtrl as sermonCtrl',
          resolve: {
            sermon: ['Sermon', '$stateParams', function (Sermon, $stateParams) {
              return Sermon.get({ id: $stateParams.id }).$promise;
            }]
          }
        }
      }
    })

}])

})();
