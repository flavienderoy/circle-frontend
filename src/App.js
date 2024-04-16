import './styles/index.scss'
import React, { useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from './pages/HomePage'
import ProfilPage from './pages/ProfilPage'
import PublicPage from './pages/PublicPage'
import { UidContext } from './components/AppContext'
import axios from 'axios'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/public',
    element: <PublicPage />
  },
  {
    path: '/profil',
    element: <ProfilPage />
  }
])

const App = () => {
  const [ uid, setUid ] = useState(null)

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_URL}jwtid`,
          withCredentials: true,
        })
        console.log(res)
        setUid(res.data)
      } catch (err) {
        console.log("No token", err)
      }
    }
    fetchToken()
  }, [uid]) 

  return (
    <UidContext.Provider value={uid}>
      <RouterProvider router={router} />
    </UidContext.Provider>
  )
}

export default App