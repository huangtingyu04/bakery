var myTimer,
    yt = {
        "main": "mainVideo", //上方youtube播放器id
        "fixed": "fixed-mainVideo",
        "fixedBox": ".fixed-mainVideo",
        "fixedShowedClassName": "showed",
        "showFixedBox": .75
    };
    var controlPlayed = function(pos) {
        $(yt.main).addClass("played");
        var target = $(".played"),
            targetTop = target.position().top,
            targetHeight = target.height(),
            targetBottom = targetTop + targetHeight,
            targetPos = targetTop + (targetHeight * yt.showFixedBox),
            openStatus = false;
            if (pos >= targetPos) {
                if (window[yt.main].getPlayerState() == 1 && openStatus == false) {
                    openStatus = true;
                    target.css("opacity", .5);
                   	youTubePlayerPause();
                    $(yt.fixedBox).addClass(yt.fixedShowedClassName);

                    window[yt.fixed].seekTo(window[yt.main].getCurrentTime());
                    window[yt.fixed].playVideo();
                }

            } else if (pos <= targetBottom) {
                if (window[yt.fixed].getPlayerState() == 1 && openStatus == false) {
                
                target.css("opacity", 1);
                $(yt.fixedBox).removeClass(yt.fixedShowedClassName);
                window[yt.fixed].pauseVideo();

                window[yt.main].seekTo(window[yt.fixed].getCurrentTime());
                window[yt.main].playVideo();
                }
            }

    }
    var onReady = function() {
        $(yt.fixedBox).find("a.fxdVideo-colse").on("click", function() {
            $(yt.fixedBox).removeClass(yt.fixedShowedClassName);
            window[yt.fixed].stopVideo();
            $(".played").css("opacity", 1);
        });
    }

    $(document).ready(onReady);
    $(window).scroll(function () {
        var scrollPos = $(this).scrollTop();
        if ($("#" + yt.main).length > 0)
            controlPlayed(scrollPos);
    });
    function onYouTubeIframeAPIReady() {
        'use strict';

        var suggestedQuality = 'large';
        var height = 480;
        var width = 640;

        function onError(event) {
            window[yt.main].personalPlayer.errors.push(event.data);
        }
        function onReady(event) {
            var player = event.target;
            player.cueVideoById({
                suggestedQuality: suggestedQuality,
                videoId: videoId
            });
            player.pauseVideo();
        }
        if (ytPlayerList.length > 0)
            initVideos();
    }   
    function initVideos() {
        for (var i = 0; i < ytPlayerList.length; i++) {
            var player = ytPlayerList[i];
            pl = new YT.Player(player.DivId, {
                height: '100%',
                width: '100%',
                videoId: player.VideoId,
                events: {
                    onStateChange: onPlayerStateChange
                },
                playerVars: {
                    rel: 0,
                    showinfo: 0,
                    autoplay: (player.autoPlay)? 1: 0
                },
            });
            window[player.Id] = pl;
        }
        playingId = ytPlayerList[0].Id;
    }
    function youTubePlayerActive() {
        'use strict';
        return window[yt.main] && window[yt.main].hasOwnProperty('getPlayerState');
    }       
    function youTubePlayerPlay() {
        'use strict';

        if (youTubePlayerActive()) {
            window[yt.main].playVideo();
        }
    }
    function youTubePlayerPause() {
        'use strict';

        if (youTubePlayerActive()) {
            window[yt.main].pauseVideo();
        }
    }
    function youTubePlayerStop() {
        'use strict';

        if (youTubePlayerActive()) {
            window[yt.main].stopVideo();
            window[yt.main].clearVideo();
        }
    }   
    function onPlayerStateChange(event){
        var player = event.target;
        if (player.getPlayerState() == 1) {
            if (playingId != player.a['id']) {
                window[playingId].pauseVideo();
                playingId = player.a['id'];
            }
        }
        //console.log(window[playingId].getCurrentTime());
    }

    (function () {
        'use strict';

        function init() {
            var tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';

            var first_script_tag = document.getElementsByTagName('script')[0];

            first_script_tag.parentNode.insertBefore(tag, first_script_tag);
            //setInterval(youTubePlayerDisplayInfos, 5000);
        }


        if (window.addEventListener) {
            window.addEventListener('load', init);
        } else if (window.attachEvent) {
            window.attachEvent('onload', init);
        }
    }());