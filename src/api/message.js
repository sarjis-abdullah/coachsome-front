export default axios => ({
  sendMessage: payload => {
    return axios.post("messages/send", payload);
  }
});
