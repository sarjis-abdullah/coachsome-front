export default axios => ({
  switched: payload => {
    return axios.post("auth/impersonate/" + payload.id);
  },
  revert: () => {
    return axios.get("auth/impersonate/revert");
  }
});
