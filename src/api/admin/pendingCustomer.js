export default axios => ({
  get: () => {
    return axios.get("admin/pendingCustomers");
  }
});
