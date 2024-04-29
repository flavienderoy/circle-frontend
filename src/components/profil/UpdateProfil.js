import React, { useState, useEffect } from 'react'
import LeftNav from '../LeftNav'
import NavBar from '../Navbar'
import { useDispatch, useSelector } from 'react-redux'
import UploadImg from './UploadImg'
import { userReducer } from '../../reducers/user.reducer'
import { usersReducer } from '../../reducers/users.reducer'
import { updateBio } from '../../actions/user.actions'
import { dateParser } from '../Utils'
import { getUsers } from '../../actions/user.actions';
import FollowHandler from './FollowHandler'


const UpdateProfil = () => {
  const [ bio, setBio ] = useState('')
  const [ updateForm, setUpdateForm ] = useState(false)
  const userData = useSelector((state) => state.userReducer)
  const usersData = useSelector((state) => state.usersReducer)
  console.log("usersDataaaaaa", usersData)
  let imgProfile = ''
  if (userData && userData.picture) {
    let imagePath = userData.picture.substring(1)
    imgProfile = "http://localhost:2415" + imagePath
  }
  const [ followingPopup, setFollowingPopup ] = useState(false)
  const [ followersPopup, setFollowersPopup ] = useState(false)

  const dispatch = useDispatch()

  const handleUpdate = () => {
    dispatch(updateBio(userData._id, bio))
    setUpdateForm(false)
  }

  return (
    <div className="profil-container">
      <NavBar />
      <LeftNav />
      <h1>Profil de {userData.pseudo}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img src={imgProfile} alt="user-pic" />
          <UploadImg />
        </div>
        <div className="right-part">
          <div className='bio-update'>
            <h3>Bio</h3>
            {updateForm === false && (
              <>
                <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                <button onClick={() => setUpdateForm(!updateForm)}>Modifier bio</button>
              </>
            )}
            {updateForm && (
              <>
                <textarea type="text" defaultValue={userData.bio} onChange={(e) => setBio(e.target.value)}></textarea>
                <button onClick={handleUpdate}>Enregistrer</button>
              </>
            )}
          </div>
          <h4>Membre depuis le {dateParser(userData.createdAt)}</h4>
          <h5 onClick={() => setFollowingPopup(true)}>Abonnements ({userData.following ? userData.following.length : ""})</h5>
          <h5 onClick={() => setFollowersPopup(true)}>Abonnés ({userData.followers ? userData.followers.length : ""})</h5>
        </div>
      </div>
      {followingPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Abonnements</h3>
            <span className="cross" onClick={() => setFollowingPopup(false)}>
              &#10005;
            </span>
            <ul>
              {usersData.map((user) => {
                console.log("user", user)
                for (let i = 0; i < userData.following.length; i++) {
                  if (user._id === userData.following[ i ]) {
                    return (
                      <li key={user._id}>
                        <img src={`https://localhost:2415/${user.picture}`} alt="user-pic" />
                        <h4>{user.pseudo}</h4>
                        <div className="follow-handler">
                          <FollowHandler idToFollow={user._id}/>
                        </div>
                      </li>
                    )
                  }
                }
                return null
              })}
            </ul>
          </div>
        </div>
      )}
      {followersPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Abonnés</h3>
            <span className="cross" onClick={() => setFollowersPopup(false)}>
              &#10005;
            </span>
            <ul>
              {usersData.map((user) => {
                for (let i = 0; i < userData.followers.length; i++) {
                  if (user._id === userData.followers[ i ]) {
                    return (
                      <li key={user._id}>
                        <img src={`https://localhost:2415/${user.picture}`} alt="user-pic" />
                        <h4>{user.pseudo}</h4>
                        <div className="follow-handler">
                          test
                        </div>
                      </li>
                    )
                  }
                }
                return null
              })}
              
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default UpdateProfil
