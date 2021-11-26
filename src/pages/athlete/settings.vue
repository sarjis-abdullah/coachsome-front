<template>
  <div class="setting-page--athlete">
    <v-container>
      <v-row>
        <v-col>
          <v-row>
            <v-col cols="12" class="pb-0">
              <div class="page-title">{{ $t("setting_page_title") }}</div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-tabs
                v-model="tab"
                background-color="transparent"
                color="primary-light-1"
              >
                <v-tab class="text-normal">Account</v-tab>
                <v-tab class="text-normal">Notifications</v-tab>
                <v-tab class="text-normal">Security</v-tab>
              </v-tabs>
              <div class="line"></div>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col cols="12" md="8">
              <v-tabs-items v-model="tab">
                <v-tab-item>
                  <v-card flat class="body-bg">
                    <v-card-text>
                      <!-- Email -->
                      <v-row>
                        <v-col cols="12" md="4">
                          <div class="section-title pb-2">
                            {{ $t("setting_sec_email_title") }}
                          </div>
                          <div class="section-description">
                            {{ $t("setting_sec_email_desc") }}
                          </div>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field
                            readonly
                            v-model="form.email"
                            dense
                            solo
                            @click="emailClickHandler"
                            label="lorem@ipsum.dk"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row v-if="emailReset.dialog">
                        <v-col>
                          <v-dialog
                            v-model="emailReset.dialog"
                            persistent
                            max-width="400"
                          >
                            <v-card>
                              <v-card-title class="headline"
                                >Email</v-card-title
                              >
                              <v-card-text>
                                <v-row>
                                  <v-col cols="12">
                                    <v-text-field
                                      v-model="emailReset.email"
                                      dense
                                      hide-details
                                      solo
                                      label="Enter your new email"
                                    ></v-text-field>
                                  </v-col>
                                </v-row>
                                <v-row>
                                  <v-col cols="12">
                                    <v-text-field
                                      v-model="emailReset.password"
                                      :rules="rule.password"
                                      dense
                                      solo
                                      type="password"
                                      label="Enter your current password"
                                    ></v-text-field>
                                  </v-col>
                                </v-row>
                              </v-card-text>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                  color="primary-light-1"
                                  text
                                  @click="emailResetCancelHandle"
                                >
                                  Cancel
                                </v-btn>
                                <v-btn
                                  color="primary-light-1"
                                  text
                                  @click="emailResetSaveHandle"
                                >
                                  Save
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </v-col>
                      </v-row>

                      <!-- Password  -->
                      <v-form
                        ref="passwordForm"
                        v-model="form.isValidPasswordForm"
                      >
                        <v-row>
                          <v-col cols="12" md="4">
                            <div class="section-title pb-2">
                              {{ $t("setting_sec_password_title") }}
                            </div>
                            <div class="section-description">
                              {{ $t("setting_sec_password_desc") }}
                            </div>
                          </v-col>
                          <v-col cols="12" md="6">
                            <label for class="input-top-label">{{
                              $t("setting_label_old_password")
                            }}</label>
                            <v-text-field
                              v-model="form.password.oldPassword"
                              solo
                              dense
                              :rules="rule.oldPassword"
                              :label="$t('setting_input_hint_current_password')"
                            ></v-text-field>

                            <v-row>
                              <v-col cols="12">
                                <label for class="input-top-label">{{
                                  $t("setting_label_new_password")
                                }}</label>
                                <v-text-field
                                  v-model="form.password.newPassword"
                                  solo
                                  dense
                                  :rules="rule.newPassword"
                                  :label="
                                    $t('setting_input_hint_secure_password')
                                  "
                                ></v-text-field>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="12" lg="6">
                                <v-btn
                                  class="px-15"
                                  color="#E1E8F1"
                                  small
                                  @click="handlePasswordChangeBtn"
                                  >{{
                                    $t("setting_btn_label_change_password")
                                  }}</v-btn
                                >
                              </v-col>
                            </v-row>
                          </v-col>
                        </v-row>
                      </v-form>
                      <v-row class="mt-5">
                        <v-col cols="12" md="4">
                          <div class="section-title pb-2">
                            {{ $t("Delete account") }}
                          </div>
                          <div class="section-description">
                            {{
                              $t(
                                "Deleting your account will cause all the information we have about you to be lost and is unrecoverable."
                              )
                            }}
                          </div>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-btn
                            class="px-10 white--text"
                            color="#FF633F"
                            small
                            >{{ $t("Delete Account") }}</v-btn
                          >
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat class="body-bg">
                    <v-card-text>
                      <v-row>
                        <v-col cols="12" md="4">
                          <div class="section-title pb-2">
                            {{ $t("Notifications") }}
                          </div>
                          <div class="section-description">
                            {{
                              $t("How would you like to get notified on email?")
                            }}
                          </div>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-row justify="center">
                            <v-col
                              class="primary-light-1--text font-weight-bold"
                              >Type</v-col
                            >
                            <v-col
                              class="primary-light-1--text font-weight-bold text-center"
                              >Email</v-col
                            >
                            <v-col
                              class="primary-light-1--text font-weight-bold text-center"
                              >SMS</v-col
                            >
                          </v-row>
                          <v-row justify="center" align="center">
                            <v-col class="primary-light-1--text"
                              >Inbox messages</v-col
                            >
                            <v-col class="d-flex align-center justify-center">
                              <v-checkbox
                                class="ma-0"
                                color="primary-light-1"
                                hide-details
                              ></v-checkbox>
                            </v-col>
                            <v-col class="d-flex align-center justify-center">
                              <v-checkbox
                                class="ma-0"
                                color="primary-light-1"
                                hide-details
                              ></v-checkbox>
                            </v-col>
                          </v-row>
                          <v-row justify="center">
                            <v-col class="primary-light-1--text"
                              >Order messages</v-col
                            >
                            <v-col class="d-flex align-center justify-center">
                              <v-checkbox
                                class="ma-0"
                                color="primary-light-1"
                                hide-details
                              ></v-checkbox>
                            </v-col>
                            <v-col class="d-flex align-center justify-center">
                              <v-checkbox
                                class="ma-0"
                                color="primary-light-1"
                                hide-details
                              ></v-checkbox>
                            </v-col>
                          </v-row>
                          <v-row justify="center">
                            <v-col class="primary-light-1--text"
                              >Order updates</v-col
                            >
                            <v-col class="d-flex align-center justify-center">
                              <v-checkbox
                                class="ma-0"
                                color="primary-light-1"
                                hide-details
                              ></v-checkbox>
                            </v-col>
                            <v-col class="d-flex align-center justify-center">
                              <v-checkbox
                                class="ma-0"
                                color="primary-light-1"
                                hide-details
                              ></v-checkbox>
                            </v-col>
                          </v-row>
                          <v-row justify="center">
                            <v-col class="primary-light-1--text"
                              >Booking Request</v-col
                            >
                            <v-col class="d-flex align-center justify-center">
                              <v-checkbox
                                class="ma-0"
                                color="primary-light-1"
                                hide-details
                              ></v-checkbox>
                            </v-col>
                            <v-col class="d-flex align-center justify-center">
                              <v-checkbox
                                class="ma-0"
                                color="primary-light-1"
                                hide-details
                              ></v-checkbox>
                            </v-col>
                          </v-row>
                          <v-row justify="center">
                            <v-col class="primary-light-1--text"
                              >Booking changes</v-col
                            >
                            <v-col class="d-flex align-center justify-center">
                              <v-checkbox
                                class="ma-0"
                                color="primary-light-1"
                                hide-details
                              ></v-checkbox>
                            </v-col>
                            <v-col class="d-flex align-center justify-center">
                              <v-checkbox
                                class="ma-0"
                                color="primary-light-1"
                                hide-details
                              ></v-checkbox>
                            </v-col>
                          </v-row>
                          <v-row justify="center">
                            <v-col class="primary-light-1--text"
                              >My Account</v-col
                            >
                            <v-col class="d-flex align-center justify-center">
                              <v-checkbox
                                class="ma-0"
                                color="primary-light-1"
                                hide-details
                              ></v-checkbox>
                            </v-col>
                            <v-col class="d-flex align-center justify-center">
                            </v-col>
                          </v-row>
                          <v-row justify="center">
                            <v-col class="primary-light-1--text"
                              >Marketting</v-col
                            >
                            <v-col class="d-flex align-center justify-center">
                              <v-checkbox
                                class="ma-0"
                                color="primary-light-1"
                                hide-details
                              ></v-checkbox>
                            </v-col>
                            <v-col class="d-flex align-center justify-center">
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col>
                              <v-btn
                                color="primary-light-1"
                                class="px-12 white--text"
                                >Save Changes</v-btn
                              >
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat class="body-bg">
                    <v-card-text>
                      <div class="security-title">
                        Verify your email and phone number
                      </div>
                      <v-row class="mt-5">
                        <v-col cols="4" class="d-flex align-center">
                          <v-icon>mdi-email-outline</v-icon>
                          <div class="security-subtitle">
                            Email
                          </div>
                        </v-col>
                        <v-col cols="8">
                          <v-btn depressed>
                            Verify
                          </v-btn>
                        </v-col>
                      </v-row>
                      <v-row class="mt-5">
                        <v-col cols="4" class="d-flex align-center">
                          <v-icon>mdi-phone</v-icon>
                          <div class="security-subtitle">
                            Phone number
                          </div>
                        </v-col>
                        <v-col cols="8">
                          <v-btn depressed color="success">
                            Verified
                          </v-btn>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <div class="line"></div>
                        </v-col>
                      </v-row>
                      <div class="security-title mt-5">
                        Link your social accounts
                      </div>
                      <v-row class="mt-5">
                        <v-col cols="4" class="d-flex align-center">
                          <v-icon color="#4267B2">mdi-facebook</v-icon>
                          <div class="security-subtitle">
                            Facebook
                          </div>
                        </v-col>
                        <v-col cols="8">
                          <v-btn depressed>
                            Connect
                          </v-btn>
                        </v-col>
                      </v-row>
                      <v-row class="mt-5">
                        <v-col cols="4" class="d-flex align-center">
                          <v-icon color="#EB4335">mdi-google</v-icon>
                          <div class="security-subtitle">
                            Google
                          </div>
                        </v-col>
                        <v-col cols="8">
                          <v-btn depressed color="success">
                            Connected
                          </v-btn>
                        </v-col>
                      </v-row>
                            <v-row class="mt-5">
                        <v-col cols="4" class="d-flex align-center">
                          <v-icon color="#47ACDF">mdi-twitter</v-icon>
                          <div class="security-subtitle">
                            Twitter
                          </div>
                        </v-col>
                        <v-col cols="8">
                          <v-btn depressed color="success">
                            Connected
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: "athlete",
  components: {},
  data() {
    return {
      tab: null,
      emailReset: {
        dialog: false,
        email: "",
        password: ""
      },
      form: {
        isValidPasswordForm: true,
        email: "",
        password: {
          oldPassword: "",
          newPassword: ""
        }
      },
      rule: {
        oldPassword: [],
        newPassword: []
      }
    };
  },
  watch: {},
  computed: {},
  created() {
    this.rule = {
      oldPassword: [v => !!v || this.$i18n.t("valid_pass_required")],
      newPassword: [
        v => !!v || this.$i18n.t("valid_pass_required"),
        v =>
          /^(?=.*[A-Z]).*$/.test(v) ||
          this.$i18n.t("valid_at_least_one_upper_case_letter"),
        v => (v && v.length >= 6) || this.$i18n.t("valid_pass_min_character")
      ]
    };
  },
  mounted() {},
  methods: {
    emailClickHandler() {
      this.emailReset.email = "";
      this.emailReset.password = "";
      this.emailReset.dialog = true;
    }
  }
};
</script>

<style lang="scss">
.setting-page--athlete {
  background: $body-bg;
  height: 100%;

  .security-title {
    font-family: $font-family;
    font-weight: bold;
    font-size: 15px;
    line-height: 20px;
    color: #6e7491;
  }

  .security-subtitle {
    margin-left: 20px;
    font-family: $font-family;
    font-weight: normal;
    font-size: 18px;
    line-height: 25px;
    text-transform: capitalize;
    color: #7c8db0;
  }
}
</style>
