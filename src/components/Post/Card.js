import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { dateParser, isEmpty } from '../Utils'
import FollowHandler from '../profil/FollowHandler'
import LikeButton from './LikeButton'
import { useDispatch } from 'react-redux'
import { updatePost } from '../../actions/post.actions'
import DeleteCard from './DeleteCard'
import CardComments from './CardComments'
import BanUserButton from './BanUser'

const Card = ({ post }) => {
    const [ isLoading, setIsLoading ] = useState(true)
    const [ isUpdated, setIsUpdated ] = useState(false)
    const [ textUpdate, setTextUpdate ] = useState(null)
    const [ showComments, setShowComments ] = useState(false)
    const dispatch = useDispatch()

    const usersData = useSelector((state) => state.usersReducer)
    const userData = useSelector((state) => state.userReducer)

    const updateItem = async () => {
        if (textUpdate) {
            dispatch(updatePost(post._id, textUpdate))
        }
        setIsUpdated(false)
    }

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
                                        return `http://172.16.70.200:2415/${user.picture.replace('./uploads', '')}`
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
                                <h3>
                                    {
                                        !isEmpty(usersData[ 0 ]) && (
                                            usersData
                                                .filter((user) => user._id === post.posterId)
                                                .map((user) => (
                                                    <React.Fragment key={user._id}>
                                                        {user.pseudo}
                                                        {post.visibility === "private" && (
                                                            <i className="fas fa-lock" style={{ marginLeft: '5px' }}></i>
                                                        )}
                                                    </React.Fragment>
                                                ))
                                        )
                                    }
                                </h3>
                                {post.posterId !== userData._id && (
                                    <FollowHandler idToFollow={post.posterId} type={"card"} />
                                )}</div>
                            <span>{dateParser(post.createdAt)}</span>
                        </div>
                        {isUpdated === false && <p>{post.message}</p>}
                        {isUpdated && (
                            <div className="update-post">
                                <textarea
                                    defaultValue={post.message}
                                    onChange={(e) => setTextUpdate(e.target.value)}
                                ></textarea>
                                <div className="button-container">
                                    <button className="btn" onClick={() => setIsUpdated(!isUpdated)}>Annuler</button>
                                    <button className="btn" onClick={() => updateItem(post._id)}>Valider</button>
                                </div>
                            </div>
                        )}
                        {post.picture && (
                            <img src={`http://172.16.70.200:2415/client/public/${post.picture.replace('./', '')}`} className="card-pic" alt="card-pic" />
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
                        {userData._id === post.posterId && (
                            <div className="button-container">
                                <div onClick={() => setIsUpdated(!isUpdated)}>
                                    <img src="./img/icons/edit.svg" alt="edit" />
                                </div>
                                <DeleteCard id={post._id} />
                            </div>
                        )}
                        {userData._id !== post.posterId && userData.role === 2 && (
                            <div className="button-container">
                                <BanUserButton id={post.posterId} />
                                <DeleteCard id={post._id} />
                            </div>
                        )}
                        <div className="card-footer">
                            <div className="comment-icon">
                                <img onClick={() => setShowComments(!showComments)} src="./img/icons/message1.svg" alt="comment" />
                                <span>{post.comments && post.comments.length ? post.comments.length : 0}</span>
                            </div>
                            <LikeButton post={post} />
                            <img src="./img/icons/share.svg" alt="share" />
                        </div>
                        {showComments && <CardComments post={post} />}
                    </div>
                </>
            )}
        </li>
    )
}

export default Card