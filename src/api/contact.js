export default axios => ({
  get: params => axios.get("contacts", { params }),
  resetNewMessageCountInformation: params => axios.get("contacts", { params })
});
