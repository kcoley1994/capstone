import React from "react";
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

const Post = () => {
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img src={require("../../assets/img_default.png")} alt="User" className="postProfileImg" />
            <span className="postUsername">username</span>
            <span className="postDate">Date</span>
          </div>
          <div className="postTopRight">
            <IconButton>
              <MoreVert className="postVertButton" />
            </IconButton>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">Span</span>
          <img src="#" alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <Favorite
              className="postBottomLeftIcon"
              style={{ color: "silver" }}
            />
            <ThumbUp className="postBottomLeftIcon" style={{ color: "blue" }} />
            <span className="postLikeCounter">10</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">- comments - share</span>
          </div>
        </div>
        <hr className="postHrFooter" />
        <div className="postBottomFooter">
          <div className="postBottomFooterItem">
            <ThumbUpAltOutlined className="postFooterIcon" />
            <span className="postFooterText">Like</span>
          </div>
          <div className="postBottomFooterItem">
            <ChatBubbleOutline className="postFooterIcon" />
            <span className="postFooterText">Comment</span>
          </div>
          <div className="postBottomFooterItem">
            <ShareOutlined className="postFooterIcon" />
            <span className="postFooterText">Share</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
