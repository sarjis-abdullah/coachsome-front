export default axios => ({
  get: (params = {}) => axios.get("marketplaces", { params })
});
