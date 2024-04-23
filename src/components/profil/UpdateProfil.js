import React, { useState } from 'react'
import LeftNav from '../LeftNav'
import NavBar from '../Navbar'
import { useDispatch, useSelector } from 'react-redux'
import UploadImg from './UploadImg'
import { userReducer } from '../../reducers/user.reducer'
import { updateBio } from '../../actions/user.actions'

const UpdateProfil = () => {
  const [ bio, setBio ] = useState('')
  const [ updateForm, setUpdateForm ] = useState(false)
  const userData = useSelector((state) => state.userReducer)
  console.log(userData.picture)
  let imgProfile = ''
  if (userData && userData.picture) {
    let imagePath = userData.picture.substring(1)
    imgProfile = "http://localhost:2415" + imagePath
  }

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
          <h4>Membre depuis le {userData.createdAt}</h4>
        </div>
      </div>
    </div>
  )
}

export default UpdateProfil
