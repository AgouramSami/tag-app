import axios from "axios";

const isDevelopment = process.env.NODE_ENV === "development";
const API_URL = isDevelopment
  ? "http://localhost:5000"
  : "https://tag-app-cf316661-58cf-4c47-9626-500918417b5e.railway.app";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour gérer les erreurs
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
export { API_URL };
