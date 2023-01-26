import React, { useContext, useState } from "react";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import CloseIcon from "@mui/icons-material/Close";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import "./Share.css";
import { AuthContext } from "../../context/AuthContext";
import { storage, db } from "../../utils/Firebase/firebase.js";
import { v4 as uuid } from "uuid";
import {
  addDoc,
  arrayUnion,
  collection,
  serverTimestamp,
  Timestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import Picker from "@emoji-mart/react"



const Share = () => {
  const [error, setError] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [input, setInput] = useState("");
  const[showEmojis, setShowEmojis] = useState(false)

  const [img, setImg] = useState(null);

  const handlePost = async (event) => {
    
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          setError(true)
        },
        () => {
          
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await addDoc(collection(db, "posts"), {
             uid: currentUser.uid,
             photoURL: currentUser.photoURL,
             displayName:currentUser.displayName,
             input,
             img:downloadURL,
             timestamp: serverTimestamp(),
            });
            await updateDoc(doc(db, "userPosts", currentUser.uid), {
              messages: arrayUnion({
                id: uuid(),
                uid: currentUser.uid,
                photoURL:currentUser.photoURL,
                displayName:currentUser.displayName,
                input,
                img:downloadURL,
                timestamp: Timestamp.now(),
              }),
            });
          });
        }
      );
    } else {
      await addDoc(collection(db, "posts"), {
        uid: currentUser.uid,
        photoURL: currentUser.photoURL,
        displayName:currentUser.displayName,
        input,

        timestamp: serverTimestamp(),
       });
       await updateDoc(doc(db, "userPosts", currentUser.uid), {
         messages: arrayUnion({
           id: uuid(),
           uid: currentUser.uid,
           photoURL:currentUser.photoURL,
           displayName:currentUser.displayName,
           input,

           timestamp: Timestamp.now(),
         }),
       });
    }
    setInput("");
    setImg(null);
    setShowEmojis(false);
  };

  const handleKey = (event) => {
    event.code === "Enter" && handlePost();

  };

  const addEmoji= (event) =>{
    let symbol = event.unified.split('-')
    let codesArray =[]
    symbol.forEach((element) => codesArray.push("0x" + element));
    let emoji =String.fromCodePoint(...codesArray)
    setInput(input + emoji);
  };

  const removeImg = () => {
    setImg(null);
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img src={currentUser.photoURL} alt="" className="shareProfileImg" />
          <textarea
            type="text"
            rows={2}
            style={{ resize: "none", overflow: "hidden" }}
            placeholder={"What's The Vybe " + currentUser.displayName + "?"}
            value={input}
            className="shareInput"
            onChange={(event) => setInput(event.target.value)}
            onKeyDown= {handleKey}
          />
        </div>
        <hr className="shareHr" />
        {img && (
          <div className="shareImgContainer">
            <img src={URL.createObjectURL(img)} alt="" className="shareImg" />
            <CloseIcon className="shareCancelImg" onClick={removeImg} />
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
                onChange={(event) => setImg(event.target.files[0])}
                onKeyDown={handleKey}
              />
            </label>
            <div onClick={() =>setShowEmojis(!showEmojis)} className="share-option">
              <EmojiEmotionsIcon
                className="shareIcon"
                style={{ color: "#E7C613" }}
              />
              <span className="shareOptionText">Feeling/Emotions</span>
            </div>
          </div>

        </div>
        {showEmojis && <div className="emoji">
          <Picker onEmojiSelect={addEmoji} />
        </div>}
      </div>
    </div>
  );
};

export default Share;
