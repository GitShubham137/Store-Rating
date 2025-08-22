 import axios from 'axios';



const API_URL = 'http://localhost:5000/api/user/';



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

  return axios.get(API_URL + 'stores', { ...getHeaders(), params });

};



const submitRating = (storeId, rating) => {

  return axios.post(API_URL + 'ratings', { storeId, rating }, getHeaders());

};



const modifyRating = (ratingId, rating) => {

  return axios.put(API_URL + `ratings/${ratingId}`, { rating }, getHeaders());

};



const userService = {

  getStores,

  submitRating,

  modifyRating,

};



export default userService;