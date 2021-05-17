
export default axios => ({
  getFrontBarInitialData: () => {
    return axios.get("appBar/front");
  }
});
