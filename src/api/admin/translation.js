export default axios => ({
  get: () => {
    return axios.get("/translation");
  },
  store: payload => {
    return axios.post("/translation", payload);
  },
  update: payload => {
    return axios.put("/translation" + payload);
  }
});
