export default axios => ({
  all(params) {
    return axios.get("baseReviews/all", { params });
  },
  getBaseReview(params) {
    return axios.get("baseReviews", { params });
  },
  getProfileInfo(params) {
    return axios.get("baseReviews/profileInfo", { params });
  },
  store(payload) {
    return axios.post("baseReviews", payload);
  },
  makeRequest(payload) {
    return axios.post("baseReviews/request", payload);
  }
});
