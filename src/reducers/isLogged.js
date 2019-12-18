import { userConstraints } from '../constraints/actionTypes.js';

const loggedReducer = (state = false, action) => {
  switch (action.type) {
    case userConstraints.LOGIN_SUCCESS:
      return !state;
    case userConstraints.LOGOUT:
      return false;
    default:
      return state;
  }
};
export default loggedReducer;
