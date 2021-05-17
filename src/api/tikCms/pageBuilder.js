export default axios => ({
  getPage: page_name => {
    return axios.get("tikcms/page/get/all/language/published/design", {
      params: {
        page_name
      }
    });
  },
  getPageByGroupId: groupId => {
    return axios.get("tikcms/page/get/all/language/published/design", {
      params: {
        page_group_id: groupId
      }
    });
  },
  getPageByGroupName: groupName => {
    return axios.get("tikcms/page/get/all/group/published/design", {
      params: {
        page_group_name: groupName
      }
    });
  }
});
