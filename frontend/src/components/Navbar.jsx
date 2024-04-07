import React, { useState } from "react";
import "./Navbar.css";
import logo from "../assets/logoo.png";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const [isSocialActive, setIsSocialActive] = useState(false);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const handleSocialToggle = () => {
    setIsSocialActive(!isSocialActive);
  };

  return (
    <div className="navbar">
      <header>
        <div className="navigation-container">
          <div className="top-head">
            <div className="web-name">
              <NavLink to="/">
                <img src={logo} alt="Logo" /> 
              </NavLink>
            </div>

            <div className="ham-btn" onClick={handleToggle}>
              <span>
                <i className="fas fa-bars"></i>
              </span>
            </div>

            <div className="times-btn">
              <span>
                <i className="fas fa-times"></i>
              </span>
            </div>
          </div>

          <div className={`nav-bar ${isActive ? 'active' : ''}`} id="nav-bar">
            <nav>
              <ul>
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/trend">Trending</NavLink>
                </li>
                <li>
                  <NavLink to="/allvid">Videos</NavLink>
                </li>
              </ul>
            </nav>
          </div>

          <div className="social-icons">

          <div className="share-btn" onClick={handleSocialToggle}>
          <span>
            <i className="fas fa-share-alt"></i>
          </span>
        </div>

            <ul className={`${isSocialActive ? 'active' : ''}`}>
              <li>
                <a href="#">
                  <i className="fab fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-youtube"></i>
                </a>
              </li>
            </ul>
            <div className="login-signup">
              <NavLink to="/login"><i className="fas fa-user"></i></NavLink>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
