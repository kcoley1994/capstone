import { MoreVert } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import Timeago from "react-timeago";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../utils/Firebase/firebase";
import Share from "../share/Share";
import "./UserPost.css";

const UserPost = () => {
  const [usersPosts, setUsersPosts] = useState([]);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getUsersPost = () => {
      const unsubscribe = onSnapshot(
        doc(db, "userPosts", currentUser.uid),
        (doc) => {
          doc.exists() && setUsersPosts(doc.data().messages);
          console.log(doc.data().messages);
        }
      );
      return () => {
        unsubscribe();
      };
    };
    currentUser.uid && getUsersPost();
  }, [currentUser.uid]);

  return (
    <div className="feedUserPost">
      <div className="feedUserPostWrapper">
        <Share />
        {usersPosts
          .sort((a, b) => b.timestamp - a.timestamp)
          .map((m) => (
            <div className="usersPost" key={m.id}>
              <div className="usersPostWrapper">
                <div className="postTop">
                  <div className="postTopLeft">
                    <img
                      src={m.photoURL}
                      alt="User"
                      className="postProfileImg"
                    />
                    <span className="postUsername">{m.displayName}</span>
                    <span className="postDate">
                      <Timeago
                        date={new Date(m.timestamp?.toDate()).toLocaleString()}
                      />
                    </span>
                  </div>
                  <div className="postTopRight">
                    <IconButton>
                      <MoreVert className="postVertButton" />
                    </IconButton>
                  </div>
                </div>
                <div className="postCenter">
                  <span className="postText">{m.input}</span>
                  <img src={m.img} alt="" className="postImg" />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserPost;
