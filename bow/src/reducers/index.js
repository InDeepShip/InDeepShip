import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import loadReducer from './loadReducer';
import registerReducer from './registerReducer';

export default combineReducers({
  auth: authReducer,
  loadState: loadReducer,
  registration: registerReducer,
  form: formReducer,
});
