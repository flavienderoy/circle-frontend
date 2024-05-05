import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from 'axios'
import Card from './Post/Card'

const ThreadHome = ({ isReloadPost, setIsReloadPost }) => {
  const [ posts, setPosts ] = useState([])
  const user = useSelector(state => state.userReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    getAllPosts()
    setIsReloadPost(false)
  }, [ isReloadPost ])

  const getAllPosts = () => {
    axios.get(`${process.env.REACT_APP_API_URL}api/post/`)
      .then((res) => {
        const posts = res.data || [] // Assurez-vous que res.data est défini et convertissez-le en tableau au besoin
        const filteredPosts = posts.filter(post => {
          if (post.visibility === "public" && user.following.includes(post.posterId) || post.posterId === user._id || (user.following && user.following.includes(post.posterId))) {
            return true
          }
          return false
        })
        setPosts(filteredPosts)
      })
      .catch((err) => console.log(err))
  }

  if (posts.length === 0) {
    return (
      <div className="no-posts-message">
        Aucun poste sur votre fil d'actualité pour le moment !
      </div>
    )
  }

  return (
    <div className="thread-container">
      <ul>
        {posts
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((post) => (
            <Card post={post} key={post._id} />
          ))}
      </ul>
    </div>
  )
}

export default ThreadHome
