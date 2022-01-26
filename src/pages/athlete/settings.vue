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
                            @click="handleDeleteAccountBtnClick"
                            color="#FF633F"
                            small
                            >{{ $t("Delete Account") }}</v-btn
                          >
                        </v-col>
                      </v-row>
                      <v-row v-if="deleteAccount.dialog">
                        <v-col>
                          <v-dialog
                            v-model="deleteAccount.dialog"
                            persistent
                            max-width="400"
                          >
                            <v-card>
                              <v-card-title class="headline"
                                >Delete Account</v-card-title
                              >
                              <v-card-text>
                                <v-row>
                                  <v-col cols="12">
                                    <v-text-field
                                      v-model="deleteAccount.password"
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
                                  @click="deleteAccount.dialog = false"
                                >
                                  Cancel
                                </v-btn>
                                <v-btn
                                  color="primary-light-1"
                                  text
                                  @click="handleDeleteAccount"
                                >
                                  Save
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-tab-item>

                <!-- Notification -->
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

                          <!-- Inbox Message -->
                          <v-radio-group
                            v-model="notificationType.inboxMessage"
                          >
                            <v-row justify="center" align="center">
                              <v-col class="primary-light-1--text"
                                >Inbox messages</v-col
                              >
                              <v-col class="d-flex align-center justify-center">
                                <v-radio
                                  :value="settingValueData.ID_EMAIL"
                                  class="ma-0"
                                  color="primary-light-1"
                                  hide-details
                                ></v-radio>
                              </v-col>
                              <v-col class="d-flex align-center justify-center">
                                <v-radio
                                  disabled
                                  :value="settingValueData.ID_SMS"
                                  class="ma-0"
                                  color="primary-light-1"
                                  hide-details
                                ></v-radio>
                              </v-col>
                            </v-row>
                          </v-radio-group>

                          <!-- Order message -->
                          <v-radio-group
                            v-model="notificationType.orderMessage"
                          >
                            <v-row justify="center" align="center">
                              <v-col class="primary-light-1--text"
                                >Order messages</v-col
                              >
                              <v-col class="d-flex align-center justify-center">
                                <v-radio
                                  :value="settingValueData.ID_EMAIL"
                                  class="ma-0"
                                  color="primary-light-1"
                                  hide-details
                                ></v-radio>
                              </v-col>
                              <v-col class="d-flex align-center justify-center">
                                <v-radio
                                  disabled
                                  :value="settingValueData.ID_SMS"
                                  class="ma-0"
                                  color="primary-light-1"
                                  hide-details
                                ></v-radio>
                              </v-col>
                            </v-row>
                          </v-radio-group>

                          <!-- Order updates -->
                          <v-radio-group v-model="notificationType.orderUpdate">
                            <v-row justify="center" align="center">
                              <v-col class="primary-light-1--text"
                                >Order updates</v-col
                              >
                              <v-col class="d-flex align-center justify-center">
                                <v-radio
                                  :value="settingValueData.ID_EMAIL"
                                  class="ma-0"
                                  color="primary-light-1"
                                  hide-details
                                ></v-radio>
                              </v-col>
                              <v-col class="d-flex align-center justify-center">
                                <v-radio
                                  disabled
                                  :value="settingValueData.ID_SMS"
                                  class="ma-0"
                                  color="primary-light-1"
                                  hide-details
                                ></v-radio>
                              </v-col>
                            </v-row>
                          </v-radio-group>

                          <!-- Booking request -->
                          <v-radio-group
                            v-model="notificationType.bookingRequest"
                          >
                            <v-row justify="center" align="center">
                              <v-col class="primary-light-1--text"
                                >Booking request</v-col
                              >
                              <v-col class="d-flex align-center justify-center">
                                <v-radio
                                  :value="settingValueData.ID_EMAIL"
                                  class="ma-0"
                                  color="primary-light-1"
                                  hide-details
                                ></v-radio>
                              </v-col>
                              <v-col class="d-flex align-center justify-center">
                                <v-radio
                                  disabled
                                  :value="settingValueData.ID_SMS"
                                  class="ma-0"
                                  color="primary-light-1"
                                  hide-details
                                ></v-radio>
                              </v-col>
                            </v-row>
                          </v-radio-group>

                          <!-- Booking chnages -->
                          <v-radio-group
                            v-model="notificationType.bookingChange"
                          >
                            <v-row justify="center" align="center">
                              <v-col class="primary-light-1--text"
                                >Booking change</v-col
                              >
                              <v-col class="d-flex align-center justify-center">
                                <v-radio
                                  :value="settingValueData.ID_EMAIL"
                                  class="ma-0"
                                  color="primary-light-1"
                                  hide-details
                                ></v-radio>
                              </v-col>
                              <v-col class="d-flex align-center justify-center">
                                <v-radio
                                  disabled
                                  :value="settingValueData.ID_SMS"
                                  class="ma-0"
                                  color="primary-light-1"
                                  hide-details
                                ></v-radio>
                              </v-col>
                            </v-row>
                          </v-radio-group>

                          <!-- My account -->
                          <v-radio-group v-model="notificationType.account">
                            <v-row justify="center" align="center">
                              <v-col class="primary-light-1--text"
                                >My account</v-col
                              >
                              <v-col class="d-flex align-center justify-center">
                                <v-radio
                                  :value="settingValueData.ID_EMAIL"
                                  class="ma-0"
                                  color="primary-light-1"
                                  hide-details
                                ></v-radio>
                              </v-col>
                              <v-col class="d-flex align-center justify-center">
                              </v-col>
                            </v-row>
                          </v-radio-group>

                          <!-- Marketting -->
                          <v-radio-group v-model="notificationType.marketting">
                            <v-row justify="center" align="center">
                              <v-col class="primary-light-1--text"
                                >Marketting</v-col
                              >
                              <v-col class="d-flex align-center justify-center">
                                <v-radio
                                  :value="settingValueData.ID_EMAIL"
                                  class="ma-0"
                                  color="primary-light-1"
                                  hide-details
                                ></v-radio>
                              </v-col>
                              <v-col class="d-flex align-center justify-center">
                              </v-col>
                            </v-row>
                          </v-radio-group>

                          <v-row>
                            <v-col>
                              <v-btn
                                @click="handleNotificationSaveBtnClick"
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
                          <v-btn
                            color="success"
                            depressed
                            v-if="security.isEmailVerified"
                          >
                            Verified
                          </v-btn>
                          <v-btn
                            depressed
                            v-if="!security.isEmailVerified"
                            @click="handleEmailVerifyBtnClick"
                          >
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
                          <v-btn
                            depressed
                            color="success"
                            disabled
                            @click="handlePhoneVerifyBtnClick"
                          >
                            Verify
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
                          <v-btn
                            depressed
                            v-if="!security.isConnectedFacebook"
                            @click="handleFacebookVerifyBtnClick"
                          >
                            Connect
                          </v-btn>
                          <v-btn v-else depressed color="success">
                            Connected
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
                          <v-btn
                            depressed
                            v-if="!security.isConnectedGoogle"
                            @click="handleGoogleVerifyBtnClick"
                          >
                            Connect
                          </v-btn>
                          <v-btn v-else depressed color="success">
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
                          <v-btn
                            depressed
                            v-if="!security.isConnectedTwitter"
                            @click="handleTwitterVerifyBtnClick"
                          >
                            Connect
                          </v-btn>
                          <v-btn
                            v-else
                            depressed
                            color="success"
                          >
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
import { endpoint } from "../../api";
import { pathData, settingValueData, roleData } from "@/data";
export default {
  layout: "athlete",
  components: {},
  data() {
    return {
      settingValueData,
      requestFrom: "settings_page",
      tab: null,
      security: {
        isEmailVerified: null,
        isPhoneNumberVerified: null,
        isConnectedFacebook: null,
        isConnectedGoogle: null,
        isConnectedTwitter: null
      },
      notificationType: {
        id: null,
        inboxMessage: null,
        orderMessage: null,
        orderUpdate: null,
        bookingRequest: null,
        bookingChange: null,
        account: null,
        marketting: null
      },
      emailReset: {
        dialog: false,
        email: "",
        password: ""
      },
      deleteAccount: {
        dialog: false,
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
  mounted() {
    window.addEventListener("message", this.onMessage, false);
    this.getAthleteSetting();
    this.securityDetails();
  },
  methods: {
    onMessage(e) {
      this.securityDetails();
    },
    openWindow(url, title, options = {}) {
      if (typeof url === "object") {
        options = url;
        url = "";
      }

      options = { url, title, width: 600, height: 720, ...options };

      const dualScreenLeft =
        window.screenLeft !== undefined
          ? window.screenLeft
          : window.screen.left;
      const dualScreenTop =
        window.screenTop !== undefined ? window.screenTop : window.screen.top;
      const width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        window.screen.width;
      const height =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        window.screen.height;

      options.left = width / 2 - options.width / 2 + dualScreenLeft;
      options.top = height / 2 - options.height / 2 + dualScreenTop;

      const optionsStr = Object.keys(options)
        .reduce((acc, key) => {
          acc.push(`${key}=${options[key]}`);
          return acc;
        }, [])
        .join(",");

      const newWindow = window.open(url, title, optionsStr);

      if (window.focus) {
        newWindow.focus();
      }

      return newWindow;
    },
    async handleEmailVerifyBtnClick() {
      try {
        const { data } = await this.$axios.post(
          endpoint.VERIFICATIONS_EMAIL_VERIFY_POST
        );
        this.$toast.success("An email was sent to your email address.");
      } catch (error) {
        this.$toast.error(error.response.data.error.message);
      }
    },
    async handlePhoneVerifyBtnClick() {
      try {
        const { data } = await this.$axios.post(
          endpoint.VERIFICATIONS_EMAIL_VERIFY_POST
        );
      } catch (error) {
        this.$toast.error(error.response.data.error.message);
      }
    },
    async handleFacebookVerifyBtnClick() {
      const newWindow = this.openWindow("", "message");
      newWindow.location.href =
        process.env.API_SERVER_URL +
        "/auth/login/facebook?user_type=" +
        roleData.ATHLETE +
        "&request_from=" +
        this.requestFrom;
    },
    async handleGoogleVerifyBtnClick() {
      const newWindow = this.openWindow("", "message");
      newWindow.location.href =
        process.env.API_SERVER_URL +
        "/auth/login/google?user_type=" +
        roleData.ATHLETE +
        "&request_from=" +
        this.requestFrom;
    },
    async handleTwitterVerifyBtnClick() {
      try {
        const { data } = await this.$axios.post(
          endpoint.VERIFICATIONS_TWITTER_VERIFY_POST
        );
        console.log(data);
      } catch (error) {
        this.$toast.error(error.response.data.error.message);
      }
    },
    async securityDetails() {
      try {
        const { data } = await this.$axios.get(endpoint.SECURITIES_GET);
        if (data.data) {
          this.security.isEmailVerified = data.data.emailVerifiedAt;
          this.security.isPhoneNumberVerified = data.data.phoneNumberVerifiedAt;
          this.security.isConnectedFacebook = data.data.facebookConnectedAt;
          this.security.isConnectedGoogle = data.data.googleConnectedAt;
          this.security.isConnectedTwitter = data.data.twitterConnectedAt;
        }
      } catch (error) {
        if (error.response.data.error) {
          this.$toast.error(error.response.data.error.message);
        }
      }
    },
    async handleNotificationSaveBtnClick() {
      try {
        const { data } = await this.$axios.put(
          endpoint.ATHLETE_SETTINGS_PUT(this.notificationType.id)
        );
        this.$toast.success("successfully updated");
      } catch (error) {
        if (error.response.data.error) {
          this.$toast.error(error.response.data.error.message);
        }
      }
    },
    async getAthleteSetting() {
      try {
        const { data } = await this.$axios.get(endpoint.ATHLETE_SETTINGS_GET);
        if (data.data) {
          this.notificationType.id = data.data.id;
          this.notificationType.inboxMessage = data.data.inboxMessage;
          this.notificationType.orderMessage = data.data.orderMessage;
          this.notificationType.orderUpdate = data.data.orderUpdate;
          this.notificationType.bookingRequest = data.data.bookingRequest;
          this.notificationType.bookingChange = data.data.bookingChange;
          this.notificationType.account = data.data.account;
          this.notificationType.marketting = data.data.marketting;
        }
        console.log(data);
      } catch (err) {
        this.$toast.error(err.response.data.error.message);
      }
    },
    async handleDeleteAccount() {
      try {
        this.$axios.delete(
          endpoint.ACCOUNTS_DELETE + "?password=" + this.deleteAccount.password
        );
        await this.$auth.logout();
        this.$router.push(this.localePath(pathData.pages.login));
      } catch (err) {
        this.$toast.error(err.response.data.error.message);
      }
    },
    handleDeleteAccountBtnClick() {
      this.deleteAccount.dialog = true;
    },
    emailResetCancelHandle() {
      this.emailReset.dialog = false;
    },
    handlePasswordChangeBtn() {
      const payload = {
        ...this.form.password
      };
      this.$axios
        .put(endpoint.ATHLETE_SETTINGS_RESET_PASSWORD_PUT, payload)
        .then(({ data }) => {
          this.$toast.success("Successfully updated");
        })
        .catch(err => {
          if (err.response.data.error) {
            this.$toast.error(err.response.data.error.message);
          }
        });
    },
    emailResetSaveHandle() {
      const payload = {
        email: this.emailReset.email,
        password: this.emailReset.password
      };
      this.$axios
        .put(endpoint.ATHLETE_SETTINGS_RESET_EMAIL_PUT, payload)
        .then(({ data }) => {
          this.$toast.success("Successfully updated");
          this.emailReset.dialog = false;
        })
        .catch(err => {
          if (err.response.data.error) {
            this.$toast.error(err.response.data.error.message);
          }
        });
    },
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
