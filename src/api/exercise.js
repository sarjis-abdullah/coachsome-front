export default (axios) => ({
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
