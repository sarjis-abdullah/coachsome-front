export default axios => ({
  getUserList: () => {
    return axios.get("admin/users");
  },
  updateUser: payload => {
    return axios.put("admin/users/" + payload.id, payload);
  }
});
