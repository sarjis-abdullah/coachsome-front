export default axios => ({
  store: payload => axios.post("messages", payload),
  get: params => axios.get("messages", { params }),
  getNewCount: () => axios.get("messages/newCount")
});
