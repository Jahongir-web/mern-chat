import axios from "axios";

const API = axios.create({baseURL: "https://mern-chat-server-cfsj.onrender.com/"})

API.interceptors.request.use((req)=> {
  if(localStorage.getItem('token')) {
    req.headers.token = localStorage.getItem('token')
  }

  return req;
})

export const getUser = (userId) => API.get(`user/${userId}`)

export const getUsers = () => API.get('user/')


export const updateUser = (id, formData) => API.put(`user/${id}`, formData)


export const deleteUser = (id) => API.delete(`user/${id}`)


export const followUser = (id, data) => API.put(`user/${id}/follow`, data)


export const unfollowUser = (id, data) => API.put(`user/${id}/unfollow`, data)
