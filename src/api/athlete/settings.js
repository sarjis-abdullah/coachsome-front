export default axios => ({
  get: params => {
    return axios.get("athlete/settings", {
      params: {
        ...params
      }
    });
  },
  updateSetting: payload => {
    return axios.put("athlete/settings/"+payload.id, payload);
  }
});
