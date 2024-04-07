import React,{useState,useEffect} from "react";
import "./Trending.css";
import Card from "./Card";
import Video from "./Videos";

function Trending() {
  //for posts
const [contents, setContents] = useState([]);
useEffect(() => {
  fetchContents();
}, []);

async function fetchContents() {
  try {
    const response = await fetch('https://viral-buzz-api.vercel.app/api/contents/views');
    const data = await response.json();
    console.log(data);
    setContents(data);
  } catch (error) {
    console.error('Error fetching contents:', error);
  }
}



//for videos
const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await fetch("https://viral-buzz-api.vercel.app/api/videos/views");
      const data = await response.json();
      setVideos(data);
    };
    fetchVideos();
  }, []);
  
  return (
    <div className="trend">
     
        <div className="pos">
          {contents.map((card) => (
            <Card key={card._id} post={card} />
          ))}
        </div>
        <div className="vid">
          {videos.map((video) => (
            <Video key={video._id} src={video} />
          ))}
        </div>
      </div>
  );
}

export default Trending;