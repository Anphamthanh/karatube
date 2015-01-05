
tubeKaraApp
.controller('MainCtrl', ['$scope', function($scope) {
    $scope.welcome = 'Welcome to TubeKara 0.1.0! YouTube Karaoke is now on a different level!...';
    $scope.list = [];

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
      console.log($scope.list);
    }

    $scope.video_init = function(frameId) {
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      var player;
    }

}]);