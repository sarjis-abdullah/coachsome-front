export default axios => ({
  getUserLogList: () => {
    return axios.get("admin/userLogs");
  }
});
