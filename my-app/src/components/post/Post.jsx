import React, { useContext, useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import "./Post.css";
import {
  MoreVert,
  Favorite,
  ThumbUp,
  ThumbUpAltOutlined,
  ChatBubbleOutline,
  ShareOutlined,
} from "@mui/icons-material";
import TimeAgo from "react-timeago";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../../utils/Firebase/firebase";
import { AuthContext } from "../../context/AuthContext";

const Post = ({ post }) => {
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const [input, setInput] = useState("");
  const [comments, setComments] = useState([]);
  const [showComment, setShowComment] = useState(false);
  const [commentBoxVis, setCommentBoxVis] = useState(false);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const unSub = onSnapshot(
      collection(db, "posts", post.id, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
    return () => {
      unSub();
    };
  }, [post.id]);

  useEffect(() => {
    setLiked(likes.findIndex((like) => like.id === currentUser?.uid) !== -1);
  }, [likes, currentUser.uid]);

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "posts", post.id, "comments"),
      (snapshot) => {
        setComments(
          snapshot.docs.map((snapshot) => ({
            id: snapshot.id,
            data: snapshot.data(),
          }))
        );
      }
    );
    return () => {
      unSubscribe();
    };
  }, [post.id]);

  const handleComment = async (event) => {
    event.preventDefault();

    await addDoc(collection(db, "posts", post.id, "comments"), {
      comment: input,
      displayName: currentUser.displayName,
      photoURL: currentUser.photoURL,
      uid: currentUser.uid,
      timestamp: serverTimestamp(),
    });
    setCommentBoxVis(false);
    setInput("");
  };

  const likePost = async () => {
    if (liked) {
      await deleteDoc(doc(db, "posts", post.id, "likes", currentUser.uid));
    } else {
      await setDoc(doc(db, "posts", post.id, "likes", currentUser.uid), {
        userId: currentUser.uid,
      });
    }
  };
  // console.log(comments);
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              src={post.data.photoURL}
              alt="User"
              className="postProfileImg"
            />
            <span className="postUsername">{post.data.displayName}</span>
            <span className="postDate">
              <TimeAgo
                date={new Date(post.data?.timestamp?.toDate()).toLocaleString()}
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
          <span className="postText">{post.data.input}</span>
          <img src={post.data.img} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <Favorite
              className="postBottomLeftIcon"
              style={{ color: "silver" }}
            />
            <ThumbUp
              onClick={(event) => {
                likePost();
              }}
              className="postBottomLeftIcon"
              style={{ color: "blue" }}
            />
            {likes.length > 0 && (
              <span className="postLikeCounter">{likes.length} </span>
            )}
          </div>
          <div className="postBottomRight">
            <span
              className="postCommentText"
              onClick={() => setShowComment(!showComment)}
            >
              {comments.length} - comments - share
            </span>
          </div>
        </div>
        <hr className="postHrFooter" />
        <div className="postBottomFooter">
          <div
            className="postBottomFooterItem"
            onClick={(event) => {
              likePost();
            }}
          >
            {liked ? (
              <ThumbUp style={{ color: "#011631" }} className="footerIcon" />
            ) : (
              <ThumbUpAltOutlined className="postFooterIcon" />
            )}

            <span className="postFooterText">Like</span>
          </div>
          <div
            className="postBottomFooterItem"
            onClick={() => setCommentBoxVis(!commentBoxVis)}
          >
            <ChatBubbleOutline className="postFooterIcon" />
            <span className="postFooterText">Comment</span>
          </div>
          <div className="postBottomFooterItem">
            <ShareOutlined className="postFooterIcon" />
            <span className="postFooterText">Share</span>
          </div>
        </div>
      </div>
      {commentBoxVis && (
        <form onSubmit={handleComment} className="commentBox">
          <textarea
            type="text"
            placeholder="Write a Comment"
            className="commentInput"
            rows={1}
            style={{ resize: "none" }}
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <button type="submit" disabled={!input} className="commentPost">
            Comment
          </button>
        </form>
      )}
      {showComment > 0 && (
        <div className="comment">
          {comments.sort((a,b)=>a.data.timestamp - b.data.timestamp).map((c) => (
            <div>
              <div className="commentWrapper">
                <img
                  src={c.data.photoURL}
                  alt=""
                  className="commentProfileImg"
                />
                <div className="commentInfo">
                  <span className="commentUsername">{c.data.displayName}</span>
                  <p className="commentText">{c.data.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;
