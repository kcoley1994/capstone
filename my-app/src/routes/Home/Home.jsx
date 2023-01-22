import React from 'react'
import Navbar from '../../components/navbar/Navbar';
import Leftbar from '../../components/leftbar/Leftbar';
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import Footer from '../../components/footer/Footer'
import "./home.css"

const Home = () => {
  return (
    <div className='home'>
      <Navbar />
      <div className='homeContainer'>
        <Leftbar/>
        <Feed/>
        <Rightbar/>
      </div>
      <div className='homeFooter'>
        <Footer/>
      </div>
    </div>
  )
};

export default Home;