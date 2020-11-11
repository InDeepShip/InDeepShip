import * as actionTypes from "../actions/types";
import { updateObject } from "../utility";

const initialState = {
    message: null,
    error: null,
    loading: false
};

const registrationStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

const registrationSuccess = (state, action) => {
  return updateObject(state, {
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
    switch (action.type) {
        case actionTypes.REGISTRATION_START:
            return registrationStart(state, action);
        case actionTypes.REGISTRATION_SUCCESS:
            return registrationSuccess(state, action);
        case actionTypes.REGISTRATION_FAIL:
            return registrationFail(state, action);
        default:
            return state;
    }
}

export default reducer;

