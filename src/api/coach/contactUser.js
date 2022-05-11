export default axios => ({
  getAllContactUsers: (params) => axios.get("coach/contact-user"),
  resetNewMessageCountInformation: params => axios.get("contacts", { params }),
  archive: payload => axios.post("contacts/archive", payload),
  unarchive: payload => axios.post("contacts/unarchive", payload),
  unread: payload => axios.post("contacts/unread", payload)
});
