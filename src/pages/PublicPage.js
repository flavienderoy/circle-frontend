import React from 'react'
import Navbar from '../components/Navbar'
import LeftNav from '../components/LeftNav'
import ThreadPublic from '../components/ThreadPublic'
import NewPostForm from '../components/Post/NewPostForm'
import Log from '../components/log'
import { useContext, useState } from 'react'
import { UidContext } from '../components/AppContext'
import FriendsHint from '../components/profil/FriendsHint'

const Public = () => {
  const uid = useContext(UidContext)
  const [ isReloadPost, setIsReloadPost ] = useState(false)

  const addPostFormReloadAllPosts = () => {
    setIsReloadPost(!isReloadPost)
  }

  return (
    <div className='home'>
      <Navbar />
      <LeftNav />
      <div className='main'>
        <div className='home-header'>
          {uid ? <NewPostForm reloadPost={addPostFormReloadAllPosts} /> : <Log signin={true} signup={false} />}
        </div>
        <ThreadPublic isReloadPost={isReloadPost} setIsReloadPost={setIsReloadPost} />
      </div>
      <div className="right-side">
        <div className="right-side-container">
          <div className="wrapper">
            {uid && <FriendsHint />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Public