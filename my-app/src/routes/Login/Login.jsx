import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { auth } from "../../utils/Firebase/firebase";


const Login = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    const email = event.target[0].value;
    const password = event.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/')
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">TheVybe</h3>
          <span className="loginDesc">
            Feel The Vybe And Feel The Music While Connecting with Friends.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <div className="Bottom">
              <form onSubmit={handleLogin} className="bottomBox">
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  className="loginInput"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  className="loginInput"
                  minLength={6}
                  required
                />
                <button type="submit" className="loginButton">
                  Sign In
                </button>
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  <button className="signUpButton">Create New Account</button>
                </Link>
                {error && <span> Something went Wrong</span>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
