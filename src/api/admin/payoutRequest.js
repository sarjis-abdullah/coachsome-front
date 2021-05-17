export default axios => ({
  get: () => {
    return axios.get("admin/payout/requests");
  },
  paid: payload => {
    return axios.post("admin/payout/requests/paid", payload);
  }
});
