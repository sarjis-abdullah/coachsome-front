export default axios => ({
  getTimezone: params => {
    return axios.get("coach/timezones", {
      params: {
        ...params
      }
    });
  }
});
