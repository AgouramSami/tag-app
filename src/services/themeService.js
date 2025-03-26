import axiosInstance from "../config/api";

const themeService = {
  getAllThemes: async () => {
    try {
      const response = await axiosInstance.get("/themes");
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des thèmes:", error);
      throw error;
    }
  },
};

export default themeService;
