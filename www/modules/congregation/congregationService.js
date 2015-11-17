(function () {
'use strict';

function CongregationService ($resource, api) {

  var restApiUrl = api.llcArchives;

  return $resource(restApiUrl + '/congregations/:id', {
    id: '@id'
  }, {
    query: {
      method: 'GET',
      url: restApiUrl + '/congregations',
      cache: true,
      isArray: true,
      transformResponse: function (data) {
        var dataAsJson = angular.fromJson(data);
        return dataAsJson._embedded.congregations;
      }
    }
  });

}

angular.module('llc.archives.congregation')
  .factory('Congregation', ['$resource', 'api', CongregationService]);

})();
