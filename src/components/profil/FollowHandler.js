import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import userReducer from '../../reducers/user.reducer'
import { useState } from 'react'
import { isEmpty } from '../Utils'
import { followUser, unfollowUser } from '../../actions/user.actions'


const FollowHandler = ({ idToFollow, type }) => {
  const userData = useSelector((state) => state.userReducer)
  const [ isFollowed, setIsFollowed ] = useState(false)
  const dispatch = useDispatch();

  const handleFollow = () => {
    dispatch(followUser(userData._id, idToFollow))
    setIsFollowed(true)
   }

  const handleUnfollow = () => {
    dispatch(unfollowUser(userData._id, idToFollow))
    setIsFollowed(false)
   }

  useEffect(() => {
    if (!isEmpty(userData.following) && userData.following.includes(idToFollow)) {
      setIsFollowed(true)
    } else {
      setIsFollowed(false)
    }

  }, [ userData, idToFollow ])

  return (
    <div>
      <>
        {isFollowed && !isEmpty(userData) && (
          <span onClick={handleUnfollow}>
            {type === "suggestion" && <button className="follow-btn">Abonné</button>}
            {type === "card" && <img src="./img/icons/checked.svg"></img>}
          </span>
        )}
        {isFollowed === false && !isEmpty(userData) &&(
          <span onClick={handleFollow}>
            {type === "suggestion" && <button className="follow-btn">Suivre</button> }
            {type === "card" && <img src="./img/icons/check.svg"></img>}
          </span>
        )}
      </>
    </div>
  )

}

export default FollowHandler