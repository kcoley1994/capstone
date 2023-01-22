import React, { useContext } from "react";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import ChatIcon from "@mui/icons-material/Chat";
import PeopleIcon from "@mui/icons-material/People";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LogoutIcon from "@mui/icons-material/Logout";
import "./Leftbar.css";
import MenuLink from "../menuLink/MenuLink";
import { DarkModeContext } from "../../context/darkModeContext";

const Leftbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="leftbar">
      <div className="leftbarWrapper">
        <MenuLink Icon={<RssFeedIcon />} text="Feed" />
        <MenuLink Icon={<ChatIcon />} text="Chats" />
        <MenuLink Icon={<PeopleIcon />} text="Friends" />
        <MenuLink Icon={<OndemandVideoIcon />} text="Videos" />
        <MenuLink Icon={<HeadphonesIcon />} text="Music" />
        <span onClick={() => dispatch({ type: "TOGGLE" })}>
          <MenuLink Icon={<Brightness4Icon />} text="Theme" />
        </span>
        <MenuLink Icon={<LogoutIcon />} text="Logout" />
      </div>
    </div>
  );
};

export default Leftbar;
