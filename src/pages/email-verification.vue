<template>
  <v-container>
    <v-row justify="center">
      <div v-if="showRegisterBtn">
        Your account is not verified. Please
        <v-btn small color="primary-light-1" :to="regBtnUrl" text
          >register</v-btn
        >again.
      </div>
    </v-row>
  </v-container>
</template>

<script>
import { pathData } from "@/data";
export default {
  data() {
    return {
      token: this.$route.query.token || "",
      showRegisterBtn: false,
      regBtnUrl: "",
      isVerified: false
    };
  },
  methods: {},
  created() {
    this.regBtnUrl = pathData.pages.register;
    this.$axios
      .put("/auth/emailVerification", {
        token: this.token
      })
      .then(response => {
        if (response.data.status == "success") {
          this.$toast.success(
            "Your account is verified successfully. You can login now."
          );
          this.$router.push(pathData.pages.login);
        }
      })
      .catch(error => {
        this.showLoading = true;
        this.showRegisterBtn = true;
        this.$toast.error(error.response.data.message);
      });
  }
};
</script>
