export default axios => ({
  getLocaleTranslation: () => {
    return axios.get("locale/translations");
  }
});
