(function () {
'use strict';

function SettingsCtrl ($scope, $ionicLoading, $localstorage, Archives){

  if ($localstorage.get('settings') != null) {
    $scope.settings = $localstorage.getObject('settings');
  }
  else {
    $scope.settings = {
      defaultCongregation: ''
    };
  }

  $scope.save = function() {
    $localstorage.setObject('settings', $scope.settings);
  }

  if ($localstorage.get('congregations') != null) {
    $scope.congregations = $localstorage.getObject('congregations')
  }
  else {
    $ionicLoading.show({template: 'Loading...'});
    Archives.congregations().then(function(data) {
      $localstorage.setObject('congregations', data);
      $scope.congregations = data;
      $ionicLoading.hide();
    });
  }
}

angular.module('llc.archives.settings')
.controller('SettingsCtrl', ['$scope', '$ionicLoading', '$localstorage', 'Archives', SettingsCtrl]);

})();
