(function () {
'use strict';

angular.module('llc.archives.services')
.factory('Archives', function($http) {
  var restApiUrl = 'https://llc-archives.herokuapp.com/api';

  return {
    congregations: function() {
      var promise = $http.get(restApiUrl + '/congregations').then(function (response) {
        console.log(response);
        return response.data._embedded.congregations;
      });

      return promise;
    },

    sermons: function(congregation) {
      var promise = $http.get(restApiUrl + '/congregations/search/findByName?name=' + congregation)
        .then(function (response) {
        console.log(response);
        console.log(response.data._embedded.congregations[0]._links.sermons);
        return response.data;
      }).then(function(data) {
        console.log(data);
        var sermonPromise = $http.get(data._embedded.congregations[0]._links.sermons.href).then(function(response) {
          return response.data;
        });

        return sermonPromise;
      });

      return promise;
    }
  }

})

})();
