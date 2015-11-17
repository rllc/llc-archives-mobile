(function () {
'use strict';

function Sermon ($resource, api) {
    var restApiUrl = api.llcArchives;

    return $resource(restApiUrl + '/sermons/:id', {
      id: '@id'
    }, {
      findAllByCongregation: {
        method: 'GET',
        url: restApiUrl + '/congregations/:congregationId/sermons',
        transformResponse: function (data) {
          var dataAsJson = angular.fromJson(data);
          return dataAsJson._embedded ? dataAsJson._embedded.sermons : [];
        },
        cache: true,
        isArray: true
      }
    });
}

angular.module('llc.archives.sermon')
  .factory('Sermon', ['$resource', 'api', Sermon]);

})();
