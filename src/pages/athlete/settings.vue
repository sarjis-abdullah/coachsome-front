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
                                  <v-btn color="primary-light-1" class="px-12 white--text">Save Changes</v-btn>
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
                      Security
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
import { coachSettingApi, coachTimezoneApi } from "@/api";
import ClientBackFooter from "@/components/artifact/global/ClientBackFooter";
export default {
  layout: "athlete",
  components: {
    ClientBackFooter
  },
  data() {
    return {
      tab: null,
      emailReset: {
        dialog: false,
        email: "",
        password: ""
      },
      defaultSelected: { id: 1, code: 88 },
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
          timezone: this.form.contactInformation.timezone,
          notificatonCategories: this.form.activeNotifications.map(
            item => item.id
          )
        };
        let { data } = await coachSettingApi(this.$axios).updateSetting(
          payload
        );
        console.log(data);
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
        console.log(data);
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
        this.form.contactInformation.timezone = data.userSetting.timezone;
        this.form.activeNotifications =
          data.userSetting.activeNotificationCategories;
        this.form.email = data.userSetting.email;
      }

      console.log(data);
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
        console.log(index);
        this.form.activeNotifications.splice(index, 1);
      } else {
        this.form.activeNotifications.push(notification);
      }
    }
  }
};
</script>

<style lang="scss">
.setting-page--athlete {
  background: $body-bg;
  height: 100%;
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

  .square {
    width: 20px;
    height: 20px;
    border: 20px solid $primary-light-1;
    background: #15577c;
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
</style>
