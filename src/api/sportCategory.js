export default axios => ({
  getSportCategories: (params = {}) => axios.get("sportCategories", { params })
});
