import { useState ,useEffect} from "react";
import "./Video.css";
import VideoCard from "./VideoCard";
const AllVideo = () => {
  //for videos
const [videos, setVideos] = useState([]);

useEffect(() => {
  const fetchVideos = async () => {
    const response = await fetch("http://localhost:5000/api/videos");
    const data = await response.json();
    setVideos(data);
  };
  fetchVideos();
}, []);


function funct(url) {
  const parts = url.split('/');
  const filename = parts[parts.length - 1];
  return filename;
}
    return (
      <div className="video-grid">
        {videos.map((video) => (
          <VideoCard
            key={video._id}
            src={`http://localhost:5000/${funct(video.video)}`}
            title={video.title}
            date={video.date}
          />
        ))}
      </div>
    )
  }
  
  export default AllVideo