export default axios => ({
  get: () => axios.get("chatSettings"),
  enterPress: payload => axios.post("chatSettings/enterPress", payload)
});
