
tubeKaraApp
.controller('MainCtrl', ['$scope', function($scope) {
    $scope.welcome = 'Welcome to TubeKara 0.1.0! YouTube Karaoke is now on a different level!...';
    $scope.list = [];

    $scope.start = function(song) {
      $scope.list = [song];
      $("html").css('background-image', 'none');
      console.log($scope.list);
    }
}]);