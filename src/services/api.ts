import axios from 'axios';

const IP_ADDRESS = '192.168.1.2';
const BASE_URL = `http://${IP_ADDRESS}:8080`;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
