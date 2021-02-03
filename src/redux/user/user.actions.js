import UserActionTypes from "./user.types";

export const setCurrentUser = (user) => {
  return {
    type: UserActionTypes.SET_USER,
    payload: user,
  };
};

export const toggleUserDropdownHidden = () => {
  return {
    type: UserActionTypes.TOGGLE_DROPDOWN_HIDDEN,
  };
};

export const googleSignInStart = () => {
  return {
    type: UserActionTypes.GOOGLE_SIGN_IN_START,
  };
};

export const emailSignInStart = (emailAndPassword) => {
  return {
    type: UserActionTypes.EMAIL_SIGN_IN_START,
    payload: emailAndPassword,
  };
};

export const signInSuccess = (user) => {
  return {
    type: UserActionTypes.SIGN_IN_SUCCESS,
    payload: user,
  };
};

export const signInFailure = (error) => {
  return {
    type: UserActionTypes.SIGN_IN_FAILURE,
    payload: error,
  };
};
