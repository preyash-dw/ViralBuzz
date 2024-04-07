import React from "react";
import "./Trending.css";
import { useNavigate } from 'react-router-dom';
const Video = ({ src }) => {
  const navigate=useNavigate();
  function funct(url) {
    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    return filename;
}
const handleClick=()=>{
  navigate("/blog", { state: { post:src } });
}
  return (
    <div className="video" onClick={handleClick}>
      <iframe src={`https://viral-buzz-api.vercel.app/${funct(src.video)}?autoplay=0`} title="src.title" allowFullScreen />
      <h3 onClick={handleClick}>{src.title}</h3>
    </div>
  );
};

export default Video;