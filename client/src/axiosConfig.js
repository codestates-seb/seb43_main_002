import axios from 'axios';
// axios.defaults.withCredentials = true;
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('jwt');
  if (token) {
    config.headers['Authorization'] = `Bearer token`;
    // 만약 토큰이 있다면 토큰을 또 담아서 보내주는 건 아닌거지?
    // 헷갈리네
  }
  return config;
});

export default axiosInstance;
