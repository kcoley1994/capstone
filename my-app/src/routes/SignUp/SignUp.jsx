import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, storage } from "../../utils/Firebase/firebase";

const SignUp = () => {
  const [img, setImg] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    const firstName = event.target[0].value;
    const lastName = event.target[1].value;
    const displayName = event.target[2].value;
    const email = event.target[3].value;
    const password = event.target[4].value;
    try {
      const register = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const storageRef = ref(storage, "usersImages/" + displayName);

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          setError(true);
        },

        () => {
          getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
            await updateProfile(register.user, {
              displayName,
              photoURL: downloadURL,
            });
            const userData = {
              uid: register.user.uid,
              firstName,
              lastName,
              displayName,
              email,
              photoURL: downloadURL,
            };
            console.log(register)

            await setDoc(doc(db, "users", register.user.uid), userData);

            await setDoc(doc(db, "userPosts", register.user.uid), {
              messages: []
            });
          });
        }
      );
    } catch (error) {
      setError(true);
    }
    navigate('/login');
  };
  return (
    <div className="signUp">
      <div className="signUpWrapper">
        <div className="signUpLeft">
          <h3 className="signUpLogo">TheVybe...</h3>
          <span className="signUpDesc">
            Feel The Vybe And Feel The Music While Connecting with Friends.
          </span>
        </div>
        <div className="signUpRight">
          <div className="signUpBox">
            <div className="top">
              <img
                src={
                  img
                    ? URL.createObjectURL(img)
                    : require("../../assets/img_default.png")
                }
                alt=""
                className="profileImg"
              />
              <div className="formInput">
                <label htmlFor="file">
                  <input
                    type="file"
                    name="file"
                    id="file"
                    accept=".png,.jpeg,.jpg"
                    onChange={(event) => setImg(event.target.files[0])}
                  />
                </label>
              </div>
            </div>
            <div className="Bottom">
              <form onSubmit={handleSignUp} className="bottomBox">
                <input
                  type="text"
                  placeholder="First Name"
                  id="firstName"
                  className="signUpInput"
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  id="lastName"
                  className="signUpInput"
                  required
                />
                <input
                  type="text"
                  placeholder="Username"
                  id="displayName"
                  className="signUpInput"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  className="signUpInput"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  className="signUpInput"
                  minLength={6}
                  required
                />
                {/* <input
                  type="password"
                  placeholder="Confirm Password"
                  id="confirmPassword"
                  className="signUpInput"
                  required
                /> */}
                <button type="submit" className="signUpButton">
                  SignUp
                </button>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <button className="loginButton">Log into Account</button>
                </Link>
                {error && <span> Something went wrong</span>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
