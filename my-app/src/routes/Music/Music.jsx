import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Leftbar from '../../components/leftbar/Leftbar';
import AddMusic from '../../components/addMusic/AddMusic'
import Rightbar from '../../components/rightbar/Rightbar';
import './Music.css'
import Footer from '../../components/footer/Footer';

const Music = () => {
  return (
    <div className='music'>
        <Navbar/>
        <div className='musicContainer'>
            <Leftbar/>
            <AddMusic/>
            <Rightbar/>
        </div>
        <div className='musicFooter'>
            <Footer/>
        </div>
    </div>
  );
};

export default Music;