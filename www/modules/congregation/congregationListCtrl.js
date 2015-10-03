(function () {
'use strict';

function CongregationListCtrl (congregations){
  this.congregations = congregations;
}

angular.module('llc.archives.congregation')
  .controller('CongregationListCtrl', ['congregations', CongregationListCtrl])

})();
