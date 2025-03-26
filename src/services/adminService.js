import axiosInstance from "../config/api";

const adminService = {
  getAllUsers: async () => {
    try {
      const response = await axiosInstance.get("/admin/users");
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
      throw error;
    }
  },

  toggleUserValidation: async (userId) => {
    try {
      const response = await axiosInstance.post(
        `/admin/toggle-validation/${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la modification de la validation:", error);
      throw error;
    }
  },

  deleteUser: async (userId) => {
    try {
      const response = await axiosInstance.delete(`/admin/delete/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
      throw error;
    }
  },

  createUser: async (userData) => {
    try {
      const response = await axiosInstance.post("/admin/create-user", userData);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur:", error);
      throw error;
    }
  },
};

export default adminService;
