export default axios => ({
  exploreCoach: (params = {}) => {
    return axios.get("athlete/explore/coach", {
      params: { ...params }
    });
  }
});
