import React, { useEffect, useState, isEmpty } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { getPosts } from "../actions/post.actions";
import axios from 'axios'
import Card from './Post/Card'

const Thread = () => {
    const [posts, setPosts] = useState([]);

    const dispatch = useDispatch();
    const [count, setCount] = useState(5);

    useEffect(() => {
        axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/post/`,
          })
            .then((res) => {
                console.log("toto", res.data)
                setPosts(res.data)
            })
            .catch((err) => console.log(err))
    }, [])
    
    if(posts.length==0) return "Aucun poste sur votre feed pour le moment !"

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
                        // return <li key={post._id}>{post.message}</li>;
                        return <Card post={post} key={post._id}/>
                    })
                }
            </ul>
        </div>
    ); 
}
export default Thread;
