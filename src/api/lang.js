export default axios => ({
  getTranslation: () => {
    return axios.get("translation/languages");
  },
  saveDefaultPackage: payload => {
    return axios.post("translation/languages", payload);
  }
});
