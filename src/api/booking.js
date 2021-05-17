export default axios => ({
  payByQuickpay: payload => {
    return axios.post("payments/quickpay/pay", payload);
  },
  notify(payload) {
    return axios.post("payments/quickpay/notify", payload);
  },
  changeStatus: payload => {
    return axios.post("bookings/acceptance", payload);
  },
  getPurchasedPackage(params) {
    return axios.get("bookings/packages", {
      params: {
        ...params
      }
    });
  }
});
