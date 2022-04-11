<template>
  <div>
    <!-- Snackbar -->
    <v-snackbar v-model="snackbar.show" :multi-line="snackbar.multiLine" top>
    {{ snackbar.text }}
    <v-btn color="red" text @click="snackbar.show = false">{{ $t('text_close') }}</v-btn>
    </v-snackbar>
    <!-- Snackbar -->
    <v-row>
        <v-col cols="12">
            <div class="d-flex justify-space-between">
              <v-btn
                  icon
                  color="#15577C"
                  @click="backToEmailLogin()"
              >
                  <v-icon  x-large>mdi-chevron-left</v-icon>
              </v-btn>
              <p class="forgot-password-title">{{ $t('forgot_password_heading_title') }}</p>
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

    <!-- <div class="cs-forgot-password-sec">
      <div class="cs-forgot-password-middle"> -->
        <v-row
          align="center"
          justify="center"
        >
          <!-- <v-col cols="12" class="align-items-to-center">
            <p class="forgot-password-title">{{ $t('forgot_password_heading_title') }}</p>
          </v-col> -->
        </v-row>
        <v-row class=" justify-center">
          <v-col cols="12">
            <div >
              <p class="forgot-password-validation-subtitle">{{$t("pwa_forget_email_title")}}</p>
            </div>
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-col cols="12">
            <v-form ref="form" v-model="valid" :lazy-validation="false">
                <v-text-field
                    outlined
                    dense
                    style="color:#15577C"
                    class="cs-input-text-field-login"
                    v-model="email"
                    autocomplete="off"
                    :label="$t('forgot_password_hint_email_add')"
                    :rules="emailRules"
                ></v-text-field>
            </v-form>
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-col cols="12">
            <v-btn
                dark
                :loading="loading"
                :disabled="loading"
                color="#EDB041"
                large
                block
                class="mt-md-3"
                @click="sendEmailBtnHandle()"
            >{{ $t('btn_label_send') }}</v-btn>
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-col cols="12">
              <p class="forgot-password-footer-text">{{ $t('forgot_pass_ques') }} {{ $t('forgot_password_info') }}</p>
          </v-col>
        </v-row>
        
      <!-- </div>
    </div> -->
  </div>
</template>

<script>
import { authApi } from "@/api";

export default {
  data() {
    return {
      snackbar: {
        multiLine: true,
        show: false,
        text: ""
      },
      valid: true,
      isShowSendBtn: false,
      loading: null,
      email: "",
      emailRules: [
        v => !!v || this.$i18n.t("valid_required_email"),
        v => /.+@.+/.test(v) || this.$i18n.t("valid_valid_email")
      ]
    };
  },
  methods: {
    backToEmailLogin(){
      this.$store.dispatch("setActivePopupItem", "loginUsingEmail")
    },
    sendEmailBtnHandle() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("setExistingEmail", this.email);
        let payload = {
          email: this.email
        };
        authApi(this.$axios)
          .passowrdRecovery(payload)
          .then(response => {
            this.$toast.success(response.data.message);
            this.$store.dispatch("setActivePopupItem", "ResetOTPValidation");
          })
          .catch(({ response }) => {
            this.$store.dispatch("setExistingEmail", "");
            this.$toast.error(response.data.message);
          });
      }
    }
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
.cs-forgot-password-sec{
  height: calc(100vh - 248px);
  position: relative;
  min-height: 280px;
}
.cs-forgot-password-middle {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.cs-forgot-password-footer {
  height: 100px;
}

.align-items-to-center{
  display: flex;
  justify-content: center;
  align-items: center;
}

.forgot-password-title{
    font-family: Open Sans;
    font-style: normal;
    font-weight: 800;
    font-size: 25px;
    line-height: 34px;
    display: flex;
    align-items: center;
    text-align: center;

    color: #15577C;
}

.forgot-password-validation-subtitle{
    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    display: flex;
    align-items: center;
    text-align: center;

    color: #15577C;
}

.forgot-password-footer-text{
    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 14px;
    display: flex;
    align-items: center;
    text-align: center;

    color: #15577C;
}
.v-divider {
    border-color: #15577C !important; 
}
</style>
