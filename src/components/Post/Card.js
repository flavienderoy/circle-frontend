import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { dateParser, isEmpty } from '../Utils'
import FollowHandler from '../profil/FollowHandler'
import LikeButton from './LikeButton'

const Card = ({ post }) => {
    const [ isLoading, setIsLoading ] = useState(true)
    const usersData = useSelector((state) => state.usersReducer)
    const userData = useSelector((state) => state.userReducer)

    useEffect(() => {
        !isEmpty(usersData[ 0 ]) && setIsLoading(false)
    }, [ usersData ])

    return (
        <li className="card-container" key={post._id}>
            {isLoading ? (
                <i className='fas fa-spinner fa-spin'></i>
            ) : (
                <>
                    <div className="card-left">
                        <img
                            src={
                                !isEmpty(usersData[ 0 ]) &&
                                usersData.map((user) => {
                                    if (user._id === post.posterId) {
                                        return `http://localhost:2415/${user.picture.replace('./uploads', '')}`
                                    } else {
                                        return null
                                    }
                                }).join('')
                            }
                            alt="poster-pic"
                        />
                    </div>
                    <div className="card-right">
                        <div className="card-header">
                            <div className="pseudo">
                                <h3>{
                                    !isEmpty(usersData[ 0 ]) &&
                                    usersData.map((user) => {
                                        if (user._id === post.posterId) {
                                            return user.pseudo
                                        } else {
                                            return null
                                        }
                                    }).join('')
                                }</h3>
                                {post.posterId !== userData._id && (
                                    <FollowHandler idToFollow={post.posterId} type={"card"} />
                                )}</div>
                            <span>{dateParser(post.createdAt)}</span>
                        </div>
                        <p>{post.message}</p>
                        {post.picture && (
                            <img src={`http://localhost:2415/client/public/${post.picture.replace('./', '')}`} className="card-pic" alt="card-pic" />
                        )}
                        {post.video && (
                            <iframe
                                src={post.video}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={post._id}
                            ></iframe>
                        )}
                        <div className="card-footer">
                            <div className="comment-icon">
                                <img src="./img/icons/message1.svg" alt="comment" />
                                <span>{post.comments && post.comments.length ? post.comments.length : 0}</span>
                            </div>
                            <LikeButton post={post} />
                            <img src="./img/icons/share.svg" alt="share" />
                        </div>
                    </div>
                </>
            )}
        </li>
    )
}

export default Card