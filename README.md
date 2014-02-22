yt_iframe_api_player
====================

### Introduction

This library handle youtube video play for a list.

Must give youtube video id as a array.

It can auto play video and auto play next video.

It is base on YouTube iframe player API.

[YouTube Player API Reference for iframe Embeds](https://developers.google.com/youtube/iframe_api_reference)

### Usage

New a object
```JavaScript
var YTPlayer = new YTPlayer(
    {
        videoList: videos
    }
);
```
* videoList [array]
  * videos must be a youtube video id array.
* width [number]
  * Set player width, default is 1280
* height [number]
  * Set player height, default is 720
* parameters [object]
  * Set player parameters, default is
```JaVascript
{
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
```
[Refer - YouTube Embedded Players and Player Parameters](https://developers.google.com/youtube/player_parameters#Parameters)

#### Method

Origin YouTube API player object also can use in ```YTPlayer.player```

[YouTube Player API Reference for iframe Embeds - Function](https://developers.google.com/youtube/iframe_api_reference#Operations)

* switchVideo()
  * prev or next video, 0 = prev video, 1 = next video

### Example

#### HTNL
```HTML
<div id="player"></div>
```

#### JavaScript
```JavaScript
// youtube video id
var videos = [
    'mTSuiGubCHE',
    'uEVVJ8b2b-E',
    'DDs5bXh4erM',
    '7wvNwOPprBE',
    'n-BXNXvTvV4',
    'CRJDQQXS4uE',
    'ASO_zypdnsQ',
    'IZkYdqRWKaY',
    '9Y15es8OY0U',
    'LWV-f6dMN3Q'
];
// player parameters
// https://developers.google.com/youtube/player_parameters#Parameters
var parameters = {
    rel: 1,
    autoplay: 1,
    disablekb: 0,
    showsearch: 0,
    showinfo: 0,
    controls: 1,
    autohide: 0,
    modestbranding: 0,
    wmode: 'opaque',
    hd: 1,
    html5: 0,
    iv_load_policy: 3
};
var YTPlayer = new YTPlayer(
    {
        videoList: videos,
        parameters: parameters,
        width: 640,
        height: 480
    }
);
```
