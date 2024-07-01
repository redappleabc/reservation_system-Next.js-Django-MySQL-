import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
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

//     // config.headers['Content-Type'] = 'application/json';
//     return config;
//   },
//   error => {
//     Promise.reject(error)
//   }
// )

export default axiosInstance;