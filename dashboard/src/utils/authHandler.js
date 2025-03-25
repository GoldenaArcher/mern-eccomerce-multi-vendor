export const storeAuthToken = (token) => {
  localStorage.setItem("authToken", token);
};

export const clearAuthToken = () => {
  localStorage.removeItem("authToken");
};

export const handleLoginSuccess = (state, payload) => {
  const { accessToken, user } = payload;

  state.accessToken = accessToken;
  state.userInfo = user;
  state.isAdmin = user.role === "admin";
  state.isSeller = user.role === "seller";
  storeAuthToken(accessToken);
};
