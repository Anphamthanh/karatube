
karaTubeApp
.controller('MainCtrl', ['$scope', function($scope) {
    $scope.playlist = [];
    $scope.currentSongIndex = -1;
    $scope.nextSongIndex = -1;
    $scope.shuffle = false;
    $scope.nextSongName = "Please add more song to your playlist.";

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
        $scope.setNextSongName();
      }
      $scope.$apply();
    }

    $scope.setNextSongName = function() {
      if ($scope.nextSongIndex == -1) {
        $scope.nextSongName = "Please add more song to your playlist.";
      }
      else {
        $scope.nextSongName = $scope.playlist[$scope.nextSongIndex].title;
      }
      $scope.$apply();
    }

    $scope.playSong = function(player, index) {
      if (index < 0 || index >= $scope.playlist.length) {
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
      $scope.updateNextSong();
    }

    $scope.updateNextSong = function() {
      if ($scope.playlist.length <= 1) {
        $scope.nextSongIndex = -1;
      }
      else {
        if ($scope.shuffle == false) {
          $scope.nextSongIndex = ($scope.currentSongIndex + 1) % $scope.playlist.length;
          console.log($scope.nextSongIndex);
        }
        else {

        }
      }
      $scope.setNextSongName();
    }


    $scope.playNextSong = function(player) {
      $scope.removeSong($scope.currentSongIndex);
      $scope.playSong(player, $scope.currentSongIndex);
      $scope.setNextSongName();
    }

    $scope.removeSong = function(index) {
      if ($scope.currentSongIndex == index) {
        return;
      }
      if ($scope.nextSongIndex == index) {
        $scope.updateNextSong();
      }
      $scope.playlist.splice(index, 1);
      $scope.$apply();
    }

    getImgFromID = function(id) {
      return "//img.youtube.com/vi/"+id+"/1.jpg";
    }


}]);