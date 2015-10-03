(function () {
'use strict';

  function CongregationService ($localstorage, $filter, Archives) {

    return {
      query: function () {
        $localstorage.set('sermons', '');
        $localstorage.setObject('congregations', '');
        return Archives.congregations().then(function(data) {
          $localstorage.setObject('congregations', data);
          return data;
        });
      },
      findByName: function (name) {
        var congregations = $localstorage.getObject('congregations');
        return $filter('filter')(congregations, { name: name })[0];
      }
    }
  }

  angular.module('llc.archives.congregation')
    .factory('Congregation', ['$localstorage', '$filter', 'Archives', CongregationService]);

})();
