<template>
  <v-container fill-height>
    <v-row justify="center" align="center">
      <v-col cols="12" md="6">
        <v-alert v-if="isSuccess" text prominent type="success">
          <v-row align="center" no-gutters>
            <v-col class="grow">
              {{ message }}
            </v-col>
            <v-spacer></v-spacer>
            <v-col class="shrink">
              <v-btn @click="handleLoginBtnClick()" color="primary-light-1" outlined
                >Login</v-btn
              >
            </v-col>
          </v-row>
        </v-alert>
        <v-alert v-if="isError" text prominent type="error">
          <v-row align="center" no-gutters>
            <v-col class="grow">
              {{ message }}
            </v-col>
            <v-spacer></v-spacer>
            <v-col class="shrink">
              <v-btn
                @click="handleRegisterBtnClick()"
                color="primary-light-1"
                outlined
                >Register</v-btn
              >
            </v-col>
          </v-row>
        </v-alert>
      </v-col>
    </v-row>
    <DialogLoading :show="loading" />
  </v-container>
</template>

<script>
import { pathData } from "@/data";
import DialogLoading from "@/components/loading/DialogLoading";
export default {
  components: {
    DialogLoading
  },
  data() {
    return {
      loading: false,
      message: "",
      isSuccess: false,
      isError: false,
      token: this.$route.query.token || ""
    };
  },
  methods: {
    handleLoginBtnClick() {
      this.$router.push(this.localePath(pathData.pages.login));
    },
    handleRegisterBtnClick() {
      this.$router.push(this.localePath(pathData.pages.register));
    },
  },
  mounted() {
    this.loading = true;
    this.$axios
      .put("/auth/emailVerification", {
        token: this.token
      })
      .then(() => {
        this.isSuccess = true;
        this.message =
          "Your account is verified successfully. You can login now.";
      })
      .catch(error => {
        this.isError = true;
        this.message = error.response.data.message;
      })
      .finally(() => {
        this.loading = false;
      });
  }
};
</script>
