export default axios => ({
  get: params => {
    return axios.get("coach/settings", {
      params: {
        ...params
      }
    });
  },
  changeEmail: payload => {
    return axios.post("coach/settings/changeEmail", payload);
  },
  changePassword: payload => {
    return axios.post("coach/settings/changePassword", payload);
  },
  updateSetting: payload => {
    return axios.post("coach/settings/update", payload);
  }
});
