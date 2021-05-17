export default axios => ({
  getProgressStatus: () => axios.get("coach/progressStatus")
});
