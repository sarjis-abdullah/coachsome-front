export default axios => ({
  authUserInformation: (params = null) => {
    return axios.get("authUserInformation", {
      params: {
        ...params
      }
    });
  }
});
