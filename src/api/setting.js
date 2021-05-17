export default axios => ({
  getSettingInfo: () => {
    return axios.get("settings");
  }
});
