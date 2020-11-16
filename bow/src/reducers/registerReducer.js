import * as actionTypes from '../actions/types';
import { updateObject } from "../utility";

const initialState = {
  error: null,
  loading: false,
  message: null
};

const registrationStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const registrationSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    message: action.message
  });
};

const registrationFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.REGISTRATION_START:
            return registrationStart(state, action);
        case actionTypes.REGISTRATION_SUCCESS:
            return registrationSuccess(state, action);
        case actionTypes.REGISTRATION_FAIL:
            return registrationFail(state, action);
        default:
            return state;
    }
};

export default reducer;