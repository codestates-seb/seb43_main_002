import axios from 'axios';
// axios.defaults.withCredentials = true;
const axiosInstance = axios.create({
  baseURL: 'http://14.72.7.98:8080/',
  headers: {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
    // ln7 삭제. bearer null이 여기서 발생
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('jwt');
  if (token) {
    // config.headers['Authorization'] = `Bearer ${token}`
    config.headers['Authorization'] = token;
  }
  return config;
});

export default axiosInstance;
