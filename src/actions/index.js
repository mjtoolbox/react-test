import { userConstraints } from '../constraints/actionTypes.js';

export const userActions = {
  logOut,
  loginSuccess,
  loginFailure
};

// Not to confuse this action with Reducer.
// Action is to send out an signal to the store.
// Type is mandatory, but payload is optional.
// Try not to make too complicated. isLogged determined in Reducer.

function logOut() {
  return {
    type: userConstraints.LOGOUT,
    //isLogged: false,
    payload: ''
  };
}

function loginSuccess(userEmail) {
  return {
    type: userConstraints.LOGIN_SUCCESS,
    //isLogged: true,
    payload: userEmail
  };
}

function loginFailure(userEmail) {
  return {
    type: userConstraints.LOGIN_FAILURE,
    //isLogged: true,
    payload: userEmail
  };
}
