import axiosInstance from "../config/api";

const demandeService = {
  getAllDemandes: async () => {
    try {
      const response = await axiosInstance.get("/demandes");
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des demandes:", error);
      throw error;
    }
  },

  getDemandeById: async (id) => {
    try {
      const response = await axiosInstance.get(`/demandes/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération de la demande:", error);
      throw error;
    }
  },

  createDemande: async (formData) => {
    try {
      const response = await axiosInstance.post("/demandes", formData);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la création de la demande:", error);
      throw error;
    }
  },

  repondreDemande: async (id, reponse) => {
    try {
      const response = await axiosInstance.post(
        `/demandes/${id}/repondre`,
        reponse
      );
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la réponse à la demande:", error);
      throw error;
    }
  },

  cloturerDemande: async (id) => {
    try {
      const response = await axiosInstance.post(`/demandes/${id}/cloturer`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la clôture de la demande:", error);
      throw error;
    }
  },

  getStatsSatisfaction: async () => {
    try {
      const response = await axiosInstance.get("/demandes/stats/satisfaction");
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des statistiques:", error);
      throw error;
    }
  },
};

export default demandeService;
