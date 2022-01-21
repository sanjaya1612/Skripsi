import React from 'react';
import VideoPlayer from 'react-video-js-player'

const VideoJS = () => {
    const videoSrc = './video/indonesia.mp4'
    return <div>
        <VideoPlayer
            src={videoSrc}
            width='720'
            height='420'
        />
    </div>;
};

export default VideoJS;
