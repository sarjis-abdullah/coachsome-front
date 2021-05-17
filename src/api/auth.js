export default axios => ({
  register: payload => {
    return axios.post("auth/register", payload);
  },
  login: credentials => {
    return axios.post("auth/login", credentials);
  },
  logout: () => {
    return axios.post("auth/logout");
  },
  passowrdRecovery: payload => {
    return axios.post("auth/recovery", payload);
  },
  passwordReset: payload => {
    return axios.post("auth/password/reset", payload);
  }
});
