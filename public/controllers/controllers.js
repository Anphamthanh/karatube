
karaTubeApp
.controller('MainCtrl', ['$scope', function($scope) {
    $scope.playlist = [];
    $scope.currentSongIndex = -1;
    $scope.nextSongIndex = -1;
    $scope.shuffle = false;
    $scope.nextSongName = "Please add more songs to your playlist.";
    $scope.player = null;

    $scope.init = function(player) {
      $scope.player = player;
    }

    $scope.addSong2Playlist = function(liObj) {
      obj = { 'id': liObj.data('id'), 'img': getImgFromID(liObj.data('id')), 
        'title': liObj.data('title'), 
        'duration': liObj.data('duration'), 'uploader': liObj.data('uploader'), 
        'view': liObj.data('view') };
      $scope.playlist.push(obj);  
      if ($scope.playlist.length == 1) {
        $scope.playSong(0);
        $scope.nextSongIndex = -1;
      }
      else {
        $scope.updateNextSong();
      }
      $scope.$apply();
    }

    $scope.updateNextSong = function() {
      if ($scope.playlist.length <= 1) {
        $scope.nextSongIndex = -1;
        $scope.nextSongName = "Please add more song to your playlist.";
      }
      else {
        if ($scope.shuffle == false) {
          $scope.nextSongIndex = ($scope.currentSongIndex + 1) % $scope.playlist.length;
        }
        else {

        }
        $scope.nextSongName = $scope.playlist[$scope.nextSongIndex].title;
      }
      $scope.$apply();
    }

    $scope.playSong = function(index) {
      if (index < 0 || index >= $scope.playlist.length) {
        if ($scope.playlist.length != 0) {
          index = 0;
        }
        else {
          return;
        }
      }
      $scope.player.loadVideoById($scope.playlist[index].id);
      $scope.player.playVideo();
      $scope.currentSongIndex = index;
      $scope.updateNextSong();
    }

    $scope.removeSong = function(index) {
      if ($scope.currentSongIndex == index) {
        return;
      }
      $scope.playlist.splice(index, 1);
      if ($scope.nextSongIndex > index) {
        $scope.nextSongIndex -= 1;
      }
      $scope.setNextSongName();
    }


    $scope.playNextSong = function() {
      temp = $scope.currentSongIndex;
      curr = $scope.nextSongIndex;
      // $scope.currentSongIndex = $scope.nextSongIndex;
      // $scope.removeSong(temp);
      $scope.playSong($scope.nextSongIndex);
      $scope.updateNextSong();
      return curr;
    }

    getImgFromID = function(id) {
      return "//img.youtube.com/vi/"+id+"/1.jpg";
    }


}]);