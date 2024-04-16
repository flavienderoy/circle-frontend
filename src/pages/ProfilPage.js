import React from 'react'
import Log from '../components/log';

const ProfilPage = () => {
  return (
    <div className="profil-page">
      <div className='log-container'>
        <Log signin={false} signup={true}/>
        <img src="./img/log.svg"/>
      </div>
    </div>
  )
}

export default ProfilPage;