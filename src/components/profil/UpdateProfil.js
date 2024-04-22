import React from 'react';
import LeftNav from '../LeftNav';
import NavBar from '../Navbar';
import { useSelector } from 'react-redux'
import UploadImg from './UploadImg';

const UpdateProfil = () => {
  const userData = useSelector((state) => state.userReducer)

  return (
    <div className="profil-container">
      <NavBar/>
      <LeftNav/>
      <h1>Profil de {userData.pseudo}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img src={userData.picture} alt="user-pic"/>
          <UploadImg/>
        </div>
        <div className="right-part">
          <h3>Pseudo</h3>
          <input type="text" defaultValue={userData.pseudo}/>
          <br/>
          <h3>Email</h3>
          <input type="text" defaultValue={userData.email}/>
          <br/>
          <h3>Mot de passe</h3>
          <input type="password"/>
          <br/>
          <h3>Confirmer mot de passe</h3>
          <input type="password"/>
          <br/>
          <br/>
          <button>Modifier</button>
        </div>
    </div>
  </div>
  );
}

export default UpdateProfil;