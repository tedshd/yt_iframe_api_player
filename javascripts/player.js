/*global $, jQuery, alert, console, angular*/
/**
 *
 * @authors tedshd@gmail.com
 * @date    2014-02-21 23:51:16
 * @version $Id$
 * @github  https://github.com/tedshd/yt_iframe_api_player
 */

// YTPlayer.switchVideo(0);
// YTPlayer.switchVideo(1);
// YTPlayer.player.pauseVideo();
// YTPlayer.player.playVideo();

// call YouTube iframe api
var tag = document.createElement('script'),
    firstScriptTag = document.getElementsByTagName('script')[0];
tag.src = 'https://www.youtube.com/iframe_api';
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


function YTPlayer(option) {
    if (option.videoList.length === 0) {
        return console.warn('no video');
    }
    if (!option.parameters) {
        option.parameters = {
            rel: 1,
            autoplay: 1,
            disablekb: 0,
            showsearch: 0,
            showinfo: 0,
            controls: 0,
            autohide: 0,
            modestbranding: 0,
            wmode: 'opaque',
            hd: 1,
            html5: 0,
            iv_load_policy: 3
        };
    }
    if (!option.width) {
        option.width = 1280;
    }
    if (!option.height) {
        option.height = 720;
    }

    if (document.querySelector('#player')) {
        var playCount = 0,
            player,
            playLoop,
            currentTime,
            switchVideo,
            pause,
            play,
            getPlayerState,
            handleBuffer,
            handleUnPlay,
            skipSwitchVideo;
        function playChannel(count) {
            // init player
            player = new YT.Player('player', {
                width: option.width,
                height: option.height,
                videoId: option.videoList[count],
                playerVars: option.parameters,
                events: {
                    'onReady'        : onPlayerReady,
                    'onStateChange'  : onPlayerStateChange,
                    'onError'        : onError
                }
            });

            // play video
            function onPlayerReady() {
                handleUnPlay = setTimeout(
                    function() {
                        if (player.getDuration() === 0) {
                            playLoop();
                        }
                    },
                    5000
                );
            }
            YTPlayer.player = player;
        }

        function playLoop() {
            clear();
            console.log('playLoop');
            playCount++;
            if (playCount > (option.videoList.length -1)) {
                playCount = 0;
            }
            player.pauseVideo();
            player.stopVideo();
            player.loadVideoById(option.videoList[playCount]);
            player.playVideo();
            handleUnPlay = setTimeout(
                function() {
                    if (player.getDuration() === 0) {
                        playLoop();
                    }
                },
                5000
            );
        }

        function onPlayerStateChange(event) {
            // get state
            if (event.data === 0) {
                console.log('video end');
                playLoop();
            }
            if (event.data === 3) {
                console.log('video buffer');
                handleBuffer = setTimeout(
                    function() {
                        if (player.getPlayerState() === 3) {
                            var t = player.getCurrentTime();
                            player.pauseVideo();
                            player.stopVideo();
                            player.loadVideoById(option.videoList[playCount], t);
                            setTimeout(function() {
                                player.playVideo();
                            },500);
                        }
                    },
                    3000
                );
            }
        }

        function onError(e) {
            console.log('ERROR:', e);
        }

        function onYouTubeIframeAPIReady() {
            playChannel(0);
        }

        setTimeout(function() {
            onYouTubeIframeAPIReady();
        }, 1200);

        function clear() {
            console.log('clear');
            clearTimeout(handleBuffer);
            clearTimeout(handleUnPlay);
        }

        /**
         * Handle prev or next video
         * @param  {[0, 1]} switching 0 = prev video, 1 = next video
         * @return {[type]}           [description]
         */
        switchVideo = function(switching) {
            clear();
            clearTimeout(skipSwitchVideo);
            switch(switching) {
                case 0:
                playCount--;
                if (playCount < 0) {
                    playCount = option.videoList.length -1;
                }
                break;
                case 1:
                playCount++;
                if (playCount > (option.videoList.length -1)) {
                    playCount = 0;
                }
                break;
            }
            skipSwitchVideo = setTimeout(
                function () {
                    player.pauseVideo();
                    player.stopVideo();
                    player.loadVideoById(option.videoList[playCount]);
                    setTimeout(function() {
                        player.playVideo();
                    },500);
                    handleUnPlay = setTimeout(
                        function() {
                            if (player.getDuration() === 0) {
                                playLoop();
                            }
                        },
                        5000
                    );
                },
                2000
            );
        };
        this.switchVideo = switchVideo;
    } else {
        console.error('no player id element');
    }
}
window.YTPlayer = YTPlayer;