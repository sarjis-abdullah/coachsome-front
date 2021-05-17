export default axios => ({
  packageInfo: () => {
    return axios.get("pages/package");
  },
  saveHourlyRate: payload => {
    return axios.post("pages/package/hourlyRate", payload);
  },
  quickBooking: () => {
    return axios.post("pages/package/quickBooking");
  },
  saveDefaultPackage: payload => {
    return axios.post("packages/default", payload);
  },
  saveCampPackage: payload => {
    return axios.post("packages/camp", payload);
  },
  changePackageStatus: payload => {
    return axios.post("packages/changeStatus", payload);
  },
  savePackage: payload => {
    return axios.post("packages", payload);
  },
  updatePackage: payload => {
    return axios.put("packages/" + `${payload.id}`, payload);
  },
  updateOrder: payload => {
    return axios.post("packages/order", payload);
  },
  removePackage: payload => {
    return axios.post("packages/remove/" + `${payload.id}`);
  }
});
