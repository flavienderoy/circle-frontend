import axios from "axios"

export const GET_USER = "GET_USER"
export const UPLOAD_PICTURE = "UPLOAD_PICTURE"
export const UPDATE_BIO = "UPDATE_BIO"
export const FOLLOW_USER = "FOLLOW_USER"
export const UNFOLLOW_USER = "UNFOLLOW_USER"
export const DELETE_USER = "DELETE_USER"

export const GET_USER_ERRORS = "GET_USER_ERRORS"

export const getUser = (uid) => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/${uid}`,
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data })
      })
      .catch((err) => console.log(err))
  }
}

export const uploadPicture = (data, id) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data)
      .then((res) => {
        return axios({
          // .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
          // .then((res) => {
          //   dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture })
          // })

            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/user/${id}`,
            withCredentials: true,
          })
            .then((res) => {
              dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture })
            })
            .catch((err) => console.log(err)
          )
      }
      )
      .catch((err) => console.log(err))
  }
}

export const updateBio = (userId, bio) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
      data: { bio },
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: UPDATE_BIO, payload: bio })
      })
      .catch((err) => console.log(err))
  }

}

export const followUser = (followerId, idToFollow) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/user/follow/` + followerId,
      data: { idToFollow },
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: FOLLOW_USER, payload: { idToFollow } })
      })
      .catch((err) => console.log(err))
  }
}

export const unfollowUser = (followerId, idToUnfollow) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/user/unfollow/` + followerId,
      data: { idToUnfollow },
      withCredentials: true,
    })
      .then((res) => {
        dispatch({ type: UNFOLLOW_USER, payload: { idToUnfollow } })
      })
      .catch((err) => console.log(err))
  }
}

export const deleteUser = (userId) => {
  return async (dispatch) => {
    try {
      // Supprimer tous les posts de l'utilisateur
      await axios.delete(`${process.env.REACT_APP_API_URL}api/post/user/${userId}`)

      // Une fois que tous les posts ont été supprimés, supprimer l'utilisateur
      await axios.delete(`${process.env.REACT_APP_API_URL}api/user/${userId}`)

      // Mettre à jour l'état Redux après la suppression réussie
      dispatch({ type: DELETE_USER, payload: { userId } })
    } catch (error) {
      console.log(error)
    }
  }
}