
tubeKaraApp
.controller('MainCtrl', ['$scope', function($scope) {
    $scope.welcome = 'Welcome to TubeKara 0.1.0! YouTube Karaoke is now on a different level!...';
    $scope.list = [];
    $scope.player = {};

    $scope.start = function(song) {
      $scope.list = [song];
      height = $("html").height()*0.85;
      $("html").css('background-image', 'none');
      $("#search-form").remove();
      $("#player-frame").removeClass("hidden");
      $("#player-frame").css("height", height);
      $("#user-control").removeClass("hidden");
      $("#user-control").css("height", height);
      $("body").addClass("stripesDarkBackground");
      $scope.hideUserControl();
      $scope.videoInit("player-frame", "M7lc1UVf-VE");
      console.log($scope.list);
    }

    $scope.hideUserControl = function() {
      setTimeout(function() {
        $("#user-control").trigger("mouseleave");
      }, 1000);
    }

    $scope.videoInit = function(playerDiv, videoId) {
      // $("#" + playerDiv)[0].src += "&autoplay=1";
    }

}]);