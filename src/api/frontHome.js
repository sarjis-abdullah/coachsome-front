export default axios => ({
  getInitialData: params => {
    return axios.get("pages/frontHome", { params });
  }
});
