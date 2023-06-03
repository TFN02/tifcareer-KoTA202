import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';

const VideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videos = [
    {
      id: 1,
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnail: 'https://i3.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      timestamp: "60", // Menit ke-2
    },
    {
        id: 2,
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        thumbnail: 'https://i3.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        timestamp: 90, // Menit ke-
    },
    {
        id: 3,
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        thumbnail: 'https://i3.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        timestamp: 200, // Menit ke-3
    },
    {
        id: 4,
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        thumbnail: 'https://i3.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        timestamp: 20, // Menit ke-3
    },
    {
        id: 5,
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        thumbnail: 'https://i3.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        timestamp: 20, // Menit ke-3
    },
    {
        id: 6,
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        thumbnail: 'https://i3.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        timestamp: 20, // Menit ke-3
    },
    {
        id: 7,
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        thumbnail: 'https://i3.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        timestamp: 20, // Menit ke-3
    },
 
  ];
  const playerRef = useRef(null);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    playerRef.current.seekTo(video.timestamp);
  };

  return (
    <div className="video-gallery flex flex-row gap-4">
      <div className="video-player">
        {selectedVideo ? (
          <ReactPlayer ref={playerRef} url={selectedVideo.url} width={"700px"} controls />
        ) : (
          <p>Pilih video untuk diputar</p>
        )}
      </div>
      <div className="thumbnail-list flex flex-col gap-4 overflow-auto h-80 p-5 m-5 bg-slate-100">
        {videos.map((video) => (
          <div
            key={video.id}
            className={`thumbnail ${selectedVideo === video ? 'selected' : ''}`}
            onClick={() => handleVideoClick(video)}
          >
            <div className='flex flex-row gap-x-3'>

            <img src={video.thumbnail} alt="Thumbnail" width={"40%"} />
            <p>From 00:00</p>
            <p>Pertanyaan ke- ?</p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGallery;
