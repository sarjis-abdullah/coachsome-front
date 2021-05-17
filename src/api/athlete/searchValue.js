export default axios => ({
  getSearchValues: params => {
    return axios.get("athlete/searchValues", {
      params: {
        ...params
      }
    });
  }
});
