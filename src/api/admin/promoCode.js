export default axios => ({
  get: () => axios.get("admin/promoCodes"),
  store: payload => axios.post("admin/promoCodes", payload),
  update: (id, payload) => axios.put(`admin/promoCodes/${id}`, payload),
  destroy: id => axios.delete(`admin/promoCodes/${id}`),
  getTrackingCode: code => axios.get(`admin/tracking-codes/${code}`)
});
