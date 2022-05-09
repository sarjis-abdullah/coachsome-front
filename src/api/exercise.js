export default (axios) => ({


  getSports: (params = {}) => axios.get("sportCategories", { params }),
  
  getCategories: (params = {}) => axios.get("exercise-categories", { params }),

  saveImageUrl: payload => {
    return axios.post("exercise-assets", payload);
  },
  saveVideoUrl: payload => {
    return axios.post("exercise-assets", payload);
  },
  gallery: () => {
    return axios.get("exercises");
  },
  removeItem: id => {
    return axios.delete(`exercise-assets/${id}`);
  }
});
