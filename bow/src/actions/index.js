import axios from 'axios';
import * as actionTypes from './types';

export const authStart = () => {
    return {
      type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token) => {
    return {
      type: actionTypes.AUTH_SUCCESS,
      token: token
    };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authSignup = (name, address, email, password1, password2, account) => {
    return dispatch => {
        dispatch(authStart());
        axios
            .post('http://127.0.0.1:8000/api/users/signup/', {
                name: name,
                address: address,
                username: email,
                email: email,
                password1: password1,
                password2: password2,
                account: account
            })
            .then(res => {
                const token = res.data.key;
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
                localStorage.setItem("token", token);
                localStorage.setItem("expirationDate", expirationDate);
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout(3600));
            })
            .catch(err => {
              dispatch(authFail(err));
            });
    };
};

export const authLogin = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        axios
            .post('http://127.0.0.1:8000/api/users/login/', {
                username: email,
                email: email,
                password: password
            })
            .then((res) => {
                const token = res.data.key;
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
                localStorage.setItem('token', token);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout(3600));
            })
            .catch((err) => {
                dispatch(authFail(err));
            });
    };
};

export const fetchUser = () => async (dispatch) => {
  // dispatch({ type: DONE_LOADING, payload: true });
  // try {
  //   const res = await axios.get('/api/current_user');
  //   dispatch({ type: FETCH_USER, payload: res.data });
  //   dispatch({ type: DONE_LOADING, payload: true });
  // } catch {
  //   dispatch({ type: FETCH_USER, payload: false });
  //   dispatch({ type: DONE_LOADING, payload: true });
  // }

  // For testing
  // Set DONE_LOADING payload to false to show spinner
  dispatch({ type: actionTypes.FETCH_USER, payload: true });
  dispatch({ type: actionTypes.DONE_LOADING, payload: true });
};