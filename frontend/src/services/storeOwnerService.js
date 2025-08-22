import axios from 'axios';

const API_URL = 'http://localhost:5000/api/store-owner/';

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

const getDashboard = () => {
  return axios.get(API_URL + 'dashboard', getHeaders());
};

const storeOwnerService = {
  getDashboard,
};

export default storeOwnerService;
