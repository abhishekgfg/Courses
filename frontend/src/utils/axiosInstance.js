import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/admin", // ← YOUR BACKEND URL
});

// FormData handling
axiosInstance.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  }
  return config;
});

export default axiosInstance;
