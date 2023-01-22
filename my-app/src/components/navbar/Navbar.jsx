import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import InboxIcon from "@mui/icons-material/Inbox";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import "./Navbar.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="navbarContainer">
      <div className="navbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">The Vybe</span>
        </Link>
      </div>
      <div className="navbarCenter">
        <div className="searchBar">
          <SearchIcon className="searchIcon" />
          <input
            type="text"
            placeholder="Search for friends"
            className="searchInput"
          />
        </div>
      </div>
      <div className="navbarRight">
        <div className="navbarLinks">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="navbar-link">Home</span>
          </Link>
          <Link to="/profile/username" style={{ textDecoration: "none" }}>
            <span className="navbar-link">Profile</span>
          </Link>
          <Link to="/music" style={{ textDecoration: "none" }}>
            <span className="navbar-link">Music</span>
          </Link>
        </div>
        <div className="navbarIcons">
          <div className="navbarIconItem">
            <PersonAddIcon />
            <span className="navbarIconBadge">2</span>
          </div>
          <div className="navbarIconItem">
            <InboxIcon />
            <span className="navbarIconBadge">5</span>
          </div>
          <div className="navbarIconItem">
            <NotificationsActiveIcon />
            <span className="navbarIconBadge">20</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
