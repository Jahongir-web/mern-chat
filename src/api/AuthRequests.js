import axios from "axios";

const API = axios.create({baseURL: "https://mern-chat-server-cfsj.onrender.com/"})

export const login = (FormData) => {
  const res = API.post('auth/login', FormData)
  return res
}

export const signUp = (FormData) => {
  const res = API.post('auth/register', FormData)
  return res
}