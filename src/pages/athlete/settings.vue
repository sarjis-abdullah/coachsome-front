<template>
  <div class="setting-page--athlete">
    <v-container>
      <mobile-top-nav extraClass="body-bg-secondary" :headerText="$t('setting_page_title')">
        <template v-slot:goBack>
          <v-btn
            icon
            @click="handleBack"
          >
            <v-icon class="common-top-back-icon">mdi-chevron-left</v-icon>
          </v-btn>
        </template>
        <template v-slot:action>
          <span></span>
        </template>
      </mobile-top-nav>
      <v-row>
        <v-col>
          <v-row class="d-none d-md-block">
            <v-col cols="12" class="pb-0">
              <div class="page-title">{{ $t("setting_page_title") }}</div>
            </v-col>
          </v-row>

          <div class="d-none d-md-block">
            <v-row>
              <v-col cols="12">
                <v-tabs
                  v-model="tab"
                  background-color="transparent"
                  color="primary-light-1"
                >
                  <v-tab class="text-normal">
                    {{ $t("athlete_setting_tab_account") }}
                  </v-tab>
                  <v-tab class="text-normal">
                    {{ $t("athlete_settings_tab_notifications") }}
                  </v-tab>
                  <v-tab class="text-normal">
                    {{ $t("athlete_settings_tab_security") }}
                  </v-tab>
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
                                <v-card-title class="headline">
                                  {{ $t("athlete_settings_section_email_title") }}
                                </v-card-title>
                                <v-card-text>
                                  <v-row>
                                    <v-col cols="12">
                                      <v-text-field
                                        v-model="emailReset.email"
                                        dense
                                        hide-details
                                        solo
                                        :label="
                                          $t(
                                            'athlete_settings_placeholder_enter_email'
                                          )
                                        "
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
                                        :label="
                                          $t(
                                            'athlete_settings_placeholder_enter_pass'
                                          )
                                        "
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
                                    {{ $t("btn_label_cancel") }}
                                  </v-btn>
                                  <v-btn
                                    color="primary-light-1"
                                    text
                                    @click="emailResetSaveHandle"
                                  >
                                    {{ $t("btn_label_txt_save") }}
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
                              {{ $t("athlete_settings_btn_label_delete_acc") }}
                            </div>
                            <div class="section-description">
                              {{
                                $t("athlete_settings_section_delete_account_desc")
                              }}
                            </div>
                          </v-col>
                          <v-col cols="12" md="4">
                            <v-btn
                              class="px-10 white--text"
                              @click="handleDeleteAccountBtnClick"
                              color="#FF633F"
                              small
                              >{{
                                $t("athlete_settings_btn_label_delete_acc")
                              }}</v-btn
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
                                <v-card-title class="headline">
                                  {{
                                    $t("athlete_settings_card_title_delete_acc")
                                  }}
                                </v-card-title>
                                <v-card-text>
                                  <v-row>
                                    <v-col cols="12">
                                      <v-text-field
                                        v-model="deleteAccount.password"
                                        dense
                                        solo
                                        type="password"
                                        :label="
                                          $t(
                                            'athlete_settings_placeholder_enter_pass'
                                          )
                                        "
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
                                    {{ $t("btn_label_cancel") }}
                                  </v-btn>
                                  <v-btn
                                    color="primary-light-1"
                                    text
                                    @click="handleDeleteAccount"
                                  >
                                    {{ $t("btn_label_txt_save") }}
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
                              {{
                                $t("athlete_settings_section_title_notifications")
                              }}
                            </div>
                            <div class="section-description">
                              {{
                                $t("athlete_settings_sections_notification_desc")
                              }}
                            </div>
                          </v-col>
                          <v-col cols="12" md="6">
                            <v-row justify="center">
                              <v-col
                                class="primary-light-1--text font-weight-bold"
                              >
                                {{ $t("athlete_settings_column_type_txt") }}
                              </v-col>
                              <v-col
                                class="primary-light-1--text font-weight-bold text-center"
                              >
                                {{ $t("athlete_settings_column_email_txt") }}
                              </v-col>
                              <v-col
                                v-if="false"
                                class="primary-light-1--text font-weight-bold text-center"
                              >
                                {{ $t("athlete_settings_column_sms_txt") }}
                              </v-col>
                            </v-row>

                            <!-- Inbox Message -->
                            <v-row justify="center" align="center">
                              <v-col class="primary-light-1--text">
                                {{ $t("athlete_settings_item_inbox_message") }}
                              </v-col>
                              <v-col class="d-flex align-center justify-center">
                                <v-checkbox
                                  v-model="notificationType.inboxMessage"
                                  value="email"
                                  class="ma-0"
                                  color="primary-light-1"
                                  hide-details
                                ></v-checkbox>
                              </v-col>
                            </v-row>

                            <!-- Order message -->
                            <v-row justify="center" align="center">
                              <v-col class="primary-light-1--text">
                                {{ $t("athlete_settings_item_order_message") }}
                              </v-col>
                              <v-col class="d-flex align-center justify-center">
                                <v-checkbox
                                  v-model="notificationType.orderMessage"
                                  value="email"
                                  class="ma-0"
                                  color="primary-light-1"
                                  hide-details
                                ></v-checkbox>
                              </v-col>
                            </v-row>

                            <!-- Order updates -->
                            <v-row justify="center" align="center">
                              <v-col class="primary-light-1--text">
                                {{ $t("athlete_settings_item_order_updates") }}
                              </v-col>
                              <v-col class="d-flex align-center justify-center">
                                <v-checkbox
                                  v-model="notificationType.orderUpdate"
                                  value="email"
                                  class="ma-0"
                                  color="primary-light-1"
                                  hide-details
                                ></v-checkbox>
                              </v-col>
                            </v-row>

                            <!-- Booking request -->
                            <v-row justify="center" align="center">
                              <v-col class="primary-light-1--text">
                                {{ $t("athlete_settings_item_booking_req") }}
                              </v-col>
                              <v-col class="d-flex align-center justify-center">
                                <v-checkbox
                                  v-model="notificationType.bookingRequest"
                                  value="email"
                                  class="ma-0"
                                  color="primary-light-1"
                                  hide-details
                                ></v-checkbox>
                              </v-col>
                            </v-row>

                            <!-- Booking chnages -->
                            <v-row justify="center" align="center">
                              <v-col class="primary-light-1--text">
                                {{ $t("athlete_settings_item_booking_change") }}
                              </v-col>
                              <v-col class="d-flex align-center justify-center">
                                <v-checkbox
                                  v-model="notificationType.bookingChange"
                                  value="email"
                                  class="ma-0"
                                  color="primary-light-1"
                                  hide-details
                                ></v-checkbox>
                              </v-col>
                            </v-row>

                            <!-- My account -->
                            <v-row justify="center" align="center">
                              <v-col class="primary-light-1--text">
                                {{ $t("athlete_settings_item_my_acc") }}
                              </v-col>
                              <v-col class="d-flex align-center justify-center">
                                <v-checkbox
                                  v-model="notificationType.account"
                                  value="email"
                                  class="ma-0"
                                  color="primary-light-1"
                                  hide-details
                                ></v-checkbox>
                              </v-col>
                              <v-col
                                class="d-flex align-center justify-center"
                                v-if="false"
                              >
                              </v-col>
                            </v-row>

                            <!-- Marketting -->
                            <v-row justify="center" align="center">
                              <v-col class="primary-light-1--text">
                                {{ $t("athlete_settings_item_marketting") }}
                              </v-col>
                              <v-col class="d-flex align-center justify-center">
                                <v-checkbox
                                  v-model="notificationType.marketting"
                                  value="email"
                                  class="ma-0"
                                  color="primary-light-1"
                                  hide-details
                                ></v-checkbox>
                              </v-col>
                            </v-row>

                            <v-row>
                              <v-col>
                                <v-btn
                                  @click="handleNotificationSaveBtnClick"
                                  color="primary-light-1"
                                  class="px-12 white--text"
                                >
                                  {{ $t("btn_label_txt_save_change") }}
                                </v-btn>
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
                          {{ $t("athlete_settings_title_verify_email_phone") }}
                        </div>
                        <v-row class="mt-5">
                          <v-col cols="4" class="d-flex align-center">
                            <v-icon>mdi-email-outline</v-icon>
                            <div class="security-subtitle">
                              {{ $t("athlete_settigs_verify_item_email") }}
                            </div>
                          </v-col>
                          <v-col cols="8">
                            <v-btn
                              color="success"
                              depressed
                              v-if="security.isEmailVerified"
                            >
                              {{ $t("txt_verified") }}
                            </v-btn>
                            <v-btn
                              depressed
                              v-if="!security.isEmailVerified"
                              @click="handleEmailVerifyBtnClick"
                            >
                              {{ $t("txt_verify") }}
                            </v-btn>
                          </v-col>
                        </v-row>
                        <v-row class="mt-5">
                          <v-col cols="4" class="d-flex align-center">
                            <v-icon>mdi-phone</v-icon>
                            <div class="security-subtitle">
                              {{ $t("athlete_settigs_verify_item_phone") }}
                            </div>
                          </v-col>
                          <v-col cols="8">
                            <v-btn
                              depressed
                              color="success"
                              disabled
                              @click="handlePhoneVerifyBtnClick"
                            >
                              {{ $t("txt_verify") }}
                            </v-btn>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <div class="line"></div>
                          </v-col>
                        </v-row>
                        <div class="security-title mt-5">
                          {{ $t("athlete_settigs_conect_social_account") }}
                        </div>
                        <v-row class="mt-5">
                          <v-col cols="4" class="d-flex align-center">
                            <v-icon color="#4267B2">mdi-facebook</v-icon>
                            <div class="security-subtitle">
                              {{ $t("athlete_settings_connect_fb_acc") }}
                            </div>
                          </v-col>
                          <v-col cols="8">
                            <v-btn
                              depressed
                              v-if="!security.isConnectedFacebook"
                              @click="handleFacebookVerifyBtnClick"
                            >
                              {{ $t("txt_connect") }}
                            </v-btn>
                            <v-btn v-else depressed color="success">
                              {{ $t("txt_connected") }}
                            </v-btn>
                          </v-col>
                        </v-row>
                        <v-row class="mt-5">
                          <v-col cols="4" class="d-flex align-center">
                            <v-icon color="#EB4335">mdi-google</v-icon>
                            <div class="security-subtitle">
                              {{ $t("athlete_settings_connect_google_acc") }}
                            </div>
                          </v-col>
                          <v-col cols="8">
                            <v-btn
                              depressed
                              v-if="!security.isConnectedGoogle"
                              @click="handleGoogleVerifyBtnClick"
                            >
                              {{ $t("txt_connect") }}
                            </v-btn>
                            <v-btn v-else depressed color="success">
                              {{ $t("txt_connected") }}
                            </v-btn>
                          </v-col>
                        </v-row>
                        <v-row class="mt-5" v-if="false">
                          <v-col cols="4" class="d-flex align-center">
                            <v-icon color="#47ACDF">mdi-twitter</v-icon>
                            <div class="security-subtitle">
                              {{ $t("athlete_settings_connect_twitter_acc") }}
                            </div>
                          </v-col>
                          <v-col cols="8">
                            <v-btn
                              depressed
                              v-if="!security.isConnectedTwitter"
                              @click="handleTwitterVerifyBtnClick"
                            >
                              {{ $t("txt_connect") }}
                            </v-btn>
                            <v-btn v-else depressed color="success">
                              {{ $t("txt_connected") }}
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                </v-tabs-items>
              </v-col>
            </v-row>
          </div>

          <div class="d-md-none">
            <v-row>
              <v-col cols="12">
                <v-list class="body-bg">
                  <v-list-item link @click.stop="handleAccount">
                    <v-list-item-icon>
                      <v-img :src="require('@/assets/img/svg-icons/new/user-icon.svg')" alt="edit" />
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title class="list-text">{{$t("payout_info_input_title_account")}}</v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-icon>
                      <v-icon class="common-top-back-icon">mdi-chevron-right</v-icon>
                    </v-list-item-icon>
                  </v-list-item>

                  <v-list-item @click.stop="handleNotifications">
                    <v-list-item-icon>
                      <v-img  :src="require('@/assets/img/svg-icons/new/bell.svg')" alt="payment" />
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title class="list-text">{{$t("setting_sec_notification_title")}}</v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-icon>
                      <v-icon class="common-top-back-icon">mdi-chevron-right</v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                  <v-list-item link @click.stop="handleSecurity">
                    <v-list-item-icon>
                      <v-img  :src="require('@/assets/img/svg-icons/new/padlock.svg')" alt="payment" />
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title class="list-text">{{$t("athlete_settings_tab_security")}}</v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-icon>
                      <v-icon class="common-top-back-icon">mdi-chevron-right</v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </div>

        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { endpoint } from "../../api";
import { pathData, settingValueData, roleData } from "@/data";
import MobileTopNav from '@/components/layout/global/MobileTopNav'

export default {
  layout: "athlete",
  components: {MobileTopNav},
  data() {
    return {
      settingValueData,
      action: "security_identify",
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
      },
      isSocialLogin: false,
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
    window.addEventListener("message", this.onMessage);
    this.securityDetails();
    this.getAthleteSetting();
  },
  methods: {
    beforeDestroy() {
      window.removeEventListener("message", this.onMessage);
    },
    onMessage(e) {
      if (e.data.status == "success") {
        this.securityDetails();
      }
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
        "/auth/login/facebook?user_id=" +
        this.$auth.user.id +
        "&action=" +
        this.action;
    },
    async handleGoogleVerifyBtnClick() {
      const newWindow = this.openWindow("", "message");
      newWindow.location.href =
        process.env.API_SERVER_URL +
        "/auth/login/google?user_id=" +
        this.$auth.user.id +
        "&action=" +
        this.action;
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
        const payload = {
          inboxMessage: null,
          orderMessage: null,
          orderUpdate: null,
          bookingRequest: null,
          bookingChange: null,
          account: null,
          marketting: null
        };

        if (this.notificationType.inboxMessage) {
          if (
            this.notificationType.inboxMessage == settingValueData.KEY_EMAIL
          ) {
            payload.inboxMessage = settingValueData.ID_EMAIL;
          } else {
            payload.inboxMessage = settingValueData.ID_SMS;
          }
        }

        if (this.notificationType.orderMessage) {
          if (
            this.notificationType.orderMessage == settingValueData.KEY_EMAIL
          ) {
            payload.orderMessage = settingValueData.ID_EMAIL;
          } else {
            payload.orderMessage = settingValueData.ID_SMS;
          }
        }

        if (this.notificationType.orderUpdate) {
          if (this.notificationType.orderUpdate == settingValueData.KEY_EMAIL) {
            payload.orderUpdate = settingValueData.ID_EMAIL;
          } else {
            payload.orderUpdate = settingValueData.ID_SMS;
          }
        }

        if (this.notificationType.bookingRequest) {
          if (
            this.notificationType.bookingRequest == settingValueData.KEY_EMAIL
          ) {
            payload.bookingRequest = settingValueData.ID_EMAIL;
          } else {
            payload.bookingRequest = settingValueData.ID_SMS;
          }
        }

        if (this.notificationType.bookingChange) {
          if (
            this.notificationType.bookingChange == settingValueData.KEY_EMAIL
          ) {
            payload.bookingChange = settingValueData.ID_EMAIL;
          } else {
            payload.bookingChange = settingValueData.ID_SMS;
          }
        }

        if (this.notificationType.account) {
          if (this.notificationType.account == settingValueData.KEY_EMAIL) {
            payload.account = settingValueData.ID_EMAIL;
          } else {
            payload.account = settingValueData.ID_SMS;
          }
        }

        if (this.notificationType.marketting) {
          if (this.notificationType.marketting == settingValueData.KEY_EMAIL) {
            payload.marketting = settingValueData.ID_EMAIL;
          } else {
            payload.marketting = settingValueData.ID_SMS;
          }
        }

        await this.$axios.put(
          endpoint.ATHLETE_SETTINGS_PUT(this.notificationType.id),
          { ...payload }
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
          this.form.email = data.email;
          this.isSocialLogin = data.isSocialLogin;
          this.notificationType.id = data.data.id;
          if (data.data.inboxMessage) {
            if (data.data.inboxMessage == settingValueData.ID_EMAIL) {
              this.notificationType.inboxMessage = settingValueData.KEY_EMAIL;
            } else {
              this.notificationType.inboxMessage = settingValueData.KEY_SMS;
            }
          }

          if (data.data.orderMessage) {
            if (data.data.orderMessage == settingValueData.ID_EMAIL) {
              this.notificationType.orderMessage = settingValueData.KEY_EMAIL;
            } else {
              this.notificationType.orderMessage = settingValueData.KEY_SMS;
            }
          }

          if (data.data.orderUpdate) {
            if (data.data.orderUpdate == settingValueData.ID_EMAIL) {
              this.notificationType.orderUpdate = settingValueData.KEY_EMAIL;
            } else {
              this.notificationType.orderUpdate = settingValueData.KEY_SMS;
            }
          }

          if (data.data.bookingRequest) {
            if (data.data.bookingRequest == settingValueData.ID_EMAIL) {
              this.notificationType.bookingRequest = settingValueData.KEY_EMAIL;
            } else {
              this.notificationType.bookingRequest = settingValueData.KEY_SMS;
            }
          }

          if (data.data.bookingChange) {
            if (data.data.bookingChange == settingValueData.ID_EMAIL) {
              this.notificationType.bookingChange = settingValueData.KEY_EMAIL;
            } else {
              this.notificationType.bookingChange = settingValueData.KEY_SMS;
            }
          }

          if (data.data.account) {
            if (data.data.account == settingValueData.ID_EMAIL) {
              this.notificationType.account = settingValueData.KEY_EMAIL;
            } else {
              this.notificationType.account = settingValueData.KEY_SMS;
            }
          }

          if (data.data.marketting) {
            if (data.data.marketting == settingValueData.ID_EMAIL) {
              this.notificationType.marketting = settingValueData.KEY_EMAIL;
            } else {
              this.notificationType.marketting = settingValueData.KEY_SMS;
            }
          }
        }
      } catch (err) {
        this.$toast.error(err.response.data.error.message);
      }
    },
    async handleDeleteAccount() {
      try {
        await this.$axios.delete(
          endpoint.ACCOUNTS_DELETE + "?password=" + this.deleteAccount.password
        );
        await this.$auth.logout();
        this.$router.push(this.localePath(pathData.pages.login));
      } catch (err) {
        this.$toast.error(err.response.data.error.message);
      }
    },
    handleDeleteAccountBtnClick() {
      if(this.$auth.user.is_social_account){
        if(confirm("Are You sure? Your account will be deleted permanantly.")){
          this.handleDeleteAccount();
        }
      } else {
        this.deleteAccount.dialog = true;
      }
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
    },
    handleAccount() {
      this.$router.push(this.localePath(pathData.athlete.account));
    },
    handleNotifications(){
      this.$router.push(this.localePath(pathData.athlete.notification));
    },
    handleSecurity(){
      this.$router.push(this.localePath(pathData.pages.security));
    },
    handleBack(){
      this.$router.push(this.localePath(pathData.athlete.profileMenu));
    },
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
.list-text{
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  color: #49556A;
}

.theme--light.v-icon{
  color: #000;
}
.btn-icon{
  margin-right: auto;
}

.btn-text{
  margin-right: auto;
}
</style>
