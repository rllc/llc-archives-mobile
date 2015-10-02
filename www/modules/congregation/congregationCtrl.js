(function () {
'use strict';

function CongregationCtrl ($scope, $ionicLoading, $stateParams, $localstorage, Archives){
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
}

angular.module('llc.archives.congregation')
  .controller('CongregationCtrl', ['$scope', '$ionicLoading', '$stateParams', '$localstorage', 'Archives', CongregationCtrl])

})();
