export default axios => ({
  get: params => axios.get("admin/orderList", { params }),
  getSessions: payload => {
    return axios.post("admin/getSessions", payload);
  },
  removeSession: payload => {
    return axios.post("admin/removeSession", payload);
  }
});
