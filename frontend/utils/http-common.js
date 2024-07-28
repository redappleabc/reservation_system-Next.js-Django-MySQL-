import axios from "axios";

export const backendAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  // baseURL: "http://160.251.232.166/api",
  headers: {
  },
  withCredentials: true,
})

export const frontendAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FRONTEND_SERVER_URL,
  // baseURL: "http://160.251.232.166/api",
  headers: {
  },
  withCredentials: true,
})

// axiosInstance.interceptors.request.use(
//   config => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers['Authorization'] = 'Bearer ' + token;
//     }

// config.headers['Content-Type'] = 'application/json';
//     return config;
//   },
//   error => {
//     Promise.reject(error)
//   }
// )
