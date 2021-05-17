export default {
  // Package
  PACKAGE_DEFAULT_ID: 1,
  PACKAGE_CAMP_ID: 2,

  // Server
  SERVER_STORAGE_PATH: process.env.VUE_APP_API_BASE_URL + "/storage",
  SERVER_PUBLIC_PATH: process.env.VUE_APP_API_BASE_URL + "/public",

  // Package Category Id
  PACKAGE_CATEGORY_ID_DEFAULT: 1,
  PACKAGE_CATEGORY_ID_CAMP: 2,

  // Package Card Description
  PACKAGE_CARD_DESCRIPTION_DEFAULT_SHOW_MAX_CHAR: 80,

  // Category Field Name
  CATEGORY_FILED_NAME_DA: "name_da",
  CATEGORY_FILED_NAME_EN: "name_en",

  // Redirect Path
  REDIRECT_PATH_AFTER_LOGIN: "profile",
  REDIRECT_PATH_ADMIN: "admin/dashboard",
  REDIRECT_PATH_CLIENT: "profile",

  ACCESS_TOKEN_KEY: "auth._token.local"
};
