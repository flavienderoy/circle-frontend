import axios from "axios"

export const GET_USERS = "GET_USERS"

export const getUsers = (uid) => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/getAll`,
    })
      .then((res) => {
        dispatch({ type: GET_USERS, payload: res.data })
      })
      .catch((err) => console.log(err))
  }
}