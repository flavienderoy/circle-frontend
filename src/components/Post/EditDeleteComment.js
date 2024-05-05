import React, { useContext, useEffect, useState } from 'react'
import { UidContext } from '../AppContext'
import { deleteComment, editComment } from '../../actions/post.actions'
import { useDispatch } from 'react-redux'

const EditDeleteComment = ({ comment, postId }) => {
  const [ isAuthor, setIsAuthor ] = useState(false)
  const [ edit, setEdit ] = useState(false)
  const [ text, setText ] = useState('')
  const uid = useContext(UidContext)
  const dispatch = useDispatch()

  const handleEdit = (e) => {
    e.preventDefault()

    if (text) {
      dispatch(editComment(postId, comment._id, text))
      setText('')
      setEdit(false)
    }
  }

  const handleDelete = () => {
    dispatch(deleteComment(postId, comment._id))
  }

  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.commenterId) setIsAuthor(true)
      else setIsAuthor(false)
    }
    checkAuthor()
  }, [ uid, comment.commenterId ])

  return (
    <div className='edit-comment'>
      {isAuthor && edit === false && (
        <span onClick={() => setEdit(!edit)}>
          <img src='./img/icons/edit.svg' alt='edit' />
        </span>
      )}
      {isAuthor && edit && (
        <form action="" onSubmit={handleEdit} className='edit-comment-form'>
          <label htmlFor='text' onClick={() => setEdit(!edit)}>
            Ne plus modifier
          </label>
          <br />
          <input
            type='text'
            name='text'
            defaultValue={comment.text}
            onChange={(e) => setText(e.target.value)}
          />
          <br />
          <div className='btn'>
            <span onClick={() => {
              if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
                handleDelete()
              }
            }}><img src='./img/icons/trash.svg' alt='delete' />
            </span>

          </div>
          <input type='submit' value='Valider modification' />
        </form>
      )}
    </div>
  )
}

export default EditDeleteComment