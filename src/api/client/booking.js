export default axios => ({
  initBooking: payload => {
    return axios.post("bookings", payload);
  }
});
