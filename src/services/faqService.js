import axiosInstance from "../config/api";

const faqService = {
  getAllFaqs: async () => {
    try {
      const response = await axiosInstance.get("/faqs");
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des FAQs:", error);
      throw error;
    }
  },

  getFaqById: async (id) => {
    try {
      const response = await axiosInstance.get(`/faqs/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération de la FAQ:", error);
      throw error;
    }
  },

  createFaq: async (faqData) => {
    try {
      const response = await axiosInstance.post("/faqs", faqData);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la création de la FAQ:", error);
      throw error;
    }
  },

  searchFaqs: async (query) => {
    try {
      const response = await axiosInstance.get(`/faqs/search?query=${query}`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la recherche des FAQs:", error);
      throw error;
    }
  },
};

export default faqService;
