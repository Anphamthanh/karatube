
karaTubeApp
.controller('MainCtrl', ['$scope', function($scope) {
    $scope.playlist = [];
    $scope.currentSongIndex = -1;
    $scope.nextSong = "Please add more song to your playlist.";
    $scope.nextSongIndex = -1

    $scope.addSong2Playlist = function(player, liObj) {
      obj = { 'id': liObj.data('id'), 'img': getImgFromID(liObj.data('id')), 
        'title': liObj.data('title'), 
        'duration': liObj.data('duration'), 'uploader': liObj.data('uploader'), 
        'view': liObj.data('view') };
      $scope.playlist.push(obj);  
      if ($scope.playlist.length == 1) {
        $scope.playSong(player, 0);
      }
      else if ($scope.playlist.length == 2) {
        $scope.nextSongIndex = 1;
        $scope.nextSong = $scope.playlist[1].title;
      }
      $scope.$apply();
    }

    $scope.playSong = function(player, index) {
      if (index >= $scope.playlist.length) {
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
      $scope.setNextSongName();
    }


    $scope.playNextSong = function(player) {
      $scope.removeSong($scope.currentSongIndex);
      $scope.playSong(player, $scope.currentSongIndex);
      $scope.setNextSongName();
    }

    $scope.removeSong = function(index) {
      $scope.playlist.splice(index, 1);
      $scope.$apply();
    }

    $scope.setNextSongName = function() {
      if ($scope.getNextSong() == null) {
        $scope.nextSong = "Please add more song to your playlist.";
      }
      else {
        $scope.nextSong = $scope.getNextSong().title;
      }
    }

    $scope.getNextSong = function() {
      if ($scope.currentSongIndex+1 >= $scope.playlist.length) {
        if ($scope.playlist.length != 0) {
          if ($scope.playlist.length == 1) {
            return null;
          }
          else {
            return $scope.playlist[0];
          }
        }
        else {
          return null;
        }
      }
      else {
        return $scope.playlist[$scope.currentSongIndex+1];
      }
    }

    getImgFromID = function(id) {
      return "//img.youtube.com/vi/"+id+"/1.jpg";
    }


}]);