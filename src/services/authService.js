import axiosInstance from "../config/api";

const authService = {
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post("/api/auth/login", credentials);
      return response.data;
    } catch (error) {
      console.error("Erreur de connexion:", error);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await axiosInstance.post("/api/auth/register", userData);
      return response.data;
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      throw error;
    }
  },

  logout: async () => {
    try {
      const response = await axiosInstance.post("/api/auth/logout");
      return response.data;
    } catch (error) {
      console.error("Erreur de déconnexion:", error);
      throw error;
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await axiosInstance.get("/api/auth/me");
      return response.data;
    } catch (error) {
      console.error("Erreur de récupération du profil:", error);
      throw error;
    }
  },
};

export default authService;
