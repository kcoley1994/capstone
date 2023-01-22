import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
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
              <form className="bottomBox">
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
                  required
                />
                <button type="submit" className="loginButton">
                  Sign In
                </button>
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  <button className="signUpButton">Create New Account</button>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
