import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3003', // Certifique-se que seu backend está nesta porta
});

export default api;    