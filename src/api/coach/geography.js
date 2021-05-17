export default axios => ({
  geographyPageInitialData: () => {
    return axios.get("pages/geography");
  },
  storeLocation: payload => {
    return axios.post("locations", payload);
  },
  locations: () => {
    return axios.get("locations");
  },
  storeDistance: payload => {
    return axios.post("distances", payload);
  },
  deleteLocation: id => {
    return axios.delete("locations/" + id);
  },
  getLocations: params => {
    return axios.get("locations", {
      params: {
        ...params
      }
    });
  }
});
