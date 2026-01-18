import axios from "axios";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

console.log("env", import.meta.env);
console.log("BASE API", import.meta.env.VITE_API_BASE_URL);

// request interceptor
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// response interceptor
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error),
);
