export default axios => ({
  store: payload => {
    return axios.post("bookingTimes", payload);
  },
  changeStatus: payload => {
    return axios.post("bookingTimes/acceptance", payload);
  }
});
