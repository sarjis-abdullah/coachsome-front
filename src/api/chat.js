export default axios => ({
  init: () => {
    return axios.get("chats");
  },
  storeMessage: payload => {
    return axios.post("chats/messages", payload);
  },
  getMessage: params => {
    return axios.get("chats/messages", {
      params: { ...params }
    });
  },
  getContact: params => {
    return axios.get("chats/contacts", {
      params: { ...params }
    });
  },
  getTotalNewMessageCount: () => {
    return axios.get("chats/contacts/totalNewMessageCount");
  }
});
