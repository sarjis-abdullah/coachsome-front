export default axios => ({
  getBookingInformation: params => {
    return axios.get("athlete/bookings", {
      params: {
        ...params
      }
    });
  },
  changeFavourite: payload => {
    return axios.post("athlete/bookings/favourite", payload);
  }
});
