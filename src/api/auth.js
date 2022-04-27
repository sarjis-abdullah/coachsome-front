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
  addNewPassword: payload => {
    return axios.post("auth/password/add", payload);
  },
  genPasswordReset: payload => {
    return axios.post("auth/password/reset", payload);
  },
  preRegister: payload => {
    return axios.post("pwa/register", payload);
  },
  postRegister: (payload) => {
    return axios.post("pwa/post-register", payload)
  },
  otpValidation: (payload) => {
    return axios.post("pwa/otp-validation", payload) 
  },
  passowrdRecovery: (payload) => {
    return axios.post("pwa/recovery",payload)
  },
  resetOTPValidation: (payload) => {
    return axios.post("pwa/password/otp-validation",payload)
  },
  resetOTPExist: (payload) => {
    return axios.post("pwa/password/reset-request",payload)
  },
  passwordReset: (payload) => {
    return axios.post("pwa/password/reset",payload)
  }
});
