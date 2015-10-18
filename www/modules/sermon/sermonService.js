(function () {
'use strict';

function Sermon ($localstorage, $http, api) {

  var restApiUrl = api.llcArchives;

  function hasSavedSermons (congregation) {
    return $localstorage.get(congregation + '.sermons') != null;
  }

  function getSavedSermons (congregation) {
    return $localstorage.getObject(congregation + '.sermons');
  }

  function saveSermons (congregation, data) {
    $localstorage.setObject(congregation + '.sermons', data._embedded != undefined ? data._embedded.sermons : {});
  }

  function querySermons (congregation) {
    return $http.get(restApiUrl + '/congregations/search/findByName?name=' + congregation)
      .then(function (response) {
        return response.data;
      }).then(function(data) {
        return $http.get(data._embedded.congregations[0]._links.sermons.href);
      }).then(function (response) {
        return response.data;
      })
  }

  return {
    findAllByCongregation: function (congregation) {

      if (hasSavedSermons(congregation)) {
        return getSavedSermons(congregation);
      }

      return querySermons(congregation).then(function(data) {
        saveSermons(congregation, data);
        return getSavedSermons(congregation);
      });
    },
    find: function (congregation, index) {
      return getSavedSermons(congregation)[index];
    }
  }
}

angular.module('llc.archives.sermon')
  .factory('Sermon', ['$localstorage', '$http', 'api', Sermon]);

})();
