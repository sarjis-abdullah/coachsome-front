export default axios => ({
  getUserList: () => axios.get("admin/users"),
  updateUser: payload => axios.put("admin/users/" + payload.id, payload),
  storeUser: payload => axios.post("admin/users", payload)
});
