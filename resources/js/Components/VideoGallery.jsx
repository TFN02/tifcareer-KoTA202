import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';

const VideoGallery = ({ idVideo }) => {

  // const [sourceVideo, setSourceVideo] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getSourceVideo = async () => {
      try {
        const res = await axios.get(
          `/api/segmentVideoResumes?video_resume_id=${idVideo}`
        );
        const datas = res.data.data.data
        setVideos(datas)

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
    const timeString = video.time_to_jump;
    const timeParts = timeString.split(":");
    const hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);
    const seconds = parseInt(timeParts[2]);

    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    playerRef.current.seekTo(totalSeconds);
  };

  return (
    <div className="video-gallery flex flex-row gap-4">
      <div className="video-player">
        {selectedVideo ? (
          <ReactPlayer ref={playerRef} url={`https://www.youtube.com/watch?v=${videos[0].video_resume.youtube_video_id}`} width={"700px"} playing={true} />
        ) : (
          <p className='font-bold text-lg'>Pilih video untuk diputar</p>
        )}
      </div>
      <div className="thumbnail-list flex flex-col gap-y-4 overflow-auto h-80 p-5 m-5 bg-white shadow shadow-lg  rounded text-black divide divide-y ">
        {videos.map((video, index) => (
          <div
            key={video.id}
            className={`thumbnail ${selectedVideo === video ? 'selected' : ''}`}
            onClick={() => handleVideoClick(video)}
          >
            <div className='flex flex-row gap-x-3 mt-3'>

              <img src={video.thumbnail} alt="Thumbnail" width={"40%"} />
              <div className='flex flex-cols'>

                <p>From {video.time_to_jump}</p>
                <p>Pertanyaan ke-{index + 1}</p>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGallery;
