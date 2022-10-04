import axios from "axios";

const API = axios.create({baseURL: "http://localhost:4001/"})

API.interceptors.request.use((req)=> {
  if(localStorage.getItem('token')) {
    req.headers.token = localStorage.getItem('token')
  }

  return req;
})

export const getTimelinePosts = (id) => API.get(`post/${id}/timeline`)

export const likePost = (id) => API.put(`post/${id}/like`)