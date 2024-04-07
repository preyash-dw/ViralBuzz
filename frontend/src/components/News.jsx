import React, { useState, useEffect } from 'react';
import "./News.css";
import axios from "axios";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [category,setCategory]=useState("general");
  const [selectedCategory, setSelectedCategory] = useState("general");

  const fetchData = async () => {
    let response = await axios.get(`https://viral-buzz-api.vercel.app/api/contents?category=${category}`);
    console.log(response.data);
    setArticles(response.data);
  }
  
  const truncateDescription = (description) => {
    const words = description.split(' ');
    if (words.length > 50) {
      const truncatedDescription = words.slice(0, 50).join(' ');
      return truncatedDescription + "... ";
    } else {
      return description;
    }
  }

  const categories = [
    { label: 'Business', value: 'business' },
    { label: 'Entertainment', value: 'entertainment' },
    { label: 'General', value: 'general' },
    { label: 'Health', value: 'health' },
    { label: 'Science', value: 'science' },
    { label: 'Sports', value: 'sports' },
    { label: 'Technology', value: 'technology' },
  ];
  const onCategoryClick = (selectedCategory) => {
    setCategory(selectedCategory);
    setSelectedCategory(selectedCategory)
  }

  useEffect(() => {
    fetchData();
  }, [category]);

  function funct(url) {
    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    return filename;
}

  return (
    <div className="news-container">
      <div className="sidebar">
      {categories.map((category, index) => (
        <div className={`category-item ${category.value === selectedCategory ? 'selected' : ''}`} key={index} onClick={() => onCategoryClick(category.value)}>
          <a href="#">{category.label}</a>
        </div>
      ))}
      </div>
      <div className="articles-container">
        {articles.map((article, index) => (
          <div className="card" key={index}>
            <img src={article.image} alt="" />
            <h3>{article.title}</h3>
            <p>{truncateDescription(article.description)}</p>
            <a href={article.url}>Read More</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;