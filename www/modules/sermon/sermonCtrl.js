(function () {
'use strict';

function SermonCtrl ($scope, $ionicLoading, $localstorage, $stateParams, Archives){
  $scope.congregationName = $stateParams.name;
  $scope.sermon = $localstorage.getObject($stateParams.name + '.sermons')[$stateParams.index]
}

angular.module('llc.archives.sermon')
.controller('SermonCtrl', ['$scope', '$ionicLoading', '$localstorage', '$stateParams', 'Archives', SermonCtrl])



})();
