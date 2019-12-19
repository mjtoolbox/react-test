import { userConstraints } from '../constraints/actionTypes.js';

// This is my state design

let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

// In case if we need to pass token.
const emptyInfo = {
  token: '',
  username: ''
};

const initialState = userInfo
  ? { isLogged: true, userInfo }
  : { isLogged: false, emptyInfo };

const loggedReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstraints.LOGIN_SUCCESS:
      console.log('reducer', action);
      return {
        isLogged: true,
        userInfo: action.payload
      };
    case userConstraints.LOGOUT:
      return {
        isLogged: false,
        userInfo: ''
      };
    default:
      return state;
  }
};
export default loggedReducer;
