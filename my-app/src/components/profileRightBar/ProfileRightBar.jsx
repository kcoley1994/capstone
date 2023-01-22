import React from "react";
import { Link } from "react-router-dom";
import "./ProfileRightBar.css";

const ProfileRightBar = () => {
  return (
    <div className="profileRightBar">
      <div className="profileRightBarHeader">
        <span className="ProfileRightBarTitle">User Information</span>
        <Link to="/profile/username/edit" style={{textDecoration: 'none'}}>
          <span className="editButton">Edit Profile</span>
        </Link>
      </div>
      <div className="profileRightBarInfo">
        <div className="profileRightBarInfoItem">
          <span className="profileRightBarInfoKey">Email: </span>
          <span className="profileRightBarInfoValue"> K.evon@hotmail.com</span>
        </div>
        <div className="profileRightBarInfoItem">
          <span className="profileRightBarInfoKey">Phone Number: </span>
          <span className="profileRightBarInfoValue"> 954 555 5555</span>
        </div>
        <div className="profileRightBarInfoItem">
          <span className="profileRightBarInfoKey">Address: </span>
          <span className="profileRightBarInfoValue"> 5271 nw 19th Street</span>
        </div>
        <div className="profileRightBarInfoItem">
          <span className="profileRightBarInfoKey">Country: </span>
          <span className="profileRightBarInfoValue"> United States</span>
        </div>
        <div className="profileRightBarInfoItem">
          <span className="profileRightBarInfoKey">Relationship Status: </span>
          <span className="profileRightBarInfoValue"> Single</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileRightBar;
