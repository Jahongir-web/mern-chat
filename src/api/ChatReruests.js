import axios from 'axios'


const API = axios.create({ baseURL: 'https://mern-chat-server-cfsj.onrender.com/' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.token = localStorage.getItem('token');
  }

  return req;
});

export const createChat = (data) => API.post('/chat/', data);

export const userChats = (id) => API.get(`/chat/`);

export const findChat = (firstId, secondId) => API.get(`/chat/find/${firstId}/${secondId}`);