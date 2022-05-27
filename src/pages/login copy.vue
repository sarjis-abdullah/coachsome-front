<template>
  <v-container class="login-page" fluid :style="{ height: 100 + '%' }">
    <v-row :style="{ height: 100 + '%' }">
      <v-col
        cols="12"
        md="5"
        lg="4"
        class="pa-0 ma-0 primary"
        :style="{ height: 100 + '%' }"
      >
        <!-- Card -->
        <v-card class="primary pa-5" tile height="100vh">
          <!-- Logo -->
          <v-row>
            <v-col cols="12" class="text-center">
              <NuxtLink :to="localePath('/home')">
                <img :src="require('@/assets/images/logo.svg')" alt="logo" />
              </NuxtLink>
            </v-col>
          </v-row>

          <!-- Form -->
          <v-row class="pa-7">
            <v-col>
              <v-row>
                <v-col>
                  <div class="c-title subtitle-1 white--text text-uppercase">
                    {{ $t("login_page_title_login") }}
                  </div>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-form ref="form" v-model="valid">
                    <!-- Email -->
                    <v-text-field
                      v-model="email"
                      :type="'email'"
                      :rules="email_rules"
                      :label="$t('login_label_user_name')"
                      solo
                      dense
                    ></v-text-field>

                    <!-- Password -->
                    <v-text-field
                      v-model="password"
                      :rules="password_rules"
                      :type="'password'"
                      :label="$t('login_label_password')"
                      solo
                      dense
                    ></v-text-field>

                    <!-- Remember Checkbox -->
                    <div class="d-flex align-center justify-space-between">
                      <v-checkbox
                        v-model="is_remember"
                        class="_font-primary-style"
                        color="white"
                        :label="$t('log_in_text_remember_me')"
                        dark
                      ></v-checkbox>
                      <a
                        class="forget-password__element _font-primary-style"
                        @click.prevent="forgetPasswordBtnHandle"
                        >{{ $t("login_text_forgot_pass") }}</a
                      >
                    </div>

                    <!-- Create with email -->
                    <v-row class="my-2">
                      <v-col>
                        <v-btn
                          @click="login()"
                          block
                          color="downy"
                          class="_util-text-transform-none"
                          >{{ $t("nav_item_login") }}</v-btn
                        >
                      </v-col>
                    </v-row>

                    <!-- Or -->
                    <v-row>
                      <v-col cols="12">
                        <div class="or-text">{{ $t("resigter_text_or") }}</div>
                      </v-col>
                    </v-row>

                    <!-- Facebook -->
                    <v-row>
                      <v-col cols="12">
                        <v-btn
                          block
                          color="#1877F2"
                          class="white--text"
                          @click="loginWithFacebook()"
                        >
                          <v-icon class="mr-2"
                            >$vuetify.icons.$myFacebookIcon</v-icon
                          >
                          {{ $t("text_login_with") }}
                        </v-btn>
                      </v-col>
                    </v-row>

                    <!-- Google -->
                    <v-row>
                      <v-col cols="12">
                        <v-btn
                          block
                          color="#F7FAFC"
                          light
                          @click="loginWithGoogle()"
                        >
                          <v-icon color="white" class="mr-2"
                            >$vuetify.icons.$myGoogleIcon</v-icon
                          >
                          {{ $t("text_login_with") }}
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                  <!-- ./Form -->
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <!-- Not a member yet -->
          <v-row>
            <v-col cols="12" class="text-center">
              <div class="not-member" @click.stop="handleNotMemberBtnClick">
                {{ $t("login_txt_not_member_yet") }}
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col md="7" lg="8" sm="12" class="pa-0 ma-0">
        <img
          style="object-fit:cover;height:100vh;width:100%;"
          class="d-none d-md-flex"
          :src="require('@/assets/images/login/aside.jpg')"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { pathData } from "@/data";
import { redirectPathService } from "@/services";

export default {
  layout: "auth",
  head() {
    return {
      title: this.$i18n.t("header_title_tag_front_login"),
      titleTemplate: "%s"
    };
  },
  data: () => ({
    snackbar: {
      multiLine: true,
      show: false,
      text: ""
    },
    valid: true,
    loading: false,
    email: "",
    email_rules: [],
    password: "",
    password_rules: [],
    is_remember: false
  }),
  created() {
    this.email_rules = [
      v => !!v || this.$i18n.t("valid_required_email"),
      v => /.+@.+\..+/.test(v) || this.$i18n.t("valid_valid_email")
    ];
    this.password_rules = [v => !!v || this.$i18n.t("valid_pass_required")];
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
  methods: {
    async login() {
      if (this.$refs.form.validate()) {
        const credentials = {
          email: this.email,
          password: this.password,
          is_remember: this.is_remember
        };
        try {
          await this.$auth.loginWith("local", {
            data: credentials
          });

          if (this.$auth.loggedIn) {
            this.$socket.emit("connected", this.$auth.user.id);

            // if there has any redirect path
            if (redirectPathService.has()) {
              this.$router.push(this.localePath(redirectPathService.get()));
            } else {
              if (this.$auth.hasRole(["coach"])) {
                this.$router.push(this.localePath(pathData.coach.editProfile));
              } else if (this.$auth.hasRole(["athlete"])) {
                this.$router.push(
                  this.localePath(pathData.athlete.editProfile)
                );
              } else {
                this.$router.push(this.localePath(pathData.admin.dashboard));
              }
            }
          }
        } catch (error) {
          if (error.response.data.t_key) {
            this.$toast.error(this.$i18n.t(error.response.data.t_key));
          } else {
            this.$toast.error(error.response.data.message);
          }
        }
      }
    },
    handleNotMemberBtnClick() {
      this.$router.push(this.localePath(pathData.pages.register));
    },
    loginWithFacebook() {
      window.location.href =
        process.env.API_SERVER_URL + "/auth/login/facebook?user_type=coach";
    },
    loginWithGoogle() {
      window.location.href =
        process.env.API_SERVER_URL + "/auth/login/google?user_type=coach";
    },
    forgetPasswordBtnHandle() {
      this.$router.push(pathData.pages.forgotPassword);
    }
  }
};
</script>
<style lang="scss" scoped>
.login-page {
  .not-member {
    font-family: $font-family;
    font-size: 14px;
    line-height: 19px;
    color: #f7fafc;
    text-align: center;
    text-decoration-line: underline;
    cursor: pointer;
  }
  .theme--light.v-application {
    background-color: transparent;
  }

  .aside-image > .v-image__image--cover {
    background-size: initial !important;
  }

  .card-text {
    color: #fcfdfe;
    font-size: 12px;
  }

  .mb-fixed {
    margin-bottom: 20%;
  }

  .forget-password__element {
    font-size: 14px;
    color: #6f8098 !important;
    text-decoration: none;
  }

  .or-text {
    font-family: $font-family;
    font-size: 14px;
    text-align: center;
    color: #9faec2;
  }
}
</style>
