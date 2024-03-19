import React from "react";
import "./Trending.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Card = ({ post}) => {
  const navigate=useNavigate();
  function funct(url) {
    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    return filename;
}

const handleClick = async () => {
  try {
    await axios.put(`http://localhost:5000/api/content/${post._id}/view`);
    navigate("/blog", { state: { post: post } });
  } catch (error) {
    console.error('Error increasing view count', error);
  }
};
  return (
    <div className="cards" onClick={handleClick}>
      <img src={`http://localhost:5000/${funct(post.image)}`} alt={post.title}  onClick={handleClick}/>
      <h4>{post.title}</h4>
    </div>
  );
};

export default Card;