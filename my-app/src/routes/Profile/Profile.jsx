import React, { useContext } from "react";
import Navbar from "../../components/navbar/Navbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Rightbar from "../../components/rightbar/Rightbar";
import "./Profile.css";
import { AuthContext } from "../../context/AuthContext";
import UserPost from "../../components/userPost/UserPost";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="profile">
      <Navbar />
      <div className="profileWrapper">
        <Leftbar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileUser">
              <img
                src={currentUser.photoURL}
                alt=""
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{currentUser.displayName}</h4>
              <span className="profileInfoDesc">Catch a Vybe</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <UserPost/>
            <Rightbar profile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
