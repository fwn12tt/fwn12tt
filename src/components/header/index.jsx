import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import AvatarImg from "../../assets/images/happy1.jpeg";
import Avatar from "@mui/material/Avatar";
import "./style.css";
import { logout } from "../../firebase";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const display = {
    display: 'block'
  }
  const none = {
    display: 'none'
  }
  const onClickLogOut = () => {
    logout();
    return navigate("login");
  }
  return (
    <div className="header-section">
      <div className="container">
        <div className="content-header flex-box">
          <div className="site-logo">
            <Link to="/">
              <img src={Logo} alt="logo" />
            </Link>
          </div>
          <div className="site-menu">
            <ul className="menu-warrap">
              <li className="menu-child">
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="menu-child">
                <NavLink to="/categories">Categories</NavLink>
              </li>
              <li className="menu-child">
                <NavLink to="/new-diary">New Diary</NavLink>
              </li>
              <li className="menu-child">
                <NavLink to="/gallery">Gallery</NavLink>
              </li>
            </ul>
          </div>
          <div className="site-user">
            <Avatar
              alt="fwn12tt"
              src={AvatarImg}
              sx={{ width: 45, height: 45 }}
              className="user-avatar"
              onClick={handleClick}
            />
            <div className="user-details" style={open ? display : none}>
                <div className="wrapper">
                  <Link to="/profile" onClick={handleClose}>Fwn12tt's Profile</Link>
                  <span onClick={onClickLogOut}>Log Out</span>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div className="blur" style={open ? display : none} onClick={handleClose}></div>
    </div>
  );
}
