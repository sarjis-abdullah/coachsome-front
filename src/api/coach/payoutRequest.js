export default axios => ({
  doRequest: payload => {
    return axios.post("coach/payout/request", payload);
  }
});
