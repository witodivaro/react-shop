import UserActionTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  dropdownHidden: true,
  error: null,
  redirectToVerify: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_USER:
      if (state.currentUser === action.payload) return;

      return {
        ...state,
        currentUser: action.payload,
      };

    case UserActionTypes.SIGN_OUT_SUCCESS:
      if (state.currentUser === null) return state;

      return {
        ...state,
        currentUser: null,
      };

    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
      };

    case UserActionTypes.SIGN_IN_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case UserActionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        redirectToVerify: true,
        error: "",
      };

    case UserActionTypes.SET_REDIRECT_TO_FALSE:
      return {
        ...state,
        redirectToVerify: false,
      };

    case UserActionTypes.TOGGLE_DROPDOWN_HIDDEN:
      return {
        ...state,
        dropdownHidden: !state.dropdownHidden,
      };

    default:
      return state;
  }
};

export default userReducer;
