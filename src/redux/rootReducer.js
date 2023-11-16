// rootReducer.js
import { combineReducers } from 'redux';
import userReducer from '../redux/slices/userSlice';

const rootReducer = combineReducers({
  user: userReducer
  
});

export default rootReducer;
