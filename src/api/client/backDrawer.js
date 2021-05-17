export default axios => ({
  getBackendDrawerInitialData: () => {
    return axios.get("drawer/back");
  },
  changeActiveStatus: () => {
    return axios.post("drawer/back/changeActiveStatus");
  }
});
