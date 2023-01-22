import React from "react";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import Navbar from "../../components/navbar/Navbar";
import Leftbar from "../../components/leftbar/Leftbar";
import "./EditProfile.css";

const EditProfile = () => {
  return (
    <div className="editProfile">
      <Navbar />
      <div className="editProfileWrapper">
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
          <div className="editProfileRightBottom">
            <div className="top">
              <h1 className="edith1">Edit User Profile</h1>
            </div>
            <div className="bottom">
              <div className="left">
                <img src={require("../../assets/img_default.png")} alt="" className="editImg" />
              </div>
              <div className="right">
                <form>
                  <div className="formInput">
                    <label htmlFor="file">
                      Image: <DriveFolderUploadIcon className="icon" />
                    </label>
                    <input type="file" id="file" />
                  </div>
                  <div className="formInput">
                    <label> Name:</label>
                    <input type="text" placeholder="What's Your Name?" />
                  </div>
                  <div className="formInput">
                    <label> Email:</label>
                    <input type="text" placeholder="Email" />
                  </div>
                  <div className="formInput">
                    <label> Username:</label>
                    <input type="text" placeholder="Username" />
                  </div>
                  <div className="formInput">
                    <label> Phone Number:</label>
                    <input type="text" placeholder="Phone Number" />
                  </div>
                  <div className="formInput">
                    <label> Address:</label>
                    <input type="text" placeholder="Address" />
                  </div>
                  <button type="submit" className="updateButton">
                    Update Profile
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
