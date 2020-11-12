import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import registrationReducer from './registrationReducer';
import loadReducer from './loadReducer';

export default combineReducers({
  auth: authReducer,
  registration: registrationReducer,
  loadState: loadReducer,
  form: formReducer,
});
