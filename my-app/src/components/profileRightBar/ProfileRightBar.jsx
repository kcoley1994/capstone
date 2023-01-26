import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../utils/Firebase/firebase";
import "./ProfileRightBar.css";

const ProfileRightBar = () => {
  const [getUserInfo, setGetUserInfo] = useState([]);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getInfo = () => {
      const unSubscribe = onSnapshot(
        doc(db, "users", currentUser.uid),
        (doc) => {
          setGetUserInfo(doc.data());
        }
      );
      return () => {
        unSubscribe();
      };
    };
    currentUser.uid && getInfo();
  }, [currentUser.uid]);

  // console.log(getUserInfo);

  return (
    <div className="profileRightBar">
      <div className="profileRightBarHeader">
        <span className="ProfileRightBarTitle">User Information</span>
        <Link
          to={`/profile/${currentUser.displayName}/edit`}
          style={{ textDecoration: "none" }}
        >
          <span className="editButton">Edit Profile</span>
        </Link>
      </div>
      <div className="profileRightBarInfo">
        <div className="profileRightBarInfoItem">
          <span className="profileRightBarInfoKey">Email: </span>
          <span className="profileRightBarInfoValue">
            {getUserInfo.email ? getUserInfo.email : currentUser.email}
          </span>
        </div>
        <div className="profileRightBarInfoItem">
          <span className="profileRightBarInfoKey">Phone Number: </span>
          <span className="profileRightBarInfoValue"> {getUserInfo.phone}</span>
        </div>
        <div className="profileRightBarInfoItem">
          <span className="profileRightBarInfoKey">Address: </span>
          <span className="profileRightBarInfoValue">
            {getUserInfo.address}
          </span>
        </div>
        <div className="profileRightBarInfoItem">
          <span className="profileRightBarInfoKey">Relationship Status: </span>
          <span className="profileRightBarInfoValue">
            {getUserInfo.relationship}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileRightBar;
