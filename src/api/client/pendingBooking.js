export default axios => ({
  store: payload => {
    return axios.post("pendingBookings", payload);
  },
  confirm: payload => {
    return axios.post("pendingBookings/confirm", payload);
  }
});
