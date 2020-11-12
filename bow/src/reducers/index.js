import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import loadReducer from './loadReducer';

export default combineReducers({
  auth: authReducer,
  loadState: loadReducer,
  form: formReducer,
});
