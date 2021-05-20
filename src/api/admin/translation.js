export default axios => ({
  get: () => {
    return axios.get("/admin/translations");
  },
  store: payload => {
    return axios.post("/admin/translations", payload);
  },
  update: payload => {
    return axios.put("/admin/translations", payload);
  }
});
