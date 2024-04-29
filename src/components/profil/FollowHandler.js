import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import userReducer from '../../reducers/user.reducer'
import { useState } from 'react'
import { isEmpty } from '../Utils'
import { followUser, unfollowUser } from '../../actions/user.actions'


const FollowHandler = ({ idToFollow }) => {
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
            <button className="follow-btn">Abonné</button>
          </span>
        )}
        {isFollowed === false && !isEmpty(userData) &&(
          <span onClick={handleFollow}>
            <button className="follow-btn">Suivre</button>
          </span>
        )}
      </>
    </div>
  )

}

export default FollowHandler