export default axios => ({
  init: () => axios.get("chats")
});
