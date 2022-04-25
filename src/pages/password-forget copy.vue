<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <div class="title">{{ $t("forgot_password_heading_title") }}</div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <div>{{ $t("forgot_password_desc") }}</div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-form ref="form" v-model="valid" :lazy-validation="false">
          <v-text-field
            v-model="email"
            autocomplete="off"
            :label="$t('forgot_password_hint_email_add')"
            :rules="emailRules"
            solo
          ></v-text-field>
        </v-form>
        <v-btn
          dark
          :loading="loading"
          color="primary-light-1"
          large
          class="mt-md-3"
          @click="sendEmailBtnHandle()"
          >{{ $t("btn_label_send") }}</v-btn
        >
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="6">
        {{ $t("forgot_pass_ques") }}
        <br />
        {{ $t("forgot_password_info") }}
      </v-col>
    </v-row>

    <!-- Snackbar -->
    <v-snackbar top v-model="snackbar.show" :multi-line="snackbar.multiLine">
      {{ snackbar.text }}
      <v-btn color="red" text @click="snackbar.show = false">Close</v-btn>
    </v-snackbar>
    <!-- Snackbar -->
  </v-container>
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
      loading: false,
      email: "",
      emailRules: [
        v => !!v || this.$i18n.t("valid_required_email"),
        v => /.+@.+/.test(v) || this.$i18n.t("valid_valid_email")
      ]
    };
  },
  methods: {
    sendEmailBtnHandle() {
      if (this.$refs.form.validate()) {
        let payload = {
          email: this.email
        };
        this.loading = true;
        authApi(this.$axios)
          .passowrdRecovery(payload)
          .then(response => {
            this.show(response.data.message);
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
