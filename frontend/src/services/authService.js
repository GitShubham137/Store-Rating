import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

const login = (email, password, role) => {
  return axios
    .post(API_URL + 'login', {
      email,
      password,
      role,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    });
};

const register = (name, email, password, address, role) => {
  return axios.post(API_URL + 'register', {
    name,
    email,
    password,
    address,
    role,
  });
};

const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
