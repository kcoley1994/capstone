import React, { useState } from "react";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import CloseIcon from '@mui/icons-material/Close';
import "./Share.css";

const Share = () => {
  const [file, setFile] = useState(null);
  const removeImg = () => {
    setFile(null);
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <input
            type="text"
            placeholder=" What's The Vybe?"
            className="shareInput"
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
            <CloseIcon className="shareCancelImg" onClick={removeImg}/>
          </div>
        )}
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="share-option">
              <VideoCameraFrontIcon
                className="shareIcon"
                style={{ color: "red" }}
              />
              <span className="shareOptionText">Live Stream</span>
            </div>
            <label htmlFor="file" className="share-option">
              <PermMediaIcon className="shareIcon" style={{ color: "blue" }} />
              <span className="shareOptionText">Video/Photo</span>
              <input
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                style={{ display: "none" }}
                onChange={(event) => setFile(event.target.files[0])}
              />
            </label>
            <div className="share-option">
              <EmojiEmotionsIcon
                className="shareIcon"
                style={{ color: "#E7C613" }}
              />
              <span className="shareOptionText">Feeling/Emotions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
