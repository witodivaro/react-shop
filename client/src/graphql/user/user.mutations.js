import { currentUserVar, userDropdownHiddenVar } from '../cache';

export const setCurrentUser = (user) => {
  currentUserVar(user);
};

export const toggleUserDropdownHidden = () =>
  userDropdownHiddenVar(!userDropdownHiddenVar());
