import React from 'react'
import Navbar from '../components/Navbar';
import LeftNav from '../components/LeftNav'
import Thread from '../components/Thread';
import NewPostForm from '../components/Post/NewPostForm';
import Log from '../components/log';
import { useContext, useState } from 'react';
import { UidContext } from '../components/AppContext';

const Home = () => {
const uid = useContext(UidContext);
const [isReloadPost, setIsReloadPost] = useState(false);

const addPostFormReloadAllPosts = () => {
  setIsReloadPost(!isReloadPost);
}

  return (
    <div className='home'>
      <Navbar />
      <LeftNav />
      <div className='main'>
        <div className='home-header'>
        {uid ? <NewPostForm reloadPost={addPostFormReloadAllPosts} /> : <Log signin={true} signup={false}/>}
        </div>
        <Thread isReloadPost={isReloadPost} setIsReloadPost={setIsReloadPost}/>
      </div>
    </div>
  )
}

export default Home;