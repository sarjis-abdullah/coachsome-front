import { profileData } from "@/data";
export default {
  getImageByName(name) {
    if(name){
      return process.env.API_SERVER_STORAGE_URL + "/images/" + name;
    } else {
      return "";
    }
  },
  getDefaultProfileImage() {
    return profileData.PROFILE_DEFAULT_IMAGE;
  },
  getPublicAssetByRelativePath(path) {
    return process.env.API_SERVER_URL + "/public/assets/images/" + path;
  }
};
