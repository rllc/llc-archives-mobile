(function () {
'use strict';

function CongregationService ($localstorage, $http, $filter, api) {

  var restApiUrl = api.llcArchives;

  return {
    query: function () {
      $localstorage.set('sermons', '');
      $localstorage.setObject('congregations', '');

      return $http.get(restApiUrl + '/congregations').then(function (response) {
        $localstorage.setObject('congregations', response.data._embedded.congregations);
        return response.data._embedded.congregations;
      });
    },
    findByName: function (name) {
      var congregations = $localstorage.getObject('congregations');
      return $filter('filter')(congregations, { name: name })[0];
    }
  }
}

angular.module('llc.archives.congregation')
  .factory('Congregation', ['$localstorage', '$http', '$filter', 'api', CongregationService]);

})();
