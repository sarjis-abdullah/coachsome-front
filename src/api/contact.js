export default axios => ({
  get: params => axios.get("chats", { params })
});
