import axios from 'axios';
import * as actionTypes from './types';

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

export const authSuccessBroker = (status) => {
  return {
    type: actionTypes.AUTH_SUCCESS_BROKER,
    status: status
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
  localStorage.removeItem("user");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("email");
  localStorage.removeItem("vesselName")
  localStorage.removeItem("selectedPort")
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
        if (account === 'broker') {
            const status = res.data.status;
            localStorage.setItem("status", status);
            dispatch(authSuccessBroker(status));
        } else {
          const token = res.data.key;
          const user = res.data.user;
          const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
          localStorage.setItem("token", token);
          localStorage.setItem("expirationDate", expirationDate);
          localStorage.setItem("user", JSON.stringify(user));
          dispatch(authSuccess(token, user));
          dispatch(checkAuthTimeout(3600));
        }
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const privateRegistration = (registrationForm) => {
  registrationForm.name = registrationForm.vessel;
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
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(authSuccess(token, user));
        dispatch(checkAuthTimeout(3600));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token === undefined) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));

      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token, user));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        )
      }
    }
  }
};

export const fetchUser = () => async (dispatch) => {
  dispatch({ type: actionTypes.FETCH_USER, payload: true });
  dispatch({ type: actionTypes.DONE_LOADING, payload: true });
};
