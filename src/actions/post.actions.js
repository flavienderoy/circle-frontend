import axios from 'axios'

// posts
export const GET_POSTS = "GET_POSTS"

/*export const getPosts = () => {
    return (dispatch) => {
      return axios
        .get(`${process.env.REACT_APP_API_URL}api/post/`)
        .then((res) => {
          console.log("action posts", res)
          //const array = res.data.slice(0, num);
          //dispatch({ type: GET_POSTS, payload: array });       
        })
        .catch((err) => console.log(err));

        return axios({
          method: "get",
          url: `${process.env.REACT_APP_API_URL}api/post`,
        })
          .then((res) => {
            //dispatch({ type: GET_USERS, payload: res.data })
            return res.data
          })
          .catch((err) => console.log(err))
    };
  };*/

  export const getPosts = () => {
    return axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/post`,
    })
      .then((res) => {console.log("RES" , res); return res.data})
      .catch((err) => console.log(err))
  };