<template>
    <v-container fluid >
    <v-row
      justify="center"
    >
      <v-col
        cols="12"
      >
        <v-row>
          <v-col cols="12" >
            <p class="login-title">{{$t("pwa_welcome_back")}}</p>
            <v-divider></v-divider>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" class="py-0 my-0">
            <p class="login-email-label mt-2"> {{$t("forgot_password_hint_email_add")}}</p>
            <p class="login-email-text mt-2"> {{email}}</p>
          </v-col>
       
          <v-col cols="12" class="py-0 my-0" v-if="has_password">
          <p class="login-password-label mt-2"> {{$t("password_reset_text_password")}}</p>
            <v-text-field
              outlined
              dense
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              color="red"
              :label="$t('pwa_password_placeholder')"
              @click:append="show1 = !show1"
              id="password"
              class="cs-input-text-field-login"
              :rules="password_rules"
              :loading="show_loading_on_login_btn"
              required
              style="color:#15577C"
              @keyup.enter="login()"
            />
          </v-col>
 
          <v-col cols="12" class="pt-0 mt-0" v-if="has_password">
            <v-form
              ref="form"
              v-model="valid"
              class="d-block w-100"
              lazy-validation
            >
              <v-btn 
                align="center"
                justify="space-around"
                color="#EDB041"
                class="white--text continue-with-email-btn"
                :loading="show_loading_on_login_btn"
                block
                @click="login()"
            >
                {{$t("pwa_continue_btn")}}
            </v-btn>
            </v-form>
          </v-col>

          <v-col cols="12" v-if="has_password" >
          <v-layout row wrap class="align-items-to-center">
            <v-flex xs5 lg5 md5 ><v-divider></v-divider></v-flex>
            <v-flex xs2 lg2 md2 class="align-items-to-center">{{$t("pwa_login_alternate_choose")}}</v-flex>
            <v-flex xs5 lg5 md5 ><v-divider></v-divider></v-flex>
          </v-layout>
          </v-col>

          <v-col cols="12" >
            <v-btn
                outlined
                color="#15577C"
                class="login-option-btn"
                @click="loginWithApple()"
                :loading="show_loading_on_apple_login_btn"
            >
                <img class="btn-icon"  :src="require('@/assets/img/svg-icons/facebook.svg')" alt="">  <span class="social-login-btn-facebook-text btn-text"> {{$t("pwa_facebook_login")}}</span>
            </v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="11" class="mt-5">
            <router-link :to="{}" @click.native="backToLogin()" v-if="dialogShow"><p class="login-footer-text">{{$t("pwa_not_you")}}</p></router-link>
            <router-link to="/login" v-else><p class="login-footer-text">{{$t("pwa_not_you")}}</p></router-link>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    </v-container>
</template>
<script>
import { authApi } from "@/api";
import {  constantData, pathData } from "@/data";
import { redirectPathService } from "@/services";
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
      show_loading_on_login_btn: false,
      email: this.$store.getters.existingUserEmail,
      password: "",
      password_rules: [(v) => !!v || this.$i18n.t("valid_pass_required")],
      show_loading_on_apple_login_btn: false,
    };
  },
  computed: {
      has_password() {
        return this.$store.getters.getHasPassword;
      },
      dialogShow(){
        return this.$store.getters.isDialogOpen;
      },
  },
  mounted() {},
  methods: {
    loginWithApple() {
      this.show_loading_on_apple_login_btn = true;
      window.location.href =
        process.env.API_SERVER_URL +
        "/auth/login/apple?user_type=coach";
    },
    backToLogin(){
      this.$store.dispatch("setActivePopupItem", "loginUsingEmail")
    },
    async login() {
      if (this.$refs.form.validate()) {
        const credentials = {
          email: this.email,
          password: this.password,
          is_remember: this.is_remember
        };

        authApi(this.$axios)
          .login(credentials)
          .then((res) => {
            this.$store.dispatch("putToken", res.data.access_token);
            if (this.$store.getters.isAuthenticated) {
              this.$store.dispatch("setUser", res.data.user);
            }
          })
          .catch((error) => {
            if (
              error.response &&
              error.response.status == constantData.HTTP_UNPROCESSABLE_ENTITY
            ) {
              if (error.response.data.t_key) {
                this.snackbar.text = this.$i18n.t(error.response.data.t_key);
                this.snackbar.show = true;
              } else {
                this.snackbar.text = error.response.data.message;
                this.snackbar.show = true;
              }
            }else{
              this.$toast.error(this.$i18n.t(error.response.data.t_key));
            }
          });
          await this.$auth.loginWith("local", {
            data: credentials
          });
          if (this.$auth.loggedIn) {
            this.$store.dispatch("toggleDialog");
            this.$socket.emit("connected", this.$auth.user.id);
            if (redirectPathService.has()) {
              this.$router.push(this.localePath(redirectPathService.get()));
            } else {
            
              if(this.$auth.user.roles && this.$auth.user.roles[0]){

                this.$store.dispatch("toggleDialog");

                let authUser = this.$auth.user;
                
                this.$store.dispatch("activeBottomNav", 0);

                if(authUser.roles[0].name == "superadmin" || authUser.roles[0].name == "admin" || authUser.roles[0].name == "staff"){
                  this.$router.push(this.localePath(pathData.admin.dashboard));
                }
                else if(authUser.roles[0].name == "coach"){
                  this.$router.push(this.localePath(pathData.coach.home));
                }else if(authUser.roles[0].name == "athlete"){
                  this.$router.push(this.localePath(pathData.athlete.home));
                }
                else{
                  this.$router.push(this.localePath(pathData.pages.home));
                }
              }else{
                this.$store.dispatch("setActivePopupItem", "GetStarted")
              }
            }
          }
      }
      
    },
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
