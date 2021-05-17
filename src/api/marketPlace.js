export default axios => ({
  getMarketPlacePageInitialData: () => {
    return axios.get("pages/marketplace");
  },
  getHourlyRatingUsers: params => {
    return axios.get("hourlyRatingUsers", {
      params
    });
  }
});
