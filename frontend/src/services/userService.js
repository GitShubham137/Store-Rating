import axios from 'axios';

// --- Define both API URLs ---
const USER_API_URL = 'http://localhost:5000/api/user/';
const AUTH_API_URL = 'http://localhost:5000/api/auth/'; // For auth actions

const getAuthToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? user.token : null;
};

const getHeaders = () => {
  const token = getAuthToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const getStores = (params) => {
  return axios.get(USER_API_URL + 'stores', { ...getHeaders(), params });
};

const submitRating = (storeId, rating) => {
  return axios.post(USER_API_URL + 'ratings', { storeId, rating }, getHeaders());
};

const modifyRating = (ratingId, rating) => {
  return axios.put(USER_API_URL + `ratings/${ratingId}`, { rating }, getHeaders());
};

// --- ADD THIS NEW FUNCTION ---
const updatePassword = (password) => {
  // This correctly points to your backend auth route
  return axios.put(AUTH_API_URL + 'update-password', { password }, getHeaders());
};

const userService = {
  getStores,
  submitRating,
  modifyRating,
  updatePassword, // <-- Export the new function
};

export default userService;