import { useState,useContext } from "react";

import { BrowserRouter as Router, Route, Routes,Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/Context/ProtectedRoute"
import "./index.css";

import Admin from "./components/Adding/Admin";
import Login from "./components/Adding/Login";
import BlogPage from "./components/Blogs/BlogPage";
import VideoPlayer from "./components/VideoPlayer";
import News from "./components/News"
import Trending from "./components/Trending/Trending";
import AllVideo from "./components/Videos/AllVideo";
import { AdminContext } from './components/Context/AdminProvider';
function App() {
  const { isAdmin } = useContext(AdminContext);
  return (
    <Router>
      <div>
        <Navbar />
        <div className="main">
          <Routes>
            <Route exact path="/" element={<News />} />
            <Route exact path="/blog" element={<BlogPage/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={isAdmin ? <Admin /> : <Navigate to="/login" />} />
            <Route path="/video" element={<VideoPlayer/>}/>
            <Route path="/trend" element={<Trending/>}/>
            <Route path="/allvid" element={<AllVideo/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
