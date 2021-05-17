export default axios => ({
  getBookingInformation: params => {
    return axios.get("coach/bookings", {
      params: {
        ...params
      }
    });
  },
  changeFavourite: payload => {
    return axios.post("coach/bookings/favourite", payload);
  }
});
