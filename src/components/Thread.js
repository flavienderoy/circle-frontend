import React, { useEffect, useState, isEmpty } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { getPosts } from "../actions/post.actions";
import axios from 'axios'

const Thread = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/post`,
          })
            .then((res) => {
                console.log("toto", res.data)
                setPosts(res.data)
            })
            .catch((err) => console.log(err))
    }, [])
    
    if(posts.length==0) return "No posts!"

    return (
        <div className="thread-container">
            <ul>
                {/*posts ? (
                    <li>coucou</li>
                ) : (
                    posts.each((post) => {
                        return <li>test</li>;
                    })
                )*/}
                {
                    posts.map((post) => {
                        return <li key={post._id}>{post.message}</li>;
                    })
                }
            </ul>
        </div>
    ); 
}
export default Thread;
