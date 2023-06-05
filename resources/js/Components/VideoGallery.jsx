import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';

const VideoGallery = ({idVideo}) => {

  // const [sourceVideo, setSourceVideo] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  
  useEffect(() => {
    const getSourceVideo = async () => {
        try {
            const res = await axios.get(
                `http://localhost:8000/api/videoResumes/${idVideo}`
            );
            setVideos(prevVideos => [
              ...prevVideos,
              {
                id: 1,
                url: `https://www.youtube.com/watch?v=${res.data.data.youtube_video_id}`,
                thumbnail: 'https://i3.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
                timestamp: "20",
              }
              // Add more video objects based on the number of timestamps from the API response
            ]);

        } catch (err) {
            console.err(
                "Gagal mengambil data pelamar yang diterima:",
                err
            );
        }
    };

    getSourceVideo();
}, [idVideo]);

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
