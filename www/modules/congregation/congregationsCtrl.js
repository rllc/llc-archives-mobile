(function () {
'use strict';

function CongregationsCtrl ($scope, $ionicLoading, $localstorage, Archives){
  $ionicLoading.show({template: 'Loading...'});
  $localstorage.set('sermons', '');
  $localstorage.setObject('congregations', '');
  Archives.congregations().then(function(data) {
    $localstorage.setObject('congregations', data);
    $scope.congregations = data;
    $ionicLoading.hide();
  });
}

angular.module('llc.archives.congregation')
  .controller('CongregationsCtrl', ['$scope', '$ionicLoading', '$localstorage', 'Archives', CongregationsCtrl])

})();
