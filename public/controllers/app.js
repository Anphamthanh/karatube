angular.module('tubeKara', [])
.controller('MainCtrl', [
  '$scope',
  function($scope) {
    $scope.welcome = 'Welcome to TubeKara 0.1.0! YouTube Karaoke is now on a different level.';
  }]);