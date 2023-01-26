import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Home from "./routes/Home/Home.jsx";
import Profile from "./routes/Profile/Profile.jsx";
import Login from "./routes/Login/Login";
import SignUp from "./routes/SignUp/SignUp";
import EditProfile from "./routes/EditProfile/EditProfile";
import Music from "./routes/Music/Music";
import "./style/darkmode.css";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext.js";
import { AuthContext } from "./context/AuthContext.js";

const App = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  const AuthRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/",
      element: (
        <AuthRoute>
          <Home />
        </AuthRoute>
      ),
    },
    {
      path: "/music",
      element: (
        <AuthRoute>
          <Music />
        </AuthRoute>
      ),
    },
    {
      path: "/profile/:username",
      element: (
        <AuthRoute>
          <Profile />
        </AuthRoute>
      ),
    },
    {
      path: "/profile/:username/edit",
      element: (
        <AuthRoute>
          <EditProfile />
        </AuthRoute>
      ),
    },
  ]);
  return (
    <div className={darkMode ? "app darkmode" : "app"}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
