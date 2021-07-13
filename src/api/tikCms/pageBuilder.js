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
  },
  getBlogCategory: ({ locale }) => {
    return axios.get(
      `tikcms/category/translations/by/language/all/show?language=${locale}`
    );
  },
  getBlogByCategory: ({ category }) => {
    return axios.get(
      `tikcms/blog/individual/category/published/show?blog_category=${category}`
    );
  },
  getBlogPost: () => {
    return axios.get(
      `tikcms/blog/all/published/show`
    );
  }
});
