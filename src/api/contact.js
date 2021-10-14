export default axios => ({
  get: params => axios.get("contacts", { params }),
  resetNewMessageCountInformation: params => axios.get("contacts", { params }),
  archive: payload => axios.post("contacts/archive", payload),
  unread: payload => axios.post("contacts/unread", payload)
});
