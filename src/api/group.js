export default axios => ({
  store: payload => axios.post("groups", payload)
});
