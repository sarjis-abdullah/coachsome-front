export default axios => ({
  storeReviews: payload => {
    return axios.post("reviews", payload);
  },
  getReviews: () => {
    return axios.get("reviews");
  },
  getCompnayRating(params = {}) {
    return axios.get("companyRatings", { params });
  }
});
