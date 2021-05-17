export default {
  accessTokenKey(){
    return "access_token";
  },
  accessToken() {
    return localStorage.getItem(this.accessTokenKey());
  },
};
