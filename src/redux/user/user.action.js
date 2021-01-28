export const setCurrentUser = (user) => {
  return {
    type: "user/set",
    payload: user,
  };
};
