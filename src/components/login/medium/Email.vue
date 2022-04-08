<template>
    <div>
      <!-- Snackbar  pwa -->
        <v-snackbar
          v-model="snackbar.show"
          top
          :multi-line="snackbar.multiLine"
        >
          {{ snackbar.text }}
          <template v-slot:action="{ attrs }">
            <v-btn
              color="red"
              text
              v-bind="attrs"
              @click="snackbar.show = false"
            >
              {{$t("pwa_close")}}
            </v-btn>
          </template>
        </v-snackbar>
      <!-- ./Snackbar pwa -->

        <v-row class="pt-5">
            <v-col cols="12" class="justify-center">
                <router-link class="pt-1" style="float:left"  :to="{}" @click.native="backToEmailLogin()" v-if="dialogShow"> 
                    <img class="caret-left" :src="require('@/assets/img/svg-icons/carrot-left.svg')" alt=""> 
                </router-link>
                <router-link to="/login-with-email" class="pt-1" style="float:left" v-else> 
                    <img class="caret-left" :src="require('@/assets/img/svg-icons/carrot-left.svg')" alt=""> 
                </router-link>
               
              <p class="login-title">{{ $t("pwa_welcome_back") }}</p>
               <v-divider></v-divider>
            </v-col>
        </v-row>
        
            <v-row
              align="center"
              justify="center"
            >
              <v-col cols="12" class="pb-0 mb-0">
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
            </v-row>

             <v-row class="justify-center">
              <v-col cols="12" class="mb-0 pb-0">
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
            </v-row>
            <v-row class=" justify-center pt-2">
              <v-col cols="12">
                <div>
                  <router-link :to="forgotPassword_link" v-if="$vuetify.breakpoint.smAndDown"><p class="login-footer-text">{{$t("forgot_password_heading_title")}}</p></router-link>
                  <router-link :to="{}" @click.native="forgotPassword()" v-else><p class="login-footer-text">{{$t("forgot_password_heading_title")}}</p></router-link>
                </div>
              </v-col>
            </v-row>  

    </div>
</template>
<script>
import { authApi } from "@/api";
import { roleHelper } from "@/helper";
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
      forgotPassword_link: this.localePath(pathData.pages.forgotPassword)
    };
  },
  computed: {
     dialogShow(){
      return this.$store.getters.isDialogOpen;
    },
    style() {
      return `
      .v-overlay__scrim {
          opacity: 0!important;
          background-color: none!important;
      }
      `
    },
  },
   
  mounted() {},
  methods: {
    forgotPassword(){
      this.$store.dispatch("setActivePopupItem", "ForgotPassword")
    },
    applyStyle(styleDef) {
      let styleElement = document.createElement('style')
      styleElement.type = 'text/css'
      document.head.appendChild(styleElement)
      styleElement.innerHTML = styleDef
      return styleElement
    },
    backToEmailLogin(){
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

                if(authUser.roles[0].name == "superadmin" || authUser.roles[0].name == "admin" || authUser.roles[0].name == "staff"){
                  this.$router.push(this.localePath(pathData.admin.dashboard));
                }else if(authUser.roles[0].name == "coach"){
                  this.$router.push(this.localePath(pathData.coach.home));
                }else if(authUser.roles[0].name == "athlete"){
                  this.$router.push(this.localePath(pathData.athlete.home));
                }else{
                  this.$router.push(this.localePath(pathData.pages.home));
                }
              }else{
                this.$store.dispatch("setActivePopupItem", "GetStarted")
              }
            }
          }
      }
      
    },
    handleNotMemberBtnClick() {
      this.$router.push(this.localePath(pathData.pages.register));
    },
  }
};
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
.login-password-label{
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
.continue-with-email-btn{
  background: #EDB041;
  border-radius: 6px;
  width: 100%;
  text-transform: none !important;
}

.v-text-field--outlined >>> fieldset {
  border-color: #15577C;
}
.v-label {
  color: red!important;
}

</style>
