let currentAccessToken = null;

export const storeAuthToken = (token) => {
  currentAccessToken = token;
  localStorage.setItem("authToken", token);
};

export const getAuthToken = () => {
  return currentAccessToken || localStorage.getItem("authToken");
};

export const clearAuthToken = () => {
  localStorage.removeItem("authToken");
};

export const handleLoginSuccess = (state, payload) => {
  const { accessToken, user } = payload.data;

  state.accessToken = accessToken;
  state.userInfo = user;
  state.isAdmin = user.role === "admin";
  state.isSeller = user.role === "seller";
  storeAuthToken(accessToken);
};

export const handleGetUserInfoSuccess = (state, payload) => {
  const { message, ...userInfo } = payload.data;
  state.userInfo = userInfo;
};
