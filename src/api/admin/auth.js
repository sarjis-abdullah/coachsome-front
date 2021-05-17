export default axios => ({
  login: credentials => {
    return axios.post("auth/admin/login", credentials);
  },
  logout: () => {
    return axios.post("auth/admin/logout");
  }
});
