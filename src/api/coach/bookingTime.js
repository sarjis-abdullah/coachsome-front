export default axios => ({
  getBookingTimes: params => {
    return axios.get("coach/bookingTimes", {
      params: {
        ...params
      }
    });
  }
});
