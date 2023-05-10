import axios from 'axios';
// axios.defaults.withCredentials = true;
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('jwt');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // 공백 추가
  }
  return config;
});

export default axiosInstance;
