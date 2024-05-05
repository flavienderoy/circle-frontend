import axios from 'axios'
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import Card from './Post/Card'

const ThreadPublic = ({ isReloadPost, setIsReloadPost }) => {
    const [ publicPosts, setPublicPosts ] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        getAllPublicPosts()
    }, [])

    useEffect(() => {
        getAllPublicPosts()
        setIsReloadPost(false)
    }, [ isReloadPost ])

    const getAllPublicPosts = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}api/post/`)
            .then((res) => {
                const publicPosts = res.data.filter((post) => post.visibility === "public")
                setPublicPosts(publicPosts)
            })
            .catch((err) => console.log(err))
    }

    if (publicPosts.length === 0) return "Aucun post public disponible pour le moment !"

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
