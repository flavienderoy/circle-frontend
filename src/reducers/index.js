import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import usersReducer from './users.reducer';
import postReducer from './post.reducer';
import trendingReducer from './trending.reducer';

export default combineReducers({
  userReducer,
  usersReducer,
  postReducer,
  trendingReducer,
});