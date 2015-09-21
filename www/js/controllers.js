angular.module('llc.archives.controllers', ['ionic'])

.controller('CongregationsCtrl', function($scope, $ionicLoading, $localstorage, Archives){
  $ionicLoading.show({template: 'Loading...'});
  $localstorage.set('sermons', '');
  $localstorage.setObject('congregations', '');
  Archives.congregations().then(function(data) {
    $localstorage.setObject('congregations', data);
    $scope.congregations = data;
    $ionicLoading.hide();
  });
})

.controller('CongregationCtrl', function($scope, $ionicLoading, $stateParams, $localstorage, Archives){
  $ionicLoading.show({template: 'Loading...'});
  angular.forEach ($localstorage.getObject('congregations'), function(congregation, key) {
    if (congregation.name === $stateParams.name) {
      $scope.fullName = congregation.fullName;
      $scope.name = congregation.name;
    }
  });

  if ($localstorage.get($stateParams.name + '.sermons') != null) {
    $scope.sermons = $localstorage.getObject($stateParams.name + '.sermons');
    $ionicLoading.hide();
  }
  else {
      Archives.sermons($stateParams.name).then(function(data) {
        $localstorage.setObject($stateParams.name + '.sermons', data._embedded.sermons);
        $scope.sermons = $localstorage.getObject($stateParams.name + '.sermons');
        $ionicLoading.hide();
      });
  }
})

.controller('SermonCtrl', function($scope, $ionicLoading, $localstorage, $stateParams, Archives){
  $scope.congregationName = $stateParams.name;
  $scope.sermon = $localstorage.getObject($stateParams.name + '.sermons')[$stateParams.index]
})

.controller('SettingsCtrl', function($scope, $ionicLoading, $localstorage, Archives){

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
});
