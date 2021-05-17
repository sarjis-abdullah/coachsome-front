export default axios => ({
  get: () => {
    return axios.get("countries");
  }
});
