export default axios => ({
  availabilityPageTrigger: () => {
    return axios.get("pages/availabilities");
  },
  saveDfaultAvailabilitytimes: payload => {
    return axios.post("availabilities/default", payload);
  },
  updateAvailabilitytimes: payload => {
    return axios.post("availabilities/update", payload);
  }
});
