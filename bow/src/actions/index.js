import axios from 'axios';
import * as actionTypes from './types';
import * as addresses from '../constants/environment';

export const authStart = () => {
    return {
      type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, user) => {
    return {
      type: actionTypes.AUTH_SUCCESS,
      token: token,
      user: user
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
  localStorage.removeItem("email");
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
            .post(`${addresses.DVELOPMENT_SERVER_ADDRESS}/api/users/signup/`, {
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
                const user = res.data.user;
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
                localStorage.setItem("token", token);
                localStorage.setItem("expirationDate", expirationDate);
                localStorage.setItem("user", user);
                dispatch(authSuccess(token, user));
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
            .post(`${addresses.DVELOPMENT_SERVER_ADDRESS}/api/users/signup/`, {
                username: email,
                email: email,
                password: password
            })
            .then((res) => {
                const token = res.data.key;
                const user = res.data.user;
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
                localStorage.setItem('token', token);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem("user", user);
                dispatch(authSuccess(token, user));
                dispatch(checkAuthTimeout(3600));
            })
            .catch((err) => {
                dispatch(authFail(err));
            });
    };
};

export const registrationStart = () => {
    return {
      type: actionTypes.REGISTRATION_START
    };
};

export const registrationSuccess = (message) => {
    return {
      type: actionTypes.REGISTRATION_SUCCESS,
      message: message
    };
};

export const registrationFail = (error) => {
  return {
    type: actionTypes.REGISTRATION_FAIL,
    error: error
  };
};

export const privateRegistration = (registrationForm) => {
    return dispatch => {
        dispatch(registrationStart());
        axios
            .post(`${addresses.DVELOPMENT_SERVER_ADDRESS}/api/vesselregistration/private-register/`, {
                registration: registrationForm
            })
            .then((res) => {
                const message = res.data.message;
                localStorage.setItem('message', message);
                dispatch(registrationSuccess(message));
            })
            .catch((err) => {
                dispatch(registrationFail(err));
            });
    };
};

export const fetchUser = () => async (dispatch) => {
  dispatch({ type: actionTypes.FETCH_USER, payload: true });
  dispatch({ type: actionTypes.DONE_LOADING, payload: true });
}