export default axios => ({
  getBookingTimes: params => {
    return axios.get("athlete/bookingTimes", {
      params: {
        ...params
      }
    });
  }
});
