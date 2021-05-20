export default axios => ({
  get: () => {
    return axios.get("/admin/translations/seo");
  },
  save: payload => {
    return axios.post("/admin/translations/seo", payload);
  },
});
