export default axios => ({
  getTimeRange: params => {
    return axios.get("calenders/days", {
      params: {
        ...params
      }
    });
  }
});
