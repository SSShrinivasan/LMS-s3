import axios from "axios";

// 🔧 Create instance
const API = axios.create({
  baseURL: "http://localhost:5000", // ⚠️ change if your backend runs elsewhere
  withCredentials: true, // useful if you later use cookies
});

// 🔐 Request Interceptor (attach token automatically)
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🚨 Response Interceptor (handle errors globally)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // If unauthorized → force logout
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");

      // redirect to login
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;