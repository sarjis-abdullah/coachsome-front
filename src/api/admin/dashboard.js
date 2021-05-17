export default axios => ({
  get: params => {
    return axios.get("admin/dashboard", { params });
  }
});
