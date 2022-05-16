export default (axios) => ({


  getSports: (params = {}) => axios.get("sportCategories", { params }),
  
  getCategories: (params = {}) => axios.get("exercise-categories", { params }),

  getLavels: (params = {}) => axios.get("exercise-lavels", { params }),

  saveImageUrl: payload => {
    return axios.post("exercise-assets", payload);
  },
  saveVideoUrl: payload => {
    return axios.post("exercise-assets", payload);
  },


  getExerciseList: () => axios.get("exercises"),

  filterExerciseList: payload => {
    return axios.post("filter-exercises", payload);
  },

  previewExercise: id => {
    return axios.get(`exercises/${id}`);
  },

  duplicateExercise: id => {
    return axios.get(`exercises/duplicate/${id}`);
  },

  editExercise: id => {
    return axios.get(`exercises/${id}/edit`);
  },

  destroyExercise: id => axios.delete(`exercises/${id}`),

  updateExercise: payload => axios.put("exercises/" + payload.id, payload),

  createExercise: payload => {
    return axios.post("exercises", payload);
  },

  removeItem: id => {
    return axios.delete(`exercise-assets/${id}`);
  }
});
