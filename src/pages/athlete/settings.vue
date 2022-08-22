<template>
  <div class="setting-page--athlete">
    <v-container fluid>
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
      <desktop-top-nav extraClass="body-bg-secondary" :headerText="$t('setting_page_title')"></desktop-top-nav>
      <v-row  class="d-flext justify-center">
        <v-col cols="11">
          <!-- <v-row class="d-none d-md-block">
            <v-col cols="12" class="pb-0">
              <div class="page-title">{{ $t("setting_page_title") }}</div>
            </v-col>
          </v-row> -->
          <v-row class="d-md-none">
            <v-col cols="12" class="py-0">
              <v-list class="body-bg pt-0">
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
                <!-- {{$t("setting_sec_notification_title")}} -->
                <v-list-item link @click.stop="handleNotifications">
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

                <!-- {{$t("athlete_settings_tab_security")}} -->
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


          <v-row class="d-none d-md-block">
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
                  {{ $t("athlete_settings_tab_security") }}
                </v-tab>
              </v-tabs>
              <div class="line"></div>
            </v-col>
          </v-row>

          <v-tabs-items v-model="tab" class="d-none d-md-block">
            <v-tab-item>
              <v-card color="body-bg pt-5">
                <v-row>
                  <v-col cols="12" md="4">
                    <div class="section-title pb-2">
                      {{ $t("setting_sec_contact_info_title") }}
                    </div>
                    <div class="section-description">
                      {{ $t("setting_sec_contact_info_user_desc") }}
                    </div>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="form.contactInformation.firstName"
                      dense
                      autocomplete="off"
                      solo
                      :label="$t('setting_input_hint_first_name')"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="form.contactInformation.lastName"
                      autocomplete="off"
                      dense
                      solo
                      :label="$t('setting_input_hint_last_name')"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row v-if="false">
                  <v-col cols="12" md="4">
                    <div class="section-description">
                      {{ $t("setting_sec_contact_info_loc_desc") }}
                    </div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-row>
                      <v-col cols="6">
                        <v-autocomplete
                          autocomplete="off"
                          v-model="form.contactInformation.country"
                          @change="handleCountryChange"
                          :items="form.countryList"
                          item-text="displayName"
                          item-value="code"
                          solo
                          dense
                          hide-no-data
                          hide-details
                          append-icon="expand_more"
                          :label="$t('setting_input_hint_country')"
                        ></v-autocomplete>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <div v-show="!isTheCountryCodeDk">
                          <v-text-field
                            v-model="form.contactInformation.address"
                            solo
                            dense
                            :placeholder="$t('geography_placeholder_address')"
                          ></v-text-field>
                        </div>
                        <div
                          v-show="isTheCountryCodeDk"
                          class="autocomplete-container"
                        >
                          <v-text-field
                            v-model="form.contactInformation.address"
                            solo
                            dense
                            ref="input"
                            type="search"
                            :placeholder="$t('geography_placeholder_address')"
                            id="dawa-autocomplete-input"
                          ></v-text-field>
                        </div>
                      </v-col>
                    </v-row>
                    <v-row class="py-0">
                      <v-col cols="12" md="3">
                        <v-text-field
                          autocomplete="off"
                          v-model="form.contactInformation.zipCode"
                          dense
                          solo
                          :label="$t('setting_input_hint_zip_code')"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          autocomplete="off"
                          v-model="form.contactInformation.city"
                          dense
                          solo
                          :label="$t('setting_input_hint_city')"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>

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
                        <v-card-title class="headline">Email</v-card-title>
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
                <v-form ref="passwordForm" v-model="form.isValidPasswordForm">
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
                            :label="$t('setting_input_hint_secure_password')"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" lg="6">
                          <v-btn
                            block
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

                <v-row v-if="false">
                  <v-col cols="12" md="4">
                    <div class="section-title pb-2">
                      {{ $t("setting_sec_timezone_title") }}
                    </div>
                    <div class="section-description">
                      {{ $t("setting_sec_timezone_desc") }}
                    </div>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-row>
                      <v-col>
                        <v-autocomplete
                          autocomplete="off"
                          v-model="form.contactInformation.country"
                          @change="handleCountryChange"
                          :items="form.countryList"
                          item-text="displayName"
                          item-value="code"
                          solo
                          dense
                          hide-no-data
                          hide-details
                          append-icon="expand_more"
                          :label="$t('setting_input_hint_country')"
                        ></v-autocomplete>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-text-field
                          v-model="form.contactInformation.timezone"
                          readonly
                          solo
                          dense
                          :label="$t('setting_input_hint_country')"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
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

      <v-row class="d-none d-md-block">
        <v-col cols="12">
          <client-back-footer>
            <template v-slot:left>
              <v-btn
                class="ml-5 mb-5"
                color="primary-light-1"
                small
                dark
                @click.stop="handleSaveBtnClick()"
                >{{ $t("profile_save_btn") }}</v-btn
              >
            </template>
            <template v-slot:right>
              <span class="d-sm-flex d-xs-flex d-md-none justify-end mr-5">
              </span>
            </template>
          </client-back-footer>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { endpoint, coachSettingApi, coachTimezoneApi } from "@/api";
import ClientBackFooter from "@/components/artifact/global/ClientBackFooter";
import { pathData } from "@/data";
import MobileTopNav from '@/components/layout/global/MobileTopNav';
import DesktopTopNav from '@/components/layout/global/DesktopTopNav.vue';

export default {
  layout: "athlete",
  components: {
    ClientBackFooter,
    MobileTopNav,
    DesktopTopNav
  },
  data() {
    return {
      tab: null,
      action: "security_identify",
      emailReset: {
        dialog: false,
        email: "",
        password: ""
      },
      defaultSelected: { id: 1, code: 88 },
      security: {
        isEmailVerified: null,
        isPhoneNumberVerified: null,
        isConnectedFacebook: null,
        isConnectedGoogle: null,
        isConnectedTwitter: null
      },
      items: [
        { id: 1, code: "Denmark" },
        { id: 2, code: "Australia" }
      ],
      form: {
        isValidPasswordForm: true,
        contactInformation: {
          firstName: "",
          lastName: "",
          address: "",
          zipCode: "",
          city: "",
          lat: "",
          long: "",
          country: "",
          timezone: ""
        },
        email: "",
        password: {
          oldPassword: "",
          newPassword: ""
        },
        timeZone: "",
        countryList: [],
        notifications: [],
        activeNotifications: []
      },
      rule: {
        oldPassword: [],
        newPassword: []
      }
    };
  },
  watch: {
    "form.contactInformation.country": function() {}
  },
  computed: {
    isTheCountryCodeDk() {
      return this.form.contactInformation.country == "DK";
    }
  },
  created() {
    (this.rule = {
      oldPassword: [v => !!v || this.$i18n.t("valid_pass_required")],
      newPassword: [
        v => !!v || this.$i18n.t("valid_pass_required"),
        v =>
          /^(?=.*[A-Z]).*$/.test(v) ||
          this.$i18n.t("valid_at_least_one_upper_case_letter"),
        v => (v && v.length >= 6) || this.$i18n.t("valid_pass_min_character")
      ]
    });
  },
  mounted() {
    window.addEventListener("message", this.onMessage);
    this.securityDetails();
    this.fetchSettings();
  },
  methods: {
    handleAccount() {
      this.$router.push(this.localePath(pathData.athlete.account));
    },
    handleNotifications(){
      this.$router.push(this.localePath(pathData.athlete.notification));
    },
    handleSecurity(){
      this.$router.push(this.localePath(pathData.pages.security));
    },
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
    handleCountryChange() {
      this.form.contactInformation.long = "";
      this.form.contactInformation.lat = "";
      this.form.contactInformation.zipCode = "";
      this.form.contactInformation.city = "";
      this.form.contactInformation.address = "";
      this.fetchTimeZone(this.form.contactInformation.country);
    },
    async handleSaveBtnClick() {
      try {
        let payload = {
          firstName: this.form.contactInformation.firstName,
          lastName: this.form.contactInformation.lastName,
          cca2: this.form.contactInformation.country,
          zipCode: this.form.contactInformation.zipCode,
          lat: this.form.contactInformation.lat,
          long: this.form.contactInformation.long,
          city: this.form.contactInformation.city,
          address: this.form.contactInformation.address,
          notificatonCategories: this.form.activeNotifications.map(
            item => item.id
          )
        };
        if(this.form.contactInformation.timezone){
          payload.timezone = this.form.contactInformation.timezone
        }
        let { data } = await coachSettingApi(this.$axios).updateSetting(
          payload
        );
        // console.log(data);
        if (data.message) {
          this.$toast.success(data.message);
        }
      } catch (error) {
        let { data } = error.response;
        if (data.message) {
          this.$toast.error(data.message);
        }
      }
    },
    async handlePasswordChangeBtn() {
      if (this.$refs.passwordForm.validate()) {
        try {
          let payload = {
            oldPassword: this.form.password.oldPassword,
            newPassword: this.form.password.newPassword
          };
          let { data } = await coachSettingApi(this.$axios).changePassword(
            payload
          );
          if (data.message) {
            this.$toast.success(data.message);
          }
          this.resetPasswordForm();
        } catch (error) {
          this.resetPasswordForm();
          let { data } = error.response;
          if (data.message) {
            this.$toast.error(data.message);
          }
        }
      }
    },
    resetPasswordForm() {
      this.$refs.passwordForm.reset();
    },
    emailResetCancelHandle() {
      this.emailReset.dialog = false;
    },
    async emailResetSaveHandle() {
      try {
        let payload = {
          email: this.emailReset.email,
          password: this.emailReset.password
        };
        let { data } = await coachSettingApi(this.$axios).changeEmail(payload);
        if (data.message) {
          this.$toast.success(data.message);
        }
        // console.log(data);
      } catch (error) {
        let { data } = error.response;
        if (data.message) {
          this.$toast.error(data.message);
        }
      }

      this.emailReset.dialog = true;
    },
    emailClickHandler() {
      this.emailReset.email = "";
      this.emailReset.password = "";
      this.emailReset.dialog = true;
    },
    async fetchTimeZone(val) {
      let params = {
        cca2: val
      };

      let { data } = await coachTimezoneApi(this.$axios).getTimezone(params);

      if (data.timezone) {
        this.form.contactInformation.timezone = data.timezone;
      }
    },
    async fetchSettings() {

      let { data } = await coachSettingApi(this.$axios).get();

      if (data.notificationCategoryList.length) {
        data.notificationCategoryList.forEach(item => {
          this.form.notifications.push(item);
        });
      }

      if (data.countryList) {
        data.countryList.forEach(item => {
          this.form.countryList.push(item);
        });
      }

      if (data.userSetting) {
        this.form.contactInformation.firstName = data.userSetting.firstName;
        this.form.contactInformation.lastName = data.userSetting.lastName;
        this.form.contactInformation.country = data.userSetting.country;
        this.form.contactInformation.address = data.userSetting.address;
        this.form.contactInformation.zipCode = data.userSetting.zipCode;
        this.form.contactInformation.city = data.userSetting.city;
        if(data.userSetting.timezone){
          this.form.contactInformation.timezone = data.userSetting.timezone;
        }
        this.form.activeNotifications = data.userSetting.activeNotificationCategories;
        this.form.email = data.userSetting.email;
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
        // console.log(data);
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
    changeNotification(notification) {
      let hasNotificaion = false;
      this.form.activeNotifications.forEach(item => {
        if (item.id == notification.id) {
          hasNotificaion = true;
        }
      });
      if (hasNotificaion) {
        let index = this.form.activeNotifications.findIndex(
          item => item.id == notification.id
        );
        // console.log(index);
        this.form.activeNotifications.splice(index, 1);
      } else {
        this.form.activeNotifications.push(notification);
      }
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
  security-title {
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
  .invoice-identity,
  .notification {
    .v-input .v-input__slot {
      box-shadow: none;
      margin-bottom: 0px !important;
      .v-label {
        color: #49556a !important;
      }
    }
  }

  .dawa-autocomplete-suggestions {
    margin: 0.3em 0 0 0;
    padding: 0;
    text-align: left;
    border-radius: 0.3125em;
    background: #fcfcfc;
    box-shadow: 0 0.0625em 0.15625em rgba(0, 0, 0, 0.15);
    position: absolute;
    left: 0;
    right: 0;
    z-index: 9999;
    overflow-y: auto;
    box-sizing: border-box;
  }

  .dawa-autocomplete-suggestions .dawa-autocomplete-suggestion {
    margin: 0;
    list-style: none;
    cursor: pointer;
    padding: 0.4em 0.6em;
    color: #333;
    border: 0.0625em solid #ddd;
    border-bottom-width: 0;
  }
  value
    .dawa-autocomplete-suggestions
    .dawa-autocomplete-suggestion:first-child {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
  }

  .dawa-autocomplete-suggestions .dawa-autocomplete-suggestion:last-child {
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
    border-bottom-width: 0.0625em;
  }

  .dawa-autocomplete-suggestions .dawa-autocomplete-suggestion.dawa-selected,
  .dawa-autocomplete-suggestions .dawa-autocomplete-suggestion:hover {
    background: #f0f0f0;
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
