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
  const { accessToken, user } = payload;

  state.accessToken = accessToken;
  state.userInfo = user;
  state.isAdmin = user.role === "admin";
  state.isSeller = user.role === "seller";
  storeAuthToken(accessToken);
};

export const handleGetUserInfoSuccess = (state, payload) => {
  console.log(payload);

  if (!payload) {
    return;
  }
  
  const { message, ...userInfo } = payload;
  state.userInfo = userInfo;
};
