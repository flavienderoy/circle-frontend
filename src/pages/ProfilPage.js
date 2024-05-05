import React from 'react'
import { useContext } from 'react'
import Log from '../components/log'
import { UidContext } from '../components/AppContext'
import UpdateProfil from '../components/profil/UpdateProfil'
import NavBar from '../components/Navbar'
import LeftNav from '../components/LeftNav'

const ProfilPage = () => {
  const uid = useContext(UidContext)

  return (
    <><NavBar />
      <div className="profil-page">
        <LeftNav />
        {uid ? (
          <UpdateProfil />
        ) : (
          <div className='log-container'>
            <Log signin={false} signup={true} />
            <div className='img-container'>
              <img src="./img/log.svg" />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ProfilPage