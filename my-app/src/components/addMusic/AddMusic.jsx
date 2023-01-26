import React, { useState, useEffect } from "react";
import "./AddMusic.css";

const clientId = "02ba616421ae4db2b876a61713648b36";
const clientSecret = "0ff60cb9363d4d0692542893f0e13a46";

const AddMusic = () => {
  const [songs, setSongs] = useState(false);
  const [artists, setArtists] = useState(false);
  const [songUri, setSongUri] =useState(false);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const authParameter = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        clientId +
        "&client_secret=" +
        clientSecret,
    };

    const fetchSpotify = async () => {
      const response = await fetch(
        "https://accounts.spotify.com/api/token",
        authParameter
      );
      const data = await response.json();
      setAccessToken(data.access_token);
    };
    fetchSpotify();
  }, []);

  const Submit = async (event ) => {
    console.log("render");
    event.preventDefault();
    const songParameters = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };
    const response = await fetch(
      "https://api.spotify.com/v1/search?q=" +
        songs +
        "," +
        artists +
        "&type=track,artist",
      songParameters
    );
    const data = await response.json();
    console.log(data);
    console.log(songs)
    setSongs(data.tracks.items[0].name)
    setArtists(data.tracks.items[0].artists[0].name)
    setSongUri(data.tracks.items[0].uri)

    console.log(artists)
  };

  return (
    <div className="addMusic">
      <h1>Add to Playlist</h1>
      <form className="addMusicForm">
        <input
          type="text"
          className="addMusicInput"
          placeholder="Song"
          onChange={(event) => setSongs(event.target.value)}
        />
        <input
          type="text"
          className="addMusicInput"
          placeholder="Artist"
          onChange={(event) => setArtists(event.target.value)}
        />
        <button className="addMusicButton" onClick={Submit}>
          Add To Playlist
        </button>
      </form>
    </div>
  );
};

export default AddMusic;
