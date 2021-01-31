import { UserActionTypes } from './user.types';

export const setCurrentUser = (user) => {
  return {
    type: UserActionTypes.SET_USER,
    payload: user,
  };
};

export const toggleUserDropdownHidden = () => {
  return {
    type: UserActionTypes.TOGGLE_DROPDOWN_HIDDEN,
    payload: '',
  };
};
