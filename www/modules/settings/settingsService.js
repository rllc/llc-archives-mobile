(function () {
'use strict';

function Settings ($localstorage) {

  var defaultSettings = { defaultCongregation: '' };

  function hasSavedSettings () {
    var settings = $localstorage.get('settings');
    return angular.isDefined(settings) && settings != 'undefined';
  }

  function getSavedSettings () {
    return $localstorage.getObject('settings');
  }

  return {
    get: function () {
      return hasSavedSettings() ? getSavedSettings() : defaultSettings;
    },
    save: function (settings) {
      $localstorage.setObject('settings', settings);
    }
  }
}

angular.module('llc.archives.settings')
  .factory('Settings', ['$localstorage', Settings]);

})();
