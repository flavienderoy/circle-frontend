import axios from 'axios'
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import Card from './Post/Card'

const ThreadPublic = ({ isReloadPost, setIsReloadPost }) => {
  const [ publicPosts, setPublicPosts ] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    getAllPublicPosts()
    setIsReloadPost(false)
  }, [ isReloadPost, publicPosts ])

  const getAllPublicPosts = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/post/public`,
      withCredentials: true,
    })
      .then((res) => {
        const publicPosts = res.data || []
        setPublicPosts(publicPosts)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  if (publicPosts.length === 0) return "Aucun poste publique disponible pour le moment !"

  return (
    <div className="thread-container">
      <ul>
        {publicPosts
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((post) => (
            <Card post={post} key={post._id} />
          ))}
      </ul>
    </div>
  )
}

export default ThreadPublic
