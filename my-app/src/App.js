import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home/Home.jsx";
import Profile from "./routes/Profile/Profile.jsx";
import Login from "./routes/Login/Login";
import SignUp from "./routes/SignUp/SignUp";
import EditProfile from "./routes/EditProfile/EditProfile";
import Music from "./routes/Music/Music";
import "./style/darkmode.css";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext.js";

const App = () => {
  const {darkMode} = useContext(DarkModeContext)
  return (
    <div className={darkMode ? "app darkmode" : "app"}>
      <Routes>
        <Route path="/">
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="music" element={<Music />} />
          <Route index element={<Home />} />
          <Route path="profile">
            <Route path=":username" element={<Profile />} />
            <Route path=":username/edit" element={<EditProfile />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
