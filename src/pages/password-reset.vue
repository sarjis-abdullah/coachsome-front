<template>
  <v-container>
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

        <v-row class="justify-center pt-5">
            <v-col cols="12">
              <p class="login-title">{{$t("pwa_reset_title")}}</p>
              <v-divider></v-divider>
            </v-col>
        </v-row>

        <v-row
          align="center"
          justify="center"
          class="mt-5"
        >
          <v-col cols="12">
            <p class="login-password-label mt-2">{{$t("setting_label_new_password")}}</p>
            <v-text-field
              outlined
              dense
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              color="red"
              :label="$t('password_reset_title')"
              @click:append="show1 = !show1"
              id="password"
              class="cs-input-text-field-login"
              :rules="passwordRules"
              required
              style="color:#15577C"
              @keyup.enter="passwordResetBtnHandle"
            />
            <p class="login-password-label">{{$t("pwa_confirm_new_password")}}</p>
            <v-text-field
              outlined
              dense
              v-model="rePassword"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show2 ? 'text' : 'password'"
              name="input-10-1"
              color="red"
              :label="$t('pwa_confirm_new_password_hint')"
              @click:append="show2 = !show2"
              id="rePassword"
              class="cs-input-text-field-login"
              :rules="[passwordConfirmationRule]"
              required
              style="color:#15577C"
              @keyup.enter="passwordResetBtnHandle"
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
                align="center"
                justify="space-around"
                color="#EDB041"
                class="white--text continue-with-email-btn"
                :loading="show_loading_on_reset_btn"
                block
                @click="passwordResetBtnHandle()"
            >
                {{$t("pwa_change_password")}}
            </v-btn>
            </v-form>
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
      show1: false,
      show2: false,
      loading: null,
      show_loading_on_reset_btn: false,
      snackbar: {
        multiLine: true,
        show: false,
        text: ""
      },
      email: this.$store.getters.existingUserEmail || "",
      valid: true,
      password: "",
      rePassword: "",
      passwordRules: [
        v => !!v || "Password is required",
        v => /^(?=.*[A-Z]).*$/.test(v) || "At least one upper case letter.",
        v => (v && v.length >= 6) || "Password must be minimum 6 characters"
      ],
      reEnterPasswordRules: [
        v => !!v || "Password is required",
        v => /^(?=.*[A-Z]).*$/.test(v) || "At least one upper case letter.",
        v => (v && v.length >= 6) || "Password must be minimum 6 characters",
        v => (v && v.length >= 6) || "Password must be minimum 6 characters"
      ]
    };
  },
  watch:{
    "$vuetify.breakpoint.smAndUp" : function() {
      this.$store.dispatch("setActivePopupItem", "PasswordReset");
      this.$store.dispatch("toggleDialog");
    }
  },
  computed: {
    passwordConfirmationRule() {
      return () => this.password === this.rePassword || "Password does not match";
    }
  },
    methods: {
    passwordResetBtnHandle() {
      if (this.$refs.form.validate()) {
        this.show_loading_on_reset_btn = true;
        let payload = {
          email: this.email,
          password: this.password
        };
        this.$store.dispatch("setExistingEmail", this.email);
        authApi(this.$axios)
          .passwordReset(payload)
          .then((response) => {
            this.$toast.success(response.data.message);
            this.show_loading_on_reset_btn = false;
            this.$router.push(this.localePath(pathData.pages.postEmailLogin));
          })
          .catch(({ response }) => {
            if (response.data.message) {
              this.$toast.error(response.data.message);
            }
            this.show_loading_on_reset_btn = false;
          });
      }
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
