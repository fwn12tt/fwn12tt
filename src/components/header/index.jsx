import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import AvatarImg from "../../assets/images/happy1.jpeg";
import Avatar from "@mui/material/Avatar";
import "./style.css";
import { logout } from "../../firebase";
import MenuIcon from '@mui/icons-material/Menu';
//
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

export default function Header() {
  const [state, setState] = React.useState({
    left: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };
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
  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className="header-section">
      <div className="container">
        <div className="content-header flex-box">
          <div className="site-logo site-logo-desktop">
            <Link to="/">
              <img src={Logo} alt="logo" />
            </Link>
          </div>
          <div className="site-offcanvas">
            <MenuIcon onClick={toggleDrawer('left', true)}/>
          </div>
          <div className="site-logo site-logo-mobile">
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
      <React.Fragment>
          <Drawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
          >
            {list('left')}
          </Drawer>
        </React.Fragment>
    </div>
  );
}
