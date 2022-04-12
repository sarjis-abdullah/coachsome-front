<template>
    <div>
      <!-- Snackbar -->
        <v-snackbar top v-model="snackbar.show" :multi-line="snackbar.multiLine">
          {{ snackbar.text }}
          <v-btn :color="response_color" text @click="snackbar.show = false">Close</v-btn>
        </v-snackbar>
      <!-- Snackbar -->

      <v-row class="justify-center pt-5">
          <v-col cols="12">
            <div class="d-flex justify-space-between">
              <p class="top-text-first"><span></span></p>
              <p class="login-title">{{$t("pwa_login_title")}}</p>
              <v-btn
                  icon
                  color="#15577C"
                  @click="$emit('hide-dialog')"
              >
                  <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
            <v-divider></v-divider>
          </v-col>
      </v-row>
      <!-- <div class="cs-login-sec">
        <div class="cs-login-middle"> -->
          <v-row
            align="center"
            justify="center"
          >
            <v-col cols="12">
              <p class="login-sub-title">{{$t("pwa_login_subtitle")}}</p>
            </v-col>
          </v-row>
          <v-row class="justify-center">
            <v-col cols="12">
                <v-text-field
                  outlined
                  dense 
                  id="email"
                  v-model="email"
                  class="cs-input-text-field-login"
                  :placeholder="$t('pwa_email_placeholder')"
                  :rules="email_rules"
                  required
                  name="email"
                  :label="$t('pwa_email')"
                />
            </v-col>
          </v-row>
          <v-row class="justify-center">
            <v-col cols="12">
              <v-form
                ref="form"
                v-model="valid"
                class="d-block w-100"
                lazy-validation
              >
                <v-btn 
                  block
                  color="#EDB041"
                  class="white--text continue-with-email-btn"
                  :loading="show_loading_on_login_btn"
                  @click="checkEmail()"
                >
                    {{$t("pwa_continue_btn")}}
                </v-btn>
              </v-form>
            </v-col>
          </v-row>
          <v-row class="justify-center">
            <v-col cols="12">
            <v-layout row wrap class="align-items-to-center">
              <v-flex xs5 lg5 md5 ><v-divider></v-divider></v-flex>
              <v-flex xs2 lg2 md2 class="align-items-to-center">{{$t("pwa_login_alternate_choose")}}</v-flex>
              <v-flex xs5 lg5 md5 ><v-divider></v-divider></v-flex>
            </v-layout>
            </v-col>
          </v-row>
          <v-row class="justify-center">
            <v-col cols="12">
              <v-btn
                outlined
                color="#15577C"
                class="login-option-btn"
                @click="loginWithFacebook()"
                :loading="show_loading_on_facebook_login_btn"
              >
                <img class="btn-icon"  :src="require('@/assets/img/svg-icons/facebook.svg')" alt="">  <span class="social-login-btn-facebook-text btn-text"> {{$t("pwa_facebook_login")}}</span>
              </v-btn>
            </v-col>
          </v-row>
          <v-row class="justify-center">
            <v-col cols="12">
              <v-btn
                outlined
                class="login-option-btn"
                @click="loginWithGoogle()"
                :loading="show_loading_on_google_login_btn"
              >
                <img class="btn-icon" :src="require('@/assets/img/svg-icons/google.svg')" alt="">  <span class="social-login-btn-google-text btn-text"> {{$t("pwa_google_login")}}</span>
              </v-btn>
            </v-col>
          </v-row>
          <v-row class=" justify-center pb-16">
          <v-col cols="12">
            <div class="mt-5">
              <p class="login-option-text">{{$t("pwa_login_footer_1")}}
                <a :href="uri.terms" target="_blank" class="link-text"><u>{{ $t("global_url_terms_of_use") }}</u></a>
                {{$t("pwa_login_footer_2")}} 
                <a :href="uri.policy" target="_blank" class="link-text"><u>{{ $t("global_url_privacy_policy") }}</u></a>
              </p>
            </div>
          </v-col>
        </v-row>
        <!-- </div>
      </div> -->
  
    </div>
</template>


<script>
import { authApi } from "@/api";
import { pathData } from "@/data";
export default ({
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
        response_color: "red",
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
      }
    },
    mounted() {
      this.show_loading_on_facebook_login_btn = false;
      this.show_loading_on_google_login_btn = false;
      if (this.$route.query.status) {
          if (this.$route.query.status == "error") {
              if (this.$route.query.message_key) {
              this.$toast.error(this.$i18n.t(this.$route.query.message_key));
              }
          }
      }
    },
    methods: {
      loginWithFacebook() {
        this.show_loading_on_facebook_login_btn = true;
        window.location.href =
          process.env.API_SERVER_URL +
          "/auth/login/facebook";
      },
      loginWithGoogle() {
        this.show_loading_on_google_login_btn = true;
        window.location.href =
          process.env.API_SERVER_URL + "/auth/login/google";
      },
      checkEmail() {
        this.show_loading_on_login_btn = true;
        if (this.$refs.form.validate()) {
        let payload = {
          email: this.email
        };
        authApi(this.$axios)
          .login(payload)
          .then(response => {
            this.$store.dispatch("setExistingEmail", this.email);
            if(response.data.is_social_register){
              this.$store.dispatch("setLoginMedium", response.data.social_acount.provider_name);
            }else{
              this.$store.dispatch("setLoginMedium", 'email');
            }
            if(response.data.email_exist){
              this.show_loading_on_login_btn = false;
              this.$store.dispatch("setActivePopupItem", "postLoginUsingEmail")
            }else{
                authApi(this.$axios)
                .preRegister(payload)
                .then(response => {
                  if(response.status == 200){
                    this.$toast.success(response.data.message);
                    this.$store.dispatch("setExistingEmail", this.email);
                    this.show_loading_on_login_btn = false;
                    this.$store.dispatch("setActivePopupItem", "OTPValidation")
                  }
                })
                .catch(({ response }) => {
                  console.log(response);
                  this.show_loading_on_login_btn = false;
                  if (response.data && response.data.message) {
                    this.$toast.error(response.data.message);
                  }
                });
            }

          })
          .catch(({ response }) => {
            this.show_loading_on_login_btn = false;
            if (response.data && response.data.message) {
              this.$toast.error(response.data.message);
            }
          });
      }
    },
    show(msg) {
      this.snackbar.show = true;
      this.snackbar.text = msg;
    }
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

.login-option-text{
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: #15577C;
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


.continue-with-email-btn{
  background: #EDB041;
  border-radius: 6px;
  width: 100%!important;
  text-transform: none !important;
}

.login-footer-text{
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 20px;
  color: #15577C;
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
</style>
