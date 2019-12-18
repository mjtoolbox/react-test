import { userConstraints } from '../constants/actionTypes.js';

// action creators
// export const loginRequest = userInfo => {
//   return {
//     type: userConstraints.LOGIN_REQUEST,
//     payload: userInfo
//   };
// };

// Not to confuse this action with Reducer.
// Action is to send out an signal to the store.
// Type is mandatory, but payload is optional

export const logOut = userEmail => {
  return {
    type: userConstraints.LOGOUT,
    isLogged: false,
    payload: userEmail
  };
};

export const loginSuccess = userEmail => {
  return {
    type: userConstraints.LOGIN_SUCCESS,
    isLogged: true,
    payload: userEmail
  };
};

// export const loginFailure = error => {
//   return {
//     type: userConstraints.LOGIN_FAILURE,
//     payload: error
//   };
// };
