export const state = () => ({
  accessToken: process.browser ? localStorage.getItem("access_token") : null,
  user:
    process.browser && localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  currency_code: "",
  curr_lang: process.browser ? localStorage.getItem("curr_lang") : null,
  curr_lang_icon: process.browser
    ? localStorage.getItem("curr_lang_icon")
    : null,
  isActive: false,
  isAbleToActive: false,
  drawer: {
    clientBack: false
  },
  footer: {
    isFixed: false
  },
  showDialog: false,
  loginWithPopup: {
    loginScreen: true,
    loginUsingEmail: false,
    postLoginUsingEmail: false,
    OTPValidation: false,
    Register: false,
    GetStarted: false,
    ForgotPassword : false,
    PasswordReset: false,
    ResetOTPValidation: false
  },
  existing_user_email: process.browser && localStorage.getItem("existing_user_email") || null,
  login_medium: process.browser && localStorage.getItem("login_medium") || null,
});

export const getters = {
  isOpenClientBackDrawer(state) {
    return state.drawer.clientBack;
  },
  isFooterFixed(state) {
    return state.footer.isFixed;
  },
  isAbleToActive(state) {
    return state.isAbleToActive;
  },
  isActive(state) {
    return state.isActive;
  },
  accessToken(state) {
    return state.accessToken;
  },
  isAuthenticated(state) {
    return state.accessToken ? true : false;
  },
  auth(state) {
    return state.user;
  },
  isSwitchedUser(state) {
    let isSwitchedUser = false;
    if (state.user) {
      if (state.user.is_switched) {
        isSwitchedUser = true;
      }
    }
    return isSwitchedUser;
  },
  getAuthUserFullName(state) {
    let name = "";
    if (state.user) {
      if (state.user.first_name && state.user.last_name) {
        name = state.user.first_name + " " + state.user.last_name;
      }
    }
    return name;
  },
  isDialogOpen(state) {
    return state.showDialog;
  },
  activeLoginItem(state) {
    return state.loginWithPopup;
  },
  existingUserEmail(state){
    return state.existing_user_email;
  },
  loginMedium(state){
    return state.login_medium;
  }
};

export const mutations = {
  TOGGLE_CLIENT_BACK_DRAWER(state) {
    state.drawer.clientBack = !state.drawer.clientBack;
  },
  SET_CLIENT_BACK_DRAWER(state, flag) {
    state.drawer.clientBack = flag;
  },
  CHANGE_ACTIVE_STATUS(state, flag) {
    state.isActive = flag;
  },
  SET_THE_FOOTER_FIXED_POSITION_FLAG(state, flag) {
    state.footer.isFixed = flag;
  },
  PUT_TOKEN(state, token) {
    state.accessToken = token;
  },
  DRAWER(state) {
    state.drawer = !state.drawer;
  },
  LOG_IN(state, access_token) {
    state.accessToken = access_token;
  },
  LOG_OUT(state) {
    state.accessToken = null;
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
  },
  SET_USER(state, user) {
    state.user = user;
  },
  UPDATE_USER_NAME(state, userName) {
    if (state.user) {
      state.user.user_name = userName;
      localStorage.setItem("user", JSON.stringify(state.user));
    }
  },
  UPDATE_USER_IMAGE(state, image) {
    if (state.user) {
      state.user.image = image;
      localStorage.setItem("user", JSON.stringify(state.user));
    }
  },
  UPDATE_USER_ACTIVE_STATUS(state, status) {
    if (state.user) {
      state.user.is_active = status;
      state.isActive = status;
      localStorage.setItem("user", JSON.stringify(state.user));
    }
  },
  TOGGLE_DIALOG(state){
    state.showDialog = !state.showDialog;
  },
  SET_ACTIVE_POPUP_ITEM(state, item) {
    Object.keys(state.loginWithPopup).forEach(key => {
      if (key == item){state.loginWithPopup[key] = true;}
      else{ state.loginWithPopup[key] = false; }

    });
  },
  SET_EXISTING_EMAIL(state, email){
    state.existing_user_email = email;
    localStorage.setItem("existing_user_email", email);
  },
  SET_LOGIN_MEDIUM(state, provider_name){
    state.login_medium = provider_name;
    localStorage.setItem("login_medium", provider_name);
  },

};

export const actions = {
  toggleClientBackDrawer(context) {
    context.commit("TOGGLE_CLIENT_BACK_DRAWER");
  },
  setClientBackDrawer(context, flag) {
    context.commit("SET_CLIENT_BACK_DRAWER", flag);
  },
  changeActiveStatus(context, flag) {
    context.commit("UPDATE_USER_ACTIVE_STATUS", flag);
  },
  setTheFooterFixedPositionFlag(context, flag) {
    context.commit("SET_THE_FOOTER_FIXED_POSITION_FLAG", flag);
  },
  putToken(context, token) {
    localStorage.setItem("access_token", token);
    context.commit("PUT_TOKEN", token);
  },
  drawer(context) {
    context.commit("DRAWER");
  },
  login(context, access_token) {
    localStorage.setItem("access_token", access_token);
    context.commit("LOG_IN", access_token);
  },
  logout(context) {
    context.commit("LOG_OUT");
  },
  setUser(context, user) {
    localStorage.setItem("user", JSON.stringify(user));
    context.commit("SET_USER", user);
  },
  updateUserName(context, userName) {
    context.commit("UPDATE_USER_NAME", userName);
  },
  updateUserImage(context, image) {
    context.commit("UPDATE_USER_IMAGE", image);
  },
  setLang(context, lang) {
    context.commit("SET_LANG", lang);
  },
  toggleDialog(context) {
    context.commit("TOGGLE_DIALOG");
  },
  setActivePopupItem(context, item){
    context.commit("SET_ACTIVE_POPUP_ITEM", item);
  },
  setExistingEmail(context, email) {
    context.commit("SET_EXISTING_EMAIL", email);
  },
  setLoginMedium(context, medium) {
    context.commit("SET_LOGIN_MEDIUM", medium);
  },
};
