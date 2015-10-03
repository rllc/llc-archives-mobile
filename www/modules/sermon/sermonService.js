(function () {
'use strict';

  function Sermon (Archives, $localstorage) {

    function hasSavedSermons (congregation) {
      return $localstorage.get(congregation + '.sermons') != null;
    }

    function getSavedSermons (congregation) {
      return $localstorage.getObject(congregation + '.sermons');
    }

    function saveSermons (congregation, data) {
      $localstorage.setObject(congregation + '.sermons', data._embedded.sermons);
    }

    return {
      findAllByCongregation: function (congregation) {

        if (hasSavedSermons(congregation)) {
          return getSavedSermons(congregation);
        }

        return Archives.sermons(congregation).then(function(data) {
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
    .factory('Sermon', ['Archives', '$localstorage', Sermon]);

})();
