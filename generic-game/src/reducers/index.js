import { combineReducers } from 'redux';
import authReducer from './authReducer';
import uiReducer from './uiReducer';
import profileReducer from './profileReducer';
import gameReducer from './gameReducer';
import usersReducer from './usersReducer';
const reducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  profile: profileReducer,
  game: gameReducer,
  users: usersReducer,
});

export default reducer;
