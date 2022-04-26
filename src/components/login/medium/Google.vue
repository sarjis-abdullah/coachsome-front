<template>
  <v-layout row wrap class="align-items-to-center">
    <v-flex xs12 mt-5>
      <p class="login-title">{{$t("pwa_welcome_back")}}</p>
      <v-divider></v-divider>
    </v-flex>
    <v-flex xs10 > 
      <p class="login-email-label mt-2"> {{$t("forgot_password_hint_email_add")}}</p>
      <p class="login-email-text mt-2"> {{email_address}}</p>
    </v-flex>

    <v-flex xs10 class="align-items-to-center" mt-5>
        <v-btn
        elevation="2"
        outlined
        class="login-option-btn"
        @click="loginWithGoogle()"
        :loading="show_loading_on_google_login_btn"
        >
        <img class="btn-icon" :src="require('@/assets/img/svg-icons/google.svg')" alt="">  <span class="social-login-btn-google-text btn-text"> {{$t("pwa_google_login")}}</span>
        </v-btn>
    </v-flex>
    <v-flex xs10 mt-7>
      <router-link :to="{}" @click.native="backToLogin()" v-if="dialogShow"><p class="login-footer-text">{{$t("pwa_not_you")}}</p></router-link>
      <router-link to="/login" v-else><p class="login-footer-text">{{$t("pwa_not_you")}}</p></router-link>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      snackbar: {
        multiLine: true,
        show: false,
        text: "",
      },
      show1: false,
      valid: true,
      show_loading_on_google_login_btn: false,
    };
  },
  computed: {
      email_address() {
        return this.$store.getters.existingUserEmail;
      },
      dialogShow(){
        return this.$store.getters.isDialogOpen;
      },
  },
  mounted() {},
  methods: {
    loginWithGoogle() {
      this.show_loading_on_google_login_btn = true;
      window.location.href =
        process.env.API_SERVER_URL + "/auth/login/google?user_type=coach";
    },
    backToLogin(){
      this.$store.dispatch("setActivePopupItem", "loginUsingEmail")
    }
  }
};
</script>

<style scoped>
.align-items-to-center{
  display: flex;
  justify-content: center;
  align-items: center;
}

.v-divider {
    border-color: #15577C !important; 
}

a{
  text-decoration: none!important;;
}

.login-title{
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  letter-spacing: -0.2px;
  color: #15577C;

}
.login-email-label{
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  /* identical to box height */


  /* Dusty blue */

  color: #15577C;

}
.login-footer-text{
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 20px;
  color: #15577C;

}
.btn-icon{
  margin-right: auto;
}

.btn-text{
  margin-right: auto;
}

.login-option-btn{
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  letter-spacing: 1px;
  width: 100%;
  text-transform: none !important;
  color: #15577C;
}
.login-email-text{
    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    /* identical to box height */

    display: flex;
    align-items: center;

    color: #8692A6;

}
</style>
