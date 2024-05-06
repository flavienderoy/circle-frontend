import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from 'axios'
import Card from './Post/Card'

const ThreadHome = ({ isReloadPost, setIsReloadPost }) => {
  const [ posts, setPosts ] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    getAllPosts()
    setIsReloadPost(false)
  }, [isReloadPost, posts])

  const getAllPosts = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/post/home`,
      withCredentials: true,
    })
      .then((res) => {
        const posts = res.data || []
        setPosts(posts)
      })
      .catch((err) => {
        console.log(err)
      })
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