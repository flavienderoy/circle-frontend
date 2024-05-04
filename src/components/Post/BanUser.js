import React from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { deleteUser } from '../../actions/user.actions'

const BanUserButton = (props) => {
  const dispatch = useDispatch()

  const handleDeleteUser = () => {
    if (window.confirm('Voulez-vous supprimer cet utilisateur ?')) {
      dispatch(deleteUser(props.id))
    }
  }

  return (
    <button onClick={handleDeleteUser}> Bannir le compte </button>
  )
}

export default BanUserButton;