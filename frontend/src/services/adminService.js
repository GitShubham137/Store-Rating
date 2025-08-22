import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admin/';

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

const getDashboardStats = () => {
  return axios.get(API_URL + 'dashboard', getHeaders());
};

const getUsers = (params) => {
  return axios.get(API_URL + 'users', { ...getHeaders(), params });
};

const getStores = (params) => {
  return axios.get(API_URL + 'stores', { ...getHeaders(), params });
};

const addUser = (userData) => {
  return axios.post(API_URL + 'users', userData, getHeaders());
};

const addStore = (storeData) => {
  return axios.post(API_URL + 'stores', storeData, getHeaders());
};

const adminService = {
  getDashboardStats,
  getUsers,
  getStores,
  addUser,
  addStore,
};

export default adminService;
