import { userConstraints } from '../constraints/actionTypes.js';

// This is my state design

let userProfile = JSON.parse(sessionStorage.getItem('userProfile'));

// In case if we need to pass token.
const emptyProfile = {
  token: '',
  email: '',
  name: '',
};

const initialState = userProfile
  ? { isLogged: true, userProfile }
  : { isLogged: false, emptyProfile };

const loggedReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstraints.LOGIN_SUCCESS:
      return {
        isLogged: true, // driven value
        userProfile: action.payload,
        role: action.payload.roles[0].authority // For now, just 1 role
      };
    case userConstraints.LOGOUT:
      return {
        isLogged: false,
        userProfile: '',
        role: ''
      };
    default:
      return state;
  }
};
export default loggedReducer;
