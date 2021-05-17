export default axios => ({
  get: () => {
    return axios.get("coach/payoutInformation");
  },
  save: payload => {
    return axios.post("coach/payoutInformation", payload);
  }
});
