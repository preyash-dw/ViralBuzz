
import React, { useEffect, useState } from 'react';
import {useLocation} from "react-router-dom";
import './Blog.css';
import { NavLink } from 'react-router-dom';

const BlogPage = () => {
  const location = useLocation();
  const [post, setPostData] = useState(location.state.post);
  const [type,setType]=useState(location.state.post.type);
  
  function funct(url) {
    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    return filename;
}

function formatDate(inputDate) {
  const date = new Date(inputDate);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1; 
  const year = date.getUTCFullYear();
  const formattedDay = day < 10 ? '0' + day : day;
  const formattedMonth = month < 10 ? '0' + month : month;
  const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;
  return formattedDate;
}

function capital(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
  return (
    <div className="blog-page">
      <div className="back">
        <NavLink to="/trend"><h4>Back</h4></NavLink>
      </div>
        <div key={post._id}>
          <h1 className="headline">{post.title}</h1>
          <div className='upper'>
          <p className="date">{formatDate(post.date)}</p>
          <p className="date">{post.viewCount} Views</p>
          <p className="date">{capital(post.category)}</p>
          </div>
          {type === 'post' ? (
            <img src={`https://viral-buzz-api.vercel.app/${funct(post.image)}`} alt="Blog post" className="image"/>
          ) : (
            <video className="video" controls>
          <source src={`https://viral-buzz-api.vercel.app/${funct(post.video)}?autoplay=0`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
          )}
          <div className="content">{post.description}</div>
        </div>
     
    </div>
  );
};

export default BlogPage;
