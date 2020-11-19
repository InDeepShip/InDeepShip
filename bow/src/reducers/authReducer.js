import { FETCH_USER } from '../actions/types';
import * as actionTypes from '../actions/types';
import { updateObject } from "../utility";

const initialState = {
  token: null,
  error: null,
  loading: false,
  user: null
};

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    error: null,
    loading: false,
    user: action.user
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    email: null
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;

/*
export default function (state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return (action.payload) ? action.payload : false;
    default:
      return state;
  }
}
*/