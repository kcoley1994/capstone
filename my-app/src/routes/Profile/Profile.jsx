import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar'
import "./Profile.css";

const Profile = () => {
  return (
    <div className="profile">
      <Navbar />
      <div className="profileWrapper">
        <Leftbar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileUser">
              <img src={require("../../assets/kevon.jpg")} alt="" className="profileUserImg" />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">Kevon</h4>
                <span className="profileInfoDesc">hi Friends</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed/>
            <Rightbar profile/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
