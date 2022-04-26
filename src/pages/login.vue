<template>
<v-container fluid grid-list-md text-xs-center class="d-flex">
    <v-row
      justify="center"
    >
      <v-col
        cols="11"
        sm="8"
        md="6"
        lg="4"
        xs="11"
      >

        <v-row class="justify-center pt-5">
            <v-col cols="12">
              <p class="login-title">{{ $t("pwa_login_title") }}</p>
              <v-divider></v-divider>
            </v-col>
        </v-row>
        <v-row
          align="center"
          justify="center"
        >
          <v-col cols="12">
            <p class="login-sub-title">{{ $t("pwa_login_subtitle") }}</p>
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-col cols="12">
              <v-btn
                elevation="2"
                outlined
                color="#15577C"
                class="login-option-btn"
                @click="loginWithFacebook()"
                :loading="show_loading_on_facebook_login_btn"
              >
                <img class="btn-icon"  :src="require('@/assets/img/svg-icons/facebook.svg')" alt="">  <span class="social-login-btn-facebook-text btn-text"> {{ $t("pwa_facebook_login") }}</span>
              </v-btn>
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-col cols="12">
              <v-btn
                outlined
                color="#15577C"
                class="login-option-btn"
                @click="loginWithGoogle()"
                :loading="show_loading_on_google_login_btn"
              >
                <img class="btn-icon"  :src="require('@/assets/img/svg-icons/google.svg')" alt="">  <span class="social-login-btn-goog;e-text btn-text"> {{ $t("pwa_google_login") }}</span>
              </v-btn>
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-col cols="12">
              <v-btn
                elevation="2"
                outlined
                class="login-option-btn"
                @click="loginWithEmail()"
              >
                <img class="btn-icon" :src="require('@/assets/img/svg-icons/mail.svg')" alt="">  <span class="login-btn-email-text btn-text"> {{ $t("pwa_email_login") }}</span>
              </v-btn>
          </v-col>
        </v-row>
        <v-row class=" justify-center pt-5">
          <v-col cols="12">
            <div class="mt-5">
              <p class="login-option-text">{{ $t("pwa_login_footer_1") }} 
                <router-link :to="uri.terms" class="link-text"><u>{{ $t("global_url_terms_of_use") }}</u></router-link>
                  {{ $t("pwa_login_footer_2") }}
                  <router-link :to="uri.policy" class="link-text"><u>{{ $t("global_url_privacy_policy") }}</u></router-link>
              </p>
            </div>
          </v-col>
        </v-row>
        <v-row class="justify-center pb-5">
          <v-col cols="12" class="footer-col">
            <div class="mt-10 ">
              <router-link to="/coaches"><p class="login-footer-text">{{$t("pwa_skip_text")}}</p></router-link>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { pathData } from "@/data";
export default ({
    layout: "auth",
    data () {
      return{
        uri: {
          policy: pathData.pages.policy,
          terms: pathData.pages.terms,
        },
        show1: false,
        show_loading_on_login_btn: false,
        show_loading_on_facebook_login_btn : false,
        show_loading_on_google_login_btn : false,
        snackbar: {
            multiLine: true,
            show: false,
            text: "",
        },
        valid: true,
        loading: false,
        email: "",
        email_rules: [
        (v) => !!v || this.$i18n.t("valid_required_email"),
        (v) => /.+@.+\..+/.test(v) || this.$i18n.t("valid_valid_email"),
        ],
        password: "",
        password_rules: [(v) => !!v || this.$i18n.t("valid_pass_required")],
        is_remember: false,
      }
    },
    watch:{
      "$vuetify.breakpoint.smAndUp" : function() {
        this.$store.dispatch("setActivePopupItem", "loginScreen");
        this.$store.dispatch("toggleDialog");
      }
    },
    mounted() {
      this.show_loading_on_facebook_login_btn = false;
      this.show_loading_on_google_login_btn = false;
      this.show_loading_on_login_btn = false;
        if (this.$route.query.status) {
            if (this.$route.query.status == "error") {
                if (this.$route.query.message_key) {
                this.$toast.error(this.$i18n.t(this.$route.query.message_key));
                }
            }
        }
    },
    methods: {
      loginWithEmail() {
        this.show_loading_on_login_btn = true;
        this.$router.push(this.localePath(pathData.pages.emailLogin))
      },
      loginWithFacebook() {
        this.show_loading_on_facebook_login_btn = true;
        window.location.href =
          process.env.API_SERVER_URL + "/auth/login/facebook";
      },
      loginWithGoogle() {
        this.show_loading_on_google_login_btn = true;
        window.location.href =
          process.env.API_SERVER_URL + "/auth/login/google";
      },
    },

})
</script>


<style scoped>

.v-application {
  line-height: 0!important;
}
.w-100{
  width: 100% !important;
}
.tm-login-logo {
  height: 100px;
}
.cs-login-sec{
  height: calc(100vh - 248px);
  position: relative;
  min-height: 280px;
}
.cs-login-middle {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.cs-login-footer {
  height: 100px;
}


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
.login-sub-title{
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  letter-spacing: -0.2px;
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

.login-option-text{
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: #15577C;
}


.continue-with-email-btn{
  background: #EDB041;
  border-radius: 6px;
  width: 100%;
  text-transform: none !important;
}
.cs-input-text-field-login{
  width: 80%!important;
}

.login-footer-text{
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  text-decoration-line: underline!important;

  color: #15577C;

  bottom: 0;

}

.link-text{
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  text-decoration-line: underline;

  color: #15577C;
}

.footer-col{
  bottom: 0;
    position: fixed;
}

</style>
