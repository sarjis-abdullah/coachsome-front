export default axios => ({
  getBookingInformation: params => axios.get("athlete/bookings", { params }),
  changeFavourite: payload => axios.post("athlete/bookings/favourite", payload)
});
