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

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION,
});

export const signInFailure = (error) => {
  return {
    type: UserActionTypes.SIGN_IN_FAILURE,
    payload: error,
  };
};

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = (errorMessage) => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: errorMessage,
});

export const signUpStart = (userSignInData) => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: userSignInData,
});

export const signUpSuccess = () => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
});

export const signUpFailure = (errorMessage) => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: errorMessage,
});

export const setRedirectToFalse = () => ({
  type: UserActionTypes.SET_REDIRECT_TO_FALSE,
});
