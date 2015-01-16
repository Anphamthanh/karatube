
tubeKaraApp
.controller('MainCtrl', ['$scope', function($scope) {
    $scope.welcome = 'Welcome to TubeKara 0.1.0! YouTube Karaoke is now on a different level!...';
    $scope.playlist = [];
    $scope.currentSongIndex = 0;

    $scope.addSong2Playlist = function(liObj) {
      obj = { 'id': liObj.data('id'), 'img': getImgFromID(liObj.data('id')), 
        'title': liObj.data('title'), 
        'duration': liObj.data('duration'), 'uploader': liObj.data('uploader'), 
        'view': liObj.data('view') };
      $scope.playlist.push(obj);  
      $scope.$apply();
    }

    $scope.playSong = function(player, index) {
      if (index >= $scope.playlist.length) {
        console.log("End of playlist!");
        if ($scope.playlist.length != 0) {
          index = 0;
        }
        else {
          return;
        }
      }
      player.loadVideoById($scope.playlist[index].id);
      player.playVideo();
      $scope.currentSongIndex = index;
    }

    $scope.addSong2PlaylistAndPlay = function(player, liObj) {
      $scope.addSong2Playlist(liObj);
      $scope.playSong(player, 0);
    }

    $scope.playNextSong = function(player) {
      $scope.removeSong($scope.currentSongIndex);
      $scope.playSong(player, $scope.currentSongIndex);
    }

    $scope.removeSong = function(index) {
      $scope.playlist.splice(index, 1);
      $scope.$apply();
    }

    getImgFromID = function(id) {
      return "//img.youtube.com/vi/"+id+"/1.jpg";
    }


}]);