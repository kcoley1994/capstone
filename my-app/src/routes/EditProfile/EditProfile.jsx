import React, { useContext, useState } from "react";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import Navbar from "../../components/navbar/Navbar";
import Leftbar from "../../components/leftbar/Leftbar";
import "./EditProfile.css";
import { AuthContext } from "../../context/AuthContext";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../utils/Firebase/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [img, setImg] = useState(null);
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    username: "",
    newEmail: "",
    phone: "",
    address: "",
    relationship: "",
    oldPassword: "",
  });

  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (img) {
      const storageRef = ref(storage, "usersImages/" + uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          setError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(currentUser, {
              displayName: data.username,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", currentUser.uid), {
              uid: currentUser.uid,
              photoURL: downloadURL,
              displayName: data.username,
              email: data.newEmail,
              phone: data.phone,
              address: data.address,
              relationship: data.relationship,
              createdAt: serverTimestamp(),
            });
            const credential = EmailAuthProvider.credential(
              currentUser.email,
              data.oldPassword
            );
            await reauthenticateWithCredential(currentUser, credential).then(
              async () => {
                await updateEmail(currentUser, data.newEmail);
              }
            );
          });
        }
      );
    } else {
      await updateProfile(currentUser, {
        displayName: data.username,
      });

      await setDoc(doc(db, "users", currentUser.uid), {
        uid: currentUser.uid,

        displayName: data.username,
        email: data.newEmail,
        phone: data.phone,
        address: data.address,
        relationship: data.relationship,
        createdAt: serverTimestamp(),
      });
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        data.oldPassword
      );
      await reauthenticateWithCredential(currentUser, credential).then(
        async () => {
          await updateEmail(currentUser, data.newEmail);
        }
      );
    }
    navigate("/login");
  };
  //  console.log(data)
  return (
    <div className="editProfile">
      <Navbar />
      <div className="editProfileWrapper">
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
              <span className="profileInfoDesc">Catch a Vybe </span>
            </div>
          </div>
          <div className="editProfileRightBottom">
            <div className="top">
              <h1 className="edith1">Edit User Profile</h1>
            </div>
            <div className="bottom">
              <div className="left">
                <img
                  src={
                    img
                      ? URL.createObjectURL(img)
                      : require("../../assets/img_default.png")
                  }
                  alt=""
                  className="editImg"
                />
              </div>
              <div className="right">
                <form onSubmit={handleUpdate}>
                  <div className="formInput">
                    <label htmlFor="file">
                      Image: <DriveFolderUploadIcon className="icon" />
                    </label>
                    <input
                      type="file"
                      id="file"
                      onChange={(event) => setImg(event.target.files[0])}
                    />
                  </div>
                  <div className="formInput">
                    <label> UserName:</label>
                    <input
                      type="text"
                      name="username"
                      placeholder="What's Your UserName?"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="formInput">
                    <label> Email:</label>
                    <input
                      type="text"
                      name="newEmail"
                      placeholder="Email"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="formInput">
                    <label> Phone Number:</label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone Number"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="formInput">
                    <label> Address:</label>
                    <input
                      type="text"
                      name="address"
                      placeholder="Address"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="formInput">
                    <label> Relationship:</label>
                    <input
                      type="text"
                      name="relationship"
                      placeholder="Relationship Status"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="formInput">
                    <label>Password:</label>
                    <input
                      type="password"
                      name="oldPassword"
                      placeholder="Confirm With Password"
                      onChange={handleChange}
                    />
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
