import axios from "axios";

const API = axios.create({baseURL: "http://localhost:4001/"})

export const login = (FormData) => {
  const res = API.post('auth/login', FormData)
  return res
}

export const signUp = (FormData) => {
  const res = API.post('auth/register', FormData)
  return res
}