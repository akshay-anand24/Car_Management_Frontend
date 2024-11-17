import axios from 'axios';

const API = axios.create({
  baseURL: 'https://car-management-backend-jzdp.onrender.com',
});

// Attach token to each request if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
