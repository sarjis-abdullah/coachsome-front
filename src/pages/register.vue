<template>
  <div class="register-page">
    <v-container
      class="py-0 my-0"
      fill-height
      fluid
      :style="{ height: 100 + '%' }"
    >
      <v-row
        justify="center"
        class="py-0 my-0"
        align="center"
        :style="{ height: 100 + '%' }"
      >
        <v-col
          cols="12"
          md="5"
          color="primary"
          class="py-0 my-0"
          :style="{ height: 100 + '%' }"
        >
          <v-card class="primary my-0 py-0" tile height="100%">
            <v-card-text>
              <!-- Logo -->
              <v-row>
                <v-col md="12" class="text-center">
                  <nuxt-link text :to="localePath('/')">
                    <img
                      :src="require('@/assets/images/logo.svg')"
                      alt="logo"
                    />
                  </nuxt-link>
                </v-col>
              </v-row>

              <v-row justify="center" class="mt-md-10">
                <v-col cols="11" md="11">
                  <!-- Join coachsome -->
                  <v-row justify="center">
                    <v-col cols="12" md="12">
                      <div class="user-type">
                        <div class="user-type__title mb-2">
                          {{ $t("register_user_type_title_join_coachsome") }}
                        </div>
                        <div class="user-type__body">
                          <v-item-group v-model="tab.value">
                            <v-row>
                              <v-item
                                v-for="(item, index) in tab.items"
                                :key="index"
                                v-slot="{ active }"
                              >
                                <v-col cols="12" md="6">
                                  <v-card
                                    :color="
                                      active ? 'primary-light-1' : 'white'
                                    "
                                    class="d-flex justify-center  align-center"
                                    height="50"
                                    @click="handleOnTabClick(index)"
                                  >
                                    {{ $t(item.t_key) }}
                                  </v-card>
                                </v-col>
                              </v-item>
                            </v-row>
                          </v-item-group>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-form ref="form" v-model="form.valid">
                        <!-- Facebook -->
                        <v-row>
                          <v-col cols="12">
                            <v-btn
                              block
                              color="#1877F2"
                              class="white--text"
                              @click="registerWithFacebook()"
                            >
                              <v-icon class="mr-2"
                                >$vuetify.icons.$myFacebookIcon</v-icon
                              >
                              {{ $t("reg_btn_label_join_with_fb") }}
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
                              @click="registerWithGoogle()"
                            >
                              <v-icon color="white" class="mr-2"
                                >$vuetify.icons.$myGoogleIcon</v-icon
                              >
                              {{ $t("reg_btn_label_join_with_google") }}
                            </v-btn>
                          </v-col>
                        </v-row>

                        <!-- Or -->
                        <v-row class="mb-4">
                          <v-col cols="12">
                            <div class="or-text">
                              {{ $t("resigter_text_or") }}
                            </div>
                          </v-col>
                        </v-row>

                        <v-text-field
                          v-model="form.first_name"
                          :rules="rule.first_name"
                          :label="$t('reg_hint_first_name')"
                          solo
                          dense
                        ></v-text-field>
                        <v-text-field
                          v-model="form.last_name"
                          :rules="rule.last_name"
                          :label="$t('reg_hint_last_name')"
                          solo
                          dense
                        ></v-text-field>

                        <!-- Email -->
                        <v-text-field
                          v-model="form.email"
                          :type="'email'"
                          :rules="rule.email"
                          :label="$t('reg_hint_email')"
                          solo
                          dense
                        ></v-text-field>

                        <!-- Password -->
                        <v-text-field
                          v-model="form.password"
                          :rules="rule.password"
                          :type="'password'"
                          :label="$t('reg_hint_password')"
                          solo
                          dense
                        ></v-text-field>

                        <!-- Join with email -->
                        <v-row>
                          <v-col>
                            <v-btn
                              @click="register()"
                              :loading="loading"
                              block
                              color="downy"
                              class="_util-text-transform-none"
                              >{{
                                $t("regiser_btn_label_join_with_email")
                              }}</v-btn
                            >
                          </v-col>
                        </v-row>

                        <!-- terms -->
                        <v-row justify="center">
                          <v-col>
                            <div class="terms" color="white" dark>
                              <span
                                v-html="$t('reg_label_terms_conditions')"
                              ></span>
                            </div>
                          </v-col>
                        </v-row>
                      </v-form>
                      <!-- ./Form -->
                    </v-col>
                  </v-row>

                  <!-- Existing acount -->
                  <v-row>
                    <v-col cols="12" class="text-center">
                      <div
                        class="existing-account"
                        @click.stop="existingAccHandler"
                      >
                        {{ $t("register_btn_label_existing_account") }}
                      </div>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { pathData } from "@/data";
import { authApi } from "@/api";
export default {
  layout: "auth",
  head() {
    return {
      title: this.$i18n.t("header_title_tag_front_register"),
      titleTemplate: "%s"
    };
  },
  data: () => ({
    loading: false,
    tab: {
      value: 0,
      items: [
        {
          text: "I’m an Athlete",
          t_key: "register_tab_athlete",
          key: "athlete"
        },
        {
          text: "I’m a Coach",
          t_key: "register_tab_coach",
          key: "coach"
        }
      ]
    },
    form: {
      valid: true,
      user_type: "coach",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      agree_to_terms: true
    },
    rule: {
      first_name: [],
      last_name: [],
      email: [],
      password: []
    }
  }),
  watch: {
    "tab.value": {
      handler: function(val) {
        this.form.user_type = this.tab.items[val].key;
      },
      immediate: true
    }
  },
  created() {
    this.rule.first_name = [
      v => !!v || this.$i18n.t("valid_required_first_name"),
      v =>
        /^([A-Za-zæøåÆØÅ]\s*)+$/.test(v) ||
        this.$i18n.t("valid_first_name_only_letter")
    ];
    this.rule.last_name = [
      v => !!v || this.$i18n.t("valid_required_last_name"),
      v =>
        /^([A-Za-zæøåÆØÅ]\s*)+$/.test(v) ||
        this.$i18n.t("valid_last_name_only_letter")
    ];
    this.rule.email = [
      v => !!v || this.$i18n.t("valid_required_email"),
      v => /.+@.+\..+/.test(v) || this.$i18n.t("valid_valid_email")
    ];
    this.rule.password = [
      v => !!v || this.$i18n.t("valid_pass_required"),
      v =>
        /^(?=.*[A-Z]).*$/.test(v) ||
        this.$i18n.t("valid_at_least_one_upper_case_letter"),
      v => (v && v.length >= 6) || this.$i18n.t("valid_pass_min_character")
    ];
  },
  mounted() {
    if (this.$route.query.user_type) {
      if (this.$route.query.user_type == "athlete") {
        this.tab.value = 0;
      }
      if (this.$route.query.user_type == "coach") {
        this.tab.value = 1;
      }
    }
  },
  methods: {
    handleOnTabClick(index) {
      this.tab.value = index;
    },
    existingAccHandler() {
      this.$router.push(pathData.pages.login);
    },
    async register() {
      let payload = {
        first_name: this.form.first_name,
        last_name: this.form.last_name,
        email: this.form.email,
        password: this.form.password,
        user_type: this.form.user_type,
        agree_to_terms: this.form.agree_to_terms,
        lang: this.$i18n.locale
      };

      if (this.$refs.form.validate()) {
        this.loading = true;
        try {
          await authApi(this.$axios).register(payload);
          this.$router.push(pathData.pages.afterRegister);
        } catch (error) {
          this.$toast.error(error.response.data.message);
        } finally{
          this.loading = false;
        }
      }
    },
    registerWithFacebook() {
      window.location.href =
        process.env.API_SERVER_URL +
        "/auth/login/facebook?user_type=" +
        this.form.user_type;
    },
    registerWithGoogle() {
      window.location.href =
        process.env.API_SERVER_URL +
        "/auth/login/google?user_type=" +
        this.form.user_type;
    }
  }
};
</script>
<style lang="scss" scoped>
.register-page {
  height: 100%;
  .card-text {
    color: #fcfdfe;
    font-size: 12px;
  }

  .c-title {
    font-family: $font-family;
    font-style: normal;
    font-weight: normal;
  }

  .mb-fixed {
    margin-bottom: 50%;
  }

  .v-input input {
    font-family: $font-family;
    max-height: 60px !important;
    height: 42px !important;
    background: #f7fafc;
    border-radius: 5px;
    font-style: normal;
    font-weight: normal;
  }

  .user-type {
    &__title {
      font-family: $font-family;
      font-weight: 600;
      font-size: 16px;
      line-height: 22px;
      text-transform: uppercase;
      color: #f4f4f4;
    }
    &__body {
      .user-type-active {
        background: $primary-light-1;
        font-family: $font-family;
      }
    }
  }

  .existing-account {
    font-family: $font-family;
    font-size: 14px;
    line-height: 19px;
    color: #f7fafc;
    text-align: center;
    text-decoration-line: underline;
    cursor: pointer;
  }

  .or-text {
    font-family: $font-family;
    font-size: 14px;
    text-align: center;
    color: #9faec2;
  }
  .terms {
    font-family: $font-family;
    font-size: 12px;
    line-height: 16px;
    color: #9faec2;
  }
}
</style>
