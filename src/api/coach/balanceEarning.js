export default axios => ({
  get: params => {
    return axios.get("coach/balanceEarnings", {
      params: {
        ...params
      }
    });
  }
});
