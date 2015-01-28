if(window.screen.availWidth < 1200) {
  $("#welcome-text").text("This app does NOT support your device. Please use either a desktop or a laptop.");
  $("#welcome-text").css("color", "#f2666d");
}

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-58841076-2', 'auto');
ga('send', 'pageview');

$('input.deletable').wrap('<span class="deleteicon" />').after($('<span/>').click(function() {
  $(this).prev('input').val('').focus();
  playlistOn();
}));

var height = $("html").height()*0.85;

$("#startSongInput").focus();
$("#player-frame").css("height", height);
$("#user-control").css("height", height);
$(".item-container").css("height", height - 30);

(function() {
  var s = document.createElement("script");
  s.src = (location.protocol == 'https:' ? 'https' : 'http') + "://www.youtube.com/player_api";
  var before = document.getElementsByTagName("script")[0];
  before.parentNode.insertBefore(s, before);
})();

$.fn.needVerticalScrollBar = function() {
    var _elm = $(this)[0];
    var _hasScrollBar = false; 
    if ((_elm.clientHeight < _elm.scrollHeight)) {
        _hasScrollBar = true;
    }
    return _hasScrollBar;
}

function showUserControl() {      
  $("#user-control").css("width", "30%");
  $("#newSongInput").focus();
  $("#control-wrapper").removeClass("hidden");
}

function hideUserControl() {      
  $("#user-control").css("width", "1%");
  $("#control-wrapper").addClass("hidden");
}

function getImgFromID(id) {
  return "//img.youtube.com/vi/"+id+"/1.jpg";
}

function suggestionOn() {
  if ($("#newSongInputSuggestion").hasClass("hidden")) {
    $("#control-title .list-title").text(" Suggestion");
    $("#newSongInputSuggestion").removeClass("hidden");
    $("#playlist").addClass("hidden");
  }
}

function playlistOn() {
  if ($("#playlist").hasClass("hidden")) {
    $("#playlist").removeClass("hidden");
    $("#control-title .list-title").text(" Playlist");
    $("#newSongInputSuggestion").addClass("hidden");
  }      
}

$("#startSongInput").keyup(function(event) {
  var id = $(this).attr("id");
  var key = (event.keyCode ? event.keyCode : event.which);
  var items = $("#startSongInputSuggestion .suggestion-item");
  var selectedItems = $("#startSongInputSuggestion .selected");

  if ([38, 40].indexOf(key) != -1) {
    handleKeyInput(key, "startSongInputSuggestion", "suggestion-item", "selected");
    return;
  }

  if (key == 13) {
    selectedSong = getSelectedItem("startSongInputSuggestion", "suggestion-item", "selected");
    openPlayingPage(selectedSong);
    return;
  }

  var searchInput = $(this).val();
  updateSuggestion(searchInput, 10, "startSongInputSuggestion");
});

function getSelectedItem(ulDiv, liDiv, selectedClass) {
  var items = $("#"+ulDiv+" ."+liDiv);
  var selectedItems = $("#"+ulDiv+" ."+selectedClass);
  if (selectedItems.length != 0) {
    return selectedItems.first();
  }
  return items.first();
}

$("#newSongInput").keyup(function(event) {
  var id = $(this).attr("id");
  var key = (event.keyCode ? event.keyCode : event.which);

  if ([38, 40].indexOf(key) != -1) {
    handleKeyInput(key, "newSongInputSuggestion", "suggestion-item", "selected");
    return;
  }

  if (key == 13) { 
    selectedSong = getSelectedItem("newSongInputSuggestion", "suggestion-item", "selected");
    addSong2Playlist(selectedSong);
    return;
  }

  if (key == 27) {
    $("#newSongInput").val("");
    hideUserControl();
  }

  var searchInput = $(this).val();
  if (searchInput.length >= 1) {
    showUserControl();
    suggestionOn();
    updateSuggestion(searchInput, 10, "newSongInputSuggestion");
  }
  else {
    playlistOn();
  }
});

function handleKeyInput(key, suggestionDiv, suggestionItemClass, selectedClass) {      
  var suggestionDiv = suggestionDiv.indexOf('#') == 0 ? suggestionDiv : ('#'+suggestionDiv);
  var selectedClass = selectedClass.indexOf('.') == 0 ? selectedClass : ('.'+selectedClass);
  var suggestionItemClass = suggestionItemClass.indexOf('.') == 0 ? suggestionItemClass : ('.'+suggestionItemClass);
  var current = $(suggestionDiv+" "+suggestionItemClass).index($(selectedClass));
  var items = $(suggestionDiv+" "+suggestionItemClass);
  var selectedItems = $(suggestionDiv+" "+selectedClass);

  if (key == 40) {
    if (current < $(suggestionDiv+" "+suggestionItemClass).length - 1) {
      $(suggestionDiv+" "+suggestionItemClass).eq(current+1).addClass(selectedClass.substring(1));
      $(suggestionDiv+" "+suggestionItemClass).eq(current).removeClass(selectedClass.substring(1));
    }
    return;
  }

  if (key == 38) {
    if (current > 0) {
      $(suggestionDiv+" "+suggestionItemClass).eq(current).removeClass(selectedClass.substring(1));
      $(suggestionDiv+" "+suggestionItemClass).eq(current-1).addClass(selectedClass.substring(1));
    }
    return;
  }

}

function updateSuggestion(searchInput, maxResult, suggestionDiv) {
  var keyword= encodeURIComponent(searchInput);
  if (keyword.search("kara") == -1) {
    keyword = "karaoke " + keyword;
  }
  var ytURL='//gdata.youtube.com/feeds/api/videos?q='+keyword+'&max-results='+maxResult+'&v=2&alt=jsonc';
  var suggestionDiv = suggestionDiv.indexOf('#') == 0 ? suggestionDiv : ('#'+suggestionDiv);

  $.ajax
  ({
    type: "GET",
    url: ytURL,
    dataType:"jsonp",
    success: function(response)
    {
      $(suggestionDiv).empty();
      if(response.data.items)
      {
        $.each(response.data.items, function(i, obj) {
          $(suggestionDiv).append(
            "<li data-id='"+obj.id+"' "+
              "data-title='"+escapeQuotes(obj.title)+"' "+
              "data-uploader='"+obj.uploader+"' "+
              "data-view='"+obj.viewCount+"' "+
              "data-duration='"+obj.duration+"' "+
              " class='suggestion-item'>"+
                "<img class='suggestion-img' src='"+getImgFromID(obj.id)+"'>"+
                "<span class='suggestion-info'>"+
                  "<div class='suggestion-title'>"+escapeQuotes(obj.title)+"</div>"+
                  "<span class='suggestion-uploader'>by "+escapeQuotes(obj.uploader)+"&nbsp;&nbsp;&nbsp;</span>"+
                  "<span class='suggestion-view'>"+obj.viewCount+" views</span>"+
                "</span>"+
            "</li>"
            );
        });

        $(".suggestion-item").first().addClass("selected");
        $(".suggestion-item").hover(function() {
          $(this).addClass("selected");
        }, function() {
          $(this).removeClass("selected")
        });
        $("#startSongInputSuggestion li.suggestion-item").click(function() {
          openPlayingPage($(this));
        });
        $("#newSongInputSuggestion li.suggestion-item").click(function() {
          addSong2Playlist($(this));
        });
        if($(".item-container").needVerticalScrollBar()) {
          $(".item-container").niceScroll();
        }
      }
      else
      {
        $(suggestionDiv).append("<li>No match found.</li>");
      }
    }
  });

}

function getFrameID(id){
  var elem = document.getElementById(id);
  if (elem) {
    if(/^iframe$/i.test(elem.tagName)) return id; //Frame, OK
    // else: Look for frame
    var elems = elem.getElementsByTagName("iframe");
    if (!elems.length) return null; //No iframe found, FAILURE
    for (var i=0; i<elems.length; i++) {
      if (/^https?:\/\/(?:www\.)?youtube(?:-nocookie)?\.com(\/|$)/i.test(elems[i].src)) break;
    }
    elem = elems[i]; //The only, or the best iFrame
    if (elem.id) return elem.id; //Existing ID, return it
    // else: Create a new ID
    do { //Keep postfixing `-frame` until the ID is unique
      id += "-frame";
    } while (document.getElementById(id));
    elem.id = id;
    return id;
  }
  // If no element, return null.
  return null;
}

// Define YT_ready function.
var YT_ready = (function() {
  var onReady_funcs = [], api_isReady = false;
  /* @param func function     Function to execute on ready
   * @param func Boolean      If true, all qeued functions are executed
   * @param b_before Boolean  If true, the func will added to the first
                               position in the queue*/
  return function(func, b_before) {
    if (func === true) {
      api_isReady = true;
      while (onReady_funcs.length) {
        // Removes the first func from the array, and execute func
        onReady_funcs.shift()();
      }
    } else if (typeof func == "function") {
        if (api_isReady) func();
        else onReady_funcs[b_before?"unshift":"push"](func); 
    }
  }
})();

function onYouTubePlayerAPIReady() {YT_ready(true)}

YT_ready(function(){
  var frameID = getFrameID("player-frame");
  if (frameID) { //If the frame exists
    var player = new YT.Player(frameID, {
      id: 'qpgTC9MDx1o',
      events: {
        "onStateChange": videoStateChanged
      }
    });
    $("body").scope().init(player);
  }
});

function videoStateChanged(event) {
  if (event.data === 0) {
    $(".playing").removeClass("playing");
    current = $("body").scope().playNextSong();
    $(".playlist-item").eq(parseInt(current)).addClass("playing");
  }
}

function addSong2Playlist(liObj) {
  playlistOn(); 
  $("body").scope().addSong2Playlist(liObj);      

  $("#newSongInput").val("");
  $("#newSongInputSuggestion").empty();
  
  // Re-bind click event to new play playlist item
  setupPlaylistItemEffect();
  if($(".item-container").needVerticalScrollBar()) {
    $(".item-container").getNiceScroll().show();
  }
}

function setupPlaylistItemEffect() {         
  $(".playlist-item").click(function() {
    $(".playing").removeClass("playing");
    $(this).addClass("playing");
    $("body").scope().playSong($(this).data('index'));
  });

  $(".playlist-item").hover(function() {
    $(this).addClass("selected");
    $(this).find(".remove-song-btn").show(100);
  }, function() {
    $(this).removeClass("selected");
    $(this).find(".remove-song-btn").hide(100);
  });
}

function openPlayingPage(libObj) {
  $("html").css('background-image', 'none');
  $("#search-form").remove();
  $("#player-frame").removeClass("transparent");
  $("#user-control").removeClass("hidden");
  $("body").addClass("stripesDarkBackground");
  $("#welcome-text").text("KaraTube 0.1.0");
  $("#song-input").removeClass("hidden");
  $(".info").removeClass("hidden");
  $("#newSongInput").focus();
  $("#add-song-btn").click(function() {
    selectedSong = getSelectedItem("newSongInputSuggestion", "suggestion-item", "selected");
    addSong2Playlist(selectedSong);
  });
  $("body").scope().addSong2Playlist(libObj);
  $("#playlist .playlist-item").first().addClass("playing");
  setupPlaylistItemEffect();
}

function escapeQuotes(str) {
  return (str + '').replace('"', '&#34;').replace("'", '&#39;');
}

function callPlayer(frame_id, func, args) {
  if (window.jQuery && frame_id instanceof jQuery) frame_id = frame_id.get(0).id;
  var iframe = document.getElementById(frame_id);
  if (iframe && iframe.tagName.toUpperCase() != 'IFRAME') {
    iframe = iframe.getElementsByTagName('iframe')[0];
  }
  if (iframe) {
    // Frame exists, 
    iframe.contentWindow.postMessage(JSON.stringify({
        "event": "command",
        "func": func,
        "args": args || [],
        "id": frame_id
    }), "*");
  }
}