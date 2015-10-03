(function () {
'use strict';

function SettingsCtrl ($scope, $localstorage, Settings, settings, congregations) {

  this.settings = settings;
  this.congregations = congregations;

  this.save = function() {
    console.log('save',this.settings);
    Settings.save(this.settings);
  }

};

angular.module('llc.archives.settings')
  .controller('SettingsCtrl', ['$scope', '$localstorage', 'Settings', 'settings', 'congregations', SettingsCtrl]);


})();
