import React from 'react';
import './Online.css'

const Online = () => {
  return (
    <div className='online'>
        <li className='onlineFriend'>
            <div className='onlineProfileImgContainer'>
                <img src={require("../../assets/img_default.png")} alt='' className='onlineProfileImg'/>
            </div>
            <span className='onlineProfileName'>User</span>
        </li>
    </div>
  );
};

export default Online;