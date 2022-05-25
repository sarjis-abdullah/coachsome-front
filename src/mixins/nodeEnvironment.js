export default {
  computed: {
    isDevelopment() {
      return process?.env?.NODE_ENV == "development" ? true : false;
    },
    isStaging() {
      return process?.env?.NODE_ENV == "test" ? true : false;
    },
    isProd() {
      return !this.isDevelopment && !this.isStaging;
    }
  }
};
