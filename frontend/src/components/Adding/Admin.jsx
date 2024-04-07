import React, { useState } from "react";
import "./Admin.css";
import axios from "axios";

const Admin = () => {
  const [image, setImage] = useState(null);
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [selectedPostType, setSelectedPostType] = useState("post");
  const [message, setMessage] = useState("");

  const [category, setCategory] = useState("");


  const categories = [
    { label: 'Business', value: 'business' },
    { label: 'Entertainment', value: 'entertainment' },
    { label: 'General', value: 'general' },
    { label: 'Health', value: 'health' },
    { label: 'Science', value: 'science' },
    { label: 'Sports', value: 'sports' },
    { label: 'Technology', value: 'technology' },
  ];

  const handlePostTypeChange = (postType) => {
    setSelectedPostType(postType);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleHeadingChange = (e) => {
    setHeading(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image);
    formData.append("title", heading);
    formData.append("type", selectedPostType);
    formData.append("description", content);
    formData.append("category", category);
    
    try {
      const response = await axios.post("http://localhost:5000/api/upload", formData);
      setMessage("Done"); 
      setImage(null); 
      setHeading(""); 
      setContent(""); 
      setSelectedPostType("post");
  
    } catch (error) {
      setMessage("Error"); 
      console.error("Error submitting form", error);
    }
  };
  const fileInputAccept = selectedPostType === "post" ? "image/*" : "video/*";

  return (
    <div className="admin-container">
      <div className="toggle-container">
        <span
          className={selectedPostType === "post" ? "selected" : ""}
          onClick={() => handlePostTypeChange("post")}
        >
          Post
        </span>
        <span
          className={selectedPostType === "video" ? "selected" : ""}
          onClick={() => handlePostTypeChange("video")}
        >
          Video
        </span>
      </div>
      <form onSubmit={handleSubmit} className="post-form">
        <div>
          <input
            type="file"
            id="image"
            accept={fileInputAccept}
            onChange={handleImageChange}
            placeholder="Attach Image here..."
          />
        </div>
        <div>
          <input
            type="text"
            id="heading"
            value={heading}
            onChange={handleHeadingChange}
            placeholder="Enter Heading here..."
          />
        </div>
        <div>
          <select id="category" value={category} onChange={handleCategoryChange}>
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <textarea
            id="content"
            value={content}
            placeholder="Enter Content here..."
            onChange={handleContentChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Admin;




