/*!*************************************
* KaraTube - YouTube Karaoke Made easy
* Author An Pham
* http://www.apresume.com
* All rights reserved 2015
***************************************/

karaTubeApp
.controller('MainCtrl', ['$scope', function($scope) {
    $scope.playlist = [];
    $scope.currentSongIndex = -1;
    $scope.nextSongIndex = -1;
    $scope.shuffle = false;
    $scope.nextSongName = "";
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
      $scope.updateNextSong();
    }

    $scope.updateNextSong = function() {
      if ($scope.playlist.length <= 1) {
        $scope.nextSongIndex = -1;
        $scope.nextSongName = "Please add more songs to your playlist.";
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
        return;
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
      else {
        $scope.playlist.splice(index, 1);
        if ($scope.nextSongIndex > index) {
          $scope.nextSongIndex -= 1;
        }
        if ($scope.currentSongIndex > index) {
          $scope.currentSongIndex -= 1;
        }
      }
      $scope.updateNextSong();
    }

    $scope.playNextSong = function() {
      past = $scope.currentSongIndex;
      $scope.playSong($scope.nextSongIndex);
      $scope.removeSong(past);
      return $scope.currentSongIndex;
    }

    getImgFromID = function(id) {
      return "//img.youtube.com/vi/"+id+"/1.jpg";
    }


}]);