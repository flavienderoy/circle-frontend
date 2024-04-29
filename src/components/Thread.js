import React, { useEffect, useState, isEmpty } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { getPosts } from "../actions/post.actions";

const Thread = () => {
    const [loadPost, setLoadPost] = useState(true);
    //const dispatch = useDispatch();
    //const posts = useSelector((state) => state.postReducer);

    const posts = getPosts()

    /*useEffect(() => {
        if (loadPost) {
            dispatch(getPosts());
            setLoadPost(false);
        }
    }, [loadPost, dispatch]);*/
    useEffect(() => {
         this.posts = getPosts()
    }, [])
    
    return (
        <div className="thread-container">
            <ul>
                {
                    posts.map((post) => {
                        return <li>test</li>;
                    })
                }
            </ul>
        </div>
    ); 
}
export default Thread;
