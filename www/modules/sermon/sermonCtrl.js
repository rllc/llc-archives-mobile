(function () {
'use strict';

function SermonCtrl (sermon){
  this.sermon = sermon;
}

angular.module('llc.archives.sermon')
  .controller('SermonCtrl', ['sermon', SermonCtrl])

})();
