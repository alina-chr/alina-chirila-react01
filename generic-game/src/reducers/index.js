import { combineReducers } from 'redux';
import authReducer from './authReducer';
import uiReducer from './uiReducer';

const reducers = combineReducers({
  ui: uiReducer,
  auth: authReducer,
});

export default reducers;
