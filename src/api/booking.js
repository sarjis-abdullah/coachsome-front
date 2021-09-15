export default axios => ({
  getBookingInfo: params => axios.get("bookings", { params }),
  payByQuickpay: payload => axios.post("payments/quickpay/pay", payload),
  notify: payload => axios.post("payments/quickpay/notify", payload),
  changeStatus: payload => axios.post("bookings/acceptance", payload),
  getPurchasedPackage: params => axios.get("bookings/packages", { params })
});
