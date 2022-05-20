<template>

<v-container fluid grid-list-md text-xs-center class="d-flex">
    <v-row
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="6"
        lg="4"
        xs="12"
      >
        <!-- Snackbar -->
        <v-snackbar v-model="snackbar.show" :multi-line="snackbar.multiLine" top>
        {{ snackbar.text }}
        <v-btn color="red" text @click="snackbar.show = false">{{ $t('text_close') }}</v-btn>
        </v-snackbar>
        <!-- Snackbar -->
        <v-row>
            <v-col cols="12">
                <router-link to="/login-with-email"> 
                    <img class="caret-left" :src="require('@/assets/img/svg-icons/carrot-left.svg')" alt=""> 
                </router-link>
            </v-col>
        </v-row>

            <v-row
              align="center"
              justify="center"
            >
              <v-col cols="12" class="align-items-to-center">
                <p class="forgot-password-title">{{ $t('forgot_password_heading_title') }}</p>
              </v-col>
            </v-row>
            <v-row class=" justify-center">
              <v-col cols="12">
                <div >
                  <p class="forgot-password-validation-subtitle">{{$t('pwa_forget_email_title')}}</p>
                </div>
              </v-col>
            </v-row>
            <v-row class="justify-center">
              <v-col cols="12" class="mb-0 pb-0">
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
                    color="primary-light-1"
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { authApi } from "@/api";
import { pathData } from "@/data";

export default {
  layout: "auth",
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
  watch:{
    "$vuetify.breakpoint.smAndUp" : function() {
      this.$store.dispatch("setActivePopupItem", "ForgotPassword");
      this.$store.dispatch("toggleDialog");
    }
  },
  methods: {
    sendEmailBtnHandle() {
      this.loading = true;
      if (this.$refs.form.validate()) {
        this.$store.dispatch("setExistingEmail", this.email);
        let payload = {
          email: this.email
        };
        authApi(this.$axios)
          .passowrdRecovery(payload)
          .then(response => {
            this.$toast.success(response.data.message);
            this.$router.push(this.localePath(pathData.pages.resetOTPValidation));
          })
          .catch(({ response }) => {
            this.$store.dispatch("setExistingEmail", "");
            this.show(response.data.message);
          });
      }
      this.loading = false;
    },
    show(msg) {
      this.snackbar.show = true;
      this.snackbar.text = msg;
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
</style>
