
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

    $scope.addSong2PlaylistAndPlay = function(player, liObj) {
      addSong2Playlist(liObj);
      playSong(player, 0);
    }

    $scope.playNextSong = function(player) {
      $scope.playlist.splice($scope.currentSongIndex, 1);
      $scope.$apply();
      console.log($scope.playlist);console.log($scope.currentSongIndex);
      playSong(player, $scope.currentSongIndex);
    }

    function playSong(player, index) {
      if (index >= $scope.playlist.length) {
        console.log("End of Playlist");
        return;
      }
      player.loadVideoById($scope.playlist[index].id);
      player.playVideo();
      $scope.currentSongIndex = index;
    }

    getImgFromID = function(id) {
      return "//img.youtube.com/vi/"+id+"/1.jpg";
    }


}]);