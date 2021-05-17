export default axios => ({
  get: params => axios.get("admin/orderList", { params })
});
