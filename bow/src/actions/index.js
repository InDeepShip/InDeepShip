import axios from 'axios';
import * as actionTypes from './types';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.withCredentials = true;

export const registrationStart = () => {
  return {
    type: actionTypes.REGISTRATION_START
  };
};

export const registrationSuccess = () => {
  return {
    type: actionTypes.REGISTRATION_SUCCESS,
  };
};

export const registrationFail = () => {
  return {
    type: actionTypes.REGISTRATION_FAIL
  };
};

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

export const passwordChangeSuccess = (message, status) => {
  return {
    type: actionTypes.PASSWORD_CHANGE_SUCCESS,
    message: message,
    status: status
  };
};

export const passwordChangeFail = (error) => {
  return {
    type: actionTypes.PASSWORD_CHANGE_FAIL,
    error: error
  };
};

export const passwordResetSuccess = (message, status) => {
  return {
    type: actionTypes.PASSWORD_RESET_SUCCESS,
    message: message,
    status: status
  };
};

export const passwordResetFail = (error) => {
  return {
    type: actionTypes.PASSWORD_RESET_FAIL,
    error: error
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
      .post(`${process.env.REACT_APP_SERVER_ADDRESS}/api/users/signup/`, {
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

export const passwordChange = (oldPassword, newPassword1, newPassword2) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post(`${process.env.REACT_APP_SERVER_ADDRESS}/api/users/password/change/`, {
        old_password: oldPassword,
        new_password1: newPassword1,
        new_password2: newPassword2
      })
      .then(res => {
        const message = res.data.detail
        const status = res.status
        dispatch(passwordChangeSuccess(message, status));
      })
      .catch(err => {
        dispatch(passwordChangeFail(err));
      });
  };
};

export const passwordReset = (email) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post(`${process.env.REACT_APP_SERVER_ADDRESS}/api/users/password/reset/`, {
        email: email
      })
      .then(res => {
        const message = res.data.detail
        const status = res.status
        dispatch(passwordResetSuccess(message, status));
      })
      .catch(err => {
        dispatch(passwordResetFail(err));
      });
  };
};

export const privateRegistration = (registrationForm) => {
  return dispatch => {
    dispatch(registrationStart());
    axios
      .post(`${process.env.REACT_APP_SERVER_ADDRESS}/api/vesselregistration/private-registration/`, {
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

export const authLogin = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post(`${process.env.REACT_APP_SERVER_ADDRESS}/api/users/login/`, {
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