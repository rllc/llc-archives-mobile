(function () {
'use strict';

function CongregationCtrl (congregation, sermons){
  this.congregation = congregation;
  this.sermons = sermons;
}

angular.module('llc.archives.congregation')
  .controller('CongregationCtrl', ['congregation', 'sermons', CongregationCtrl])

})();
