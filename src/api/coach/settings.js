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
  },
  getNotification: params => {
    return axios.get("coach/settings/notifications", {
      params: {
        ...params
      }
    });
  },
  updateNotification: payload => {
    return axios.post("coach/settings/notifications/"+payload.id, payload);
  },

  onBoardCoach: payload => {
    return axios.post("profile/onboard-coach/", payload);
  }


});
