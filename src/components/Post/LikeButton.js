import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { UidContext } from '../AppContext'
import { useDispatch } from 'react-redux'
import { likePost, unlikePost } from '../../actions/post.actions'

import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

const LikeButton = ({ post }) => {
  const [ liked, setLiked ] = useState(false)
  const uid = useContext(UidContext)
  const dispatch = useDispatch()

  const like = () => {
    dispatch(likePost(post._id, uid))
    setLiked(true)
  }

  const unlike = () => {
    dispatch(unlikePost(post._id, uid))
    setLiked(false)
  }

  useEffect(() => {
    if (post.likers.includes(uid)) setLiked(true)
    else setLiked(false)
  }, [uid, post.likers, liked])

    return (
    <div className="like-container">
      {uid === null && (
        <Popup
          trigger={<img src="./img/icons/heart.svg" alt="like" />}
          position={["bottom center", "bottom right", "bottom left"]}
          closeOnDocumentClick
        >
          <div>Connectez-vous pour aimer un poste !</div>
        </Popup>
      )}
      {uid && liked === false && (
        <img src="./img/icons/heart.svg" onClick={like}/>
      )}
      {uid && liked && (
        <img src="./img/icons/heart-filled.svg" onClick={unlike}/>
      )}
      <span>{post.likers.length}</span>
    </div>
  )
}

export default LikeButton