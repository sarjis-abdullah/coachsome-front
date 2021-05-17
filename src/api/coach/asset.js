export default (axios) => ({
  saveImageUrl: payload => {
    return axios.post("galleries", payload);
  },
  saveVideoUrl: payload => {
    return axios.post("galleries", payload);
  },
  gallery: () => {
    return axios.get("galleries");
  },
  removeGallery: id => {
    return axios.delete(`galleries/${id}`);
  }
});
