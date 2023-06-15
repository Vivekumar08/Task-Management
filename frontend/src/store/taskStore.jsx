import { combineReducers } from "redux";
const USER_LOGIN = "USER_LOGIN";
const USER_LOGOUT = "USER_LOGOUT";

export function userLogin(userDetails) {
  return {
    type: USER_LOGIN,
    userDetails,
  };
}

export function userLogout() {
  return {
    type: USER_LOGOUT,
  };
}
const initialState = {
  loggedIn: false,
  userDetails: null,
};
function users(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN: {
      return { loggedIn: true, userDetails: action.userDetails };
    }
    case USER_LOGOUT: {
      return {
        ...state,
        loggedIn: false,
        userDetails: null,
      };
    }
    default:
      return state;
  }
}

const UserTaskApp = combineReducers({ users });
export default UserTaskApp;
