import axios from "axios";

// En production, on utilise le proxy Vercel
const API_URL = "/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
export { API_URL };
