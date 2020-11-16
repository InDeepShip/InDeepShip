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

const passwordChangeSuccess = (state, action) => {
  return updateObject(state, {
    message: action.message,
    status: action.status
  });
}

const passwordChangeFail = (state, action) => {
  return updateObject(state, {
    error: action.error
  });
}

const passwordResetSuccess = (state, action) => {
  return updateObject(state, {
    message: action.message,
    status: action.status
  });
}

const passwordResetFail = (state, action) => {
  return updateObject(state, {
    error: action.error
  });
}

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
    case actionTypes.PASSWORD_CHANGE_SUCCESS:
      return passwordChangeSuccess(state, action);
    case actionTypes.PASSWORD_CHANGE_FAIL:
      return passwordChangeFail(state, action);
    case actionTypes.PASSWORD_RESET_SUCCESS:
      return passwordResetSuccess(state, action);
    case actionTypes.PASSWORD_RESET_FAIL:
      return passwordResetFail(state, action);
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