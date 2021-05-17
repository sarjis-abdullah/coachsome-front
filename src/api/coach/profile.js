export default axios => ({
  uploadImages: images => {
    return axios.post("profileImages", { ...images });
  },
  destroyImages: () => {
    return axios.delete("profileImages");
  },
  languages: () => {
    return axios.get("languages");
  },
  sportTags: () => {
    return axios.get("sport/tags");
  },
  sportCategories: () => {
    return axios.get("sport/categories");
  },
  uploadImage: image => {
    return axios.post("profiles/images", { profile_image: image });
  },
  authUserProfileInfo: () => {
    return axios.get("profiles");
  },
  profileSave: payload => {
    return axios.post("profiles", payload);
  },
  saveSportTag: payload => {
    return axios.post("sport/tags", payload);
  },
  getProfileInformation: userName => {
    return axios.get(`publicProfile/${userName}`);
  },
  updateUserName: userName => {
    return axios.post(`user/${userName}`);
  }
});
