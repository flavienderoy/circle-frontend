import React from 'react'
import Navbar from '../components/Navbar';
import LeftNav from '../components/LeftNav'
import Thread from '../components/Thread';

const Home = () => {
  return (
    <div className='home'>
      <Navbar />
      <LeftNav />
      <div className='main'>
        <Thread/>
      </div>
    </div>
  )
}

export default Home;