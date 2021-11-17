export default axios => ({
  initBooking: params => axios.get("bookings", { params })
});
