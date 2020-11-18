const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const config = {
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};

export default {
  logout,
  getCurrentUser,
  config,
};
