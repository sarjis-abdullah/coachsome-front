export default axios => ({
  getLanguages: params => axios.get("languages", { params })
});
