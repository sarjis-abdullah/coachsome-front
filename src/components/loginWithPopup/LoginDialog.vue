<template>
    <v-dialog
      v-model="dialogShow"
      persistent
      transition="dialog-bottom-transition"
      @click:outside="hideDialog"
      max-width="500px"
      height="100%"
    >
    <v-card class="login-dialog">
    <v-container fluid grid-list-md no-gutter text-xs-center class="d-flex">
        <v-row
            justify="center"
        >
          <v-col
              cols="11"
              v-if="!ActiveItem.GetStarted"
          >
              <div v-if="ActiveItem.loginScreen">
                  <LoginScreen @hide-dialog="hideDialog"/>
              </div>
              <div v-else-if="ActiveItem.loginUsingEmail">
                  <LoginWithEmail @hide-dialog="hideDialog" />
              </div>
              <div v-else-if="ActiveItem.postLoginUsingEmail">
                  <PostLoginWithEmail @hide-dialog="hideDialog" />
              </div>
              <div v-else-if="ActiveItem.OTPValidation">
                  <OTPValidation @hide-dialog="hideDialog" />
              </div>
              <div v-else-if="ActiveItem.Register">
                  <Register @hide-dialog="hideDialog" />
              </div>
              <div v-else-if="ActiveItem.ForgotPassword">
                  <ForgotPassword @hide-dialog="hideDialog" />
              </div>
              <div v-else-if="ActiveItem.PasswordReset">
                  <PasswordReset @hide-dialog="hideDialog" />
              </div>
              <div v-else-if="ActiveItem.ResetOTPValidation">
                  <ResetOTPValidation @hide-dialog="hideDialog" />
              </div>
          </v-col>
         <v-col
              cols="12"
              v-else
          >
              <div v-if="ActiveItem.GetStarted">
                  <GetStarted/>
              </div>
          </v-col>
        </v-row>
    </v-container>
    </v-card>
    </v-dialog>
</template>
<script>
import LoginScreen from '@/components/loginWithPopup/LoginScreen'
import LoginWithEmail from '@/components/loginWithPopup/LoginWithEmail'
import PostLoginWithEmail from '@/components/loginWithPopup/PostLoginWithEmail'
import OTPValidation from '@/components/loginWithPopup/OTPValidation'
import Register from '@/components/loginWithPopup/Register'
import GetStarted from '@/components/loginWithPopup/GetStarted'
import ForgotPassword from '@/components/loginWithPopup/ForgotPassword'
import PasswordReset from '@/components/loginWithPopup/PasswordReset'
import ResetOTPValidation from '@/components/loginWithPopup/ResetOTPValidation'
export default({
    components: {
      LoginScreen,
      LoginWithEmail,
      PostLoginWithEmail,
      OTPValidation,
      Register,
      GetStarted,
      ForgotPassword,
      PasswordReset,
      ResetOTPValidation

    },
    data () {
      return{
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
    computed: {
        dialogShow(){
            return this.$store.getters.isDialogOpen;
        },
        ActiveItem(){
            return this.$store.getters.activeLoginItem;
        },
        opacityValue(){
            if(this.$vuetify.breakpoint.mdAndDown){
                return 1;
            }else{
                return 0.5
            }
        }
    },
   
    mounted() {
        if (this.$route.query.status) {
            if (this.$route.query.status == "error") {
                if (this.$route.query.message_key) {
                this.$toast.error(this.$i18n.t(this.$route.query.message_key));
                }
            }
        }
    },
    methods : {
        hideDialog(){
            this.$store.dispatch("toggleDialog");
        },
        
    }

})
</script>

<style scoped lang="scss">
    .login-dialog{
        background: #F7FAFC;
        border-radius: 20px;
    }
</style>