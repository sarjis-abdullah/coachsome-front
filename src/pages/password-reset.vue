<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="4">
        <v-card elevation="0">
          <v-card-title>Reset your password</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" :lazy-validation="false">
              <v-text-field
                solo
                dense
                :rules="passwordRules"
                v-model="password"
                autocomplete="off"
                type="password"
                :label="'New password'"
              ></v-text-field>
              <v-text-field
                solo
                dense
                :rules="[passwordConfirmationRule]"
                v-model="rePassword"
                autocomplete="off"
                type="password"
                :label="'Re-enter your new password'"
              ></v-text-field>
            </v-form>
            <v-btn
              :loading="loading"
              outlined
              depressed
              type="submit"
              color="primary-light-1"
              block
              dark
              @click="passwordResetBtnHandle()"
              >Change Password</v-btn
            >
          </v-card-text>
          <v-card-actions></v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" v-if="isPasswordReset">
      <v-col cols="12" md="4" class="text-center">
        <v-btn
          color="primary-light-1"
          dark
          large
          depressed
          class="mt-md-3"
          @click="loginBtnHandle"
          >{{ $t("btn_label_go_to_login") }}</v-btn
        >
      </v-col>
    </v-row>

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar.show" :multi-line="snackbar.multiLine" top>
      {{ snackbar.text }}
      <v-btn color="red" text @click="snackbar.show = false">{{
        $t("text_close")
      }}</v-btn>
    </v-snackbar>
    <!-- Snackbar -->
  </v-container>
</template>

<script>
import { authApi } from "@/api";
import { pathData } from "@/data";

export default {
  data() {
    return {
      uri: {
        login: pathData.pages.login
      },
      loading: false,
      isPasswordReset: false,
      snackbar: {
        multiLine: true,
        show: false,
        text: ""
      },
      email: this.$route.query.email || "",
      token: this.$route.query.token || "",
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
  computed: {
    passwordConfirmationRule() {
      return () => this.password === this.rePassword || "Password must match";
    }
  },
  methods: {
    loginBtnHandle() {
      this.$router.push(this.localePath(pathData.pages.login));
    },
    passwordResetBtnHandle() {
      if (this.$refs.form.validate()) {
        let payload = {
          email: this.email,
          token: this.token,
          password: this.password
        };
        this.loading = true;
        authApi(this.$axios)
          .passwordReset(payload)
          .then(() => {
            this.$toast.success("Successfully reset your password.");
            this.isPasswordReset = true;
          })
          .catch(({ response }) => {
            if (response.data.message) {
              this.show(response.data.message);
            }
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    show(msg) {
      this.snackbar.show = true;
      this.snackbar.text = msg;
    }
  }
};
</script>

<style lang="scss" scoped></style>
