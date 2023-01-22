import React from 'react';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import './Rightbar.css';
import PlaylistLink from '../playlistLink/PlaylistLink';
import Online from '../online/Online';
import ProfileRightBar from '../profileRightBar/ProfileRightBar';

const Rightbar = ({profile}) => {
  return (
    <div className='rightbar'>
      <div className='rightbarWrapper'>
      { profile ? <ProfileRightBar/> :<PlaylistLink IconPlay={<PlayArrowIcon/>} IconStop={<StopIcon/>} textSong='Wet Dreamz' textArtist='Jcole'/>}
      </div>
      <div className='rightbarCenter'>
        <span className='rightbarCenterTitle'> 
          <b>Online Friends</b>
        </span>
        <ul className='rightbarFriendList'>
          <Online/>
        </ul>
      </div>
    </div>
  )
};

export default Rightbar;