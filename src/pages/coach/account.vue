<template>

<v-container fluid>
    <mobile-top-nav extraClass="body-bg-secondary" :headerText="$t('payout_info_input_title_account')">
      <template v-slot:goBack>
        <v-btn
          icon
          @click="handleBack"
        >
          <v-icon class="common-top-back-icon">mdi-chevron-left</v-icon>
        </v-btn>
      </template>
      <template v-slot:action>
        <router-link class="common-top-save-button" to="" @click.native="handleSaveBtnClick()">{{$t("btn_label_txt_save")}}</router-link>
      </template>
    </mobile-top-nav>
    
    <v-row
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="6"
        lg="4"
        xs="12"
      >

        <v-row
          align="center"
          justify="center"
        >
          <v-col cols="12 " class="py-0 my-0">
             <p class="account-label mt-2">{{$t("text_name")}}</p>
          </v-col>
          <v-col cols="6" class="py-0 my-0">
            <!-- First name -->
            <v-text-field
              outlined
              dense
              hide-details
              class="cs-input-text-field-login"
              style="color:#15577C"
              v-model="form.contactInformation.firstName"
              :label="$t('setting_input_hint_first_name')"
            />
          </v-col>
          <v-col cols="6" class="py-0 my-0">

            <!-- Last Name -->
            <v-text-field
              outlined
              dense
              hide-details
              class="cs-input-text-field-login"
              style="color:#15577C"
              v-model="form.contactInformation.lastName"
              :label="$t('setting_input_hint_last_name')"
            />
          </v-col>
          <v-col cols="12">
            <!-- {{$t("pwa_email")}} -->
            <p class="account-label">{{$t("pwa_email")}}</p>
            <v-text-field
              outlined
              dense
              hide-no-data
              hide-details
              v-model="form.email"
              @click="emailClickHandler"
              :label="$t('pwa_email')"
              :rules="rule.email"
              name="input-10-1"
              color="red"
              id="email"
              class="cs-input-text-field-login"
              required
              style="color:#15577C"
            />

            <!-- Time-zone Start -->
            <p class="account-label mt-2" >{{$t("filter_item_text_country")}}</p>
            <v-autocomplete
              autocomplete="off"
              v-model="form.contactInformation.country"
              @change="handleCountryChange"
              :items="form.countryList"
              item-text="displayName"
              item-value="code"
              outlined
              dense
              hide-no-data
              hide-details
              append-icon="expand_more"
              :label="$t('setting_input_hint_country')"
            ></v-autocomplete>
            <p class="account-label mt-2" >{{$t("setting_sec_timezone_title")}}</p>
            <v-text-field
              v-model="form.contactInformation.timezone"
              readonly
              outlined
              hide-no-data
              hide-details
              dense
              :label="$t('setting_sec_timezone_title')"
              class="mt-3"
            ></v-text-field>

            <!-- Time-zone End -->
          </v-col>
        </v-row>

          <v-row v-if="form.contactInformation.has_password">
            <v-col cols="12">
              <!-- Password Area -->
              <p class="account-label mt-2">{{$t("setting_label_old_password")}}</p>
              <v-text-field
                outlined
                dense
                hide-no-data
                hide-details
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
                v-model="form.password.oldPassword"
                :rules="rule.oldPassword"
                name="input-10-1"
                color="red"
                id="old_password"
                class="cs-input-text-field-login"
                required
                style="color:#15577C"
              />
              <p class="account-label mt-2">{{$t("setting_label_new_password")}}</p>
              <v-text-field
                outlined
                dense
                hide-no-data
                hide-details
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show2 ? 'text' : 'password'"
                @click:append="show2 = !show2"
                v-model="form.password.newPassword"
                :rules="rule.newPassword"
                name="input-10-1"
                color="red"
                id="new_password"
                class="cs-input-text-field-login"
                required
                style="color:#15577C"
              />
              
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <v-btn
                color="primary-light-1"
                small
                dark
                @click.stop="handlePasswordChangeBtn()"
                >{{ $t("setting_btn_label_change_password") }}
              </v-btn>
            </v-col>
          </v-row>

          <v-row v-else>
            <v-col cols="12" class="pb-0 mb-0">
              <p class="account-label">{{$t("setting_label_new_password")}}</p>
              <v-text-field
                outlined
                dense
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                color="red"
                :label="$t('password_reset_title')"
                @click:append="show1 = !show1"
                id="password"
                class="cs-input-text-field-login"
                :rules="passwordRules"
                required
                style="color:#15577C"
                @keyup.enter="addNewPassBtnHandle"
              />
              <p class="account-label">{{$t("pwa_confirm_new_password")}}</p>
              <v-text-field
                outlined
                dense
                v-model="rePassword"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show2 ? 'text' : 'password'"
                name="input-10-1"
                color="red"
                :label="$t('pwa_confirm_new_password_hint')"
                @click:append="show2 = !show2"
                id="rePassword"
                class="cs-input-text-field-login"
                :rules="[passwordConfirmationRule]"
                required
                style="color:#15577C"
                @keyup.enter="addNewPassBtnHandle"
              />
            </v-col>
            <v-col cols="12" class="d-flex justify-center pt-0 mt-0">
              <v-form
                ref="passwordForm"
                v-model="valid"
                class="d-block w-100 d-flex justify-center"
                lazy-validation
              >
                <v-btn
                  color="primary-light-1"
                  small
                  dark
                  :loading="show_loading_on_add_pass_btn"
                  @click="addNewPassBtnHandle()"
                  >{{ $t("text_add_new_pasword") }}
                </v-btn>
              </v-form>
            </v-col>
          </v-row>

        <!-- {{$t("pwa_email")}} Reset Dialog Start -->
        <v-row v-if="emailReset.dialog">
          <v-col>
            <v-dialog
              v-model="emailReset.dialog"
              persistent
              max-width="400"
            >
              <v-card>
                <v-card-title class="headline">{{$t("pwa_email")}}</v-card-title>
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
                    {{$t("btn_label_cancel")}}
                  </v-btn>
                  <v-btn
                    color="primary-light-1"
                    text
                    @click="emailResetSaveHandle"
                  >
                    {{$t("btn_label_txt_save")}}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
        <!-- {{$t("pwa_email")}} Reset Dialog End -->
        <!-- Password Reset Dialog Start -->
        <v-row v-if="passwordReset.dialog">
          <v-col>
            <v-dialog
              v-model="passwordReset.dialog"
              persistent
              max-width="400"
            >
              <v-card>
                <v-card-title class="headline">{{$t("btn_label_send")}}</v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12">
                     <p>{{$t("pwa_sure_alert")}}</p>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary-light-1"
                    text
                    @click="passwordResetCancelHandle"
                  >
                    {{$t("btn_label_cancel")}}
                  </v-btn>
                  <v-btn
                    color="primary-light-1"
                    text
                    @click="passwordResetSaveHandle"
                  >
                    {{$t("pwa_yes_reset")}}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
        <!-- Password Reset Dialog End -->
        <!-- Delete Area -->
        <v-row>
          <v-col cols="12">
            <v-expansion-panels focusable>
              <v-expansion-panel>
                <v-expansion-panel-header class="danger-title">{{$t("pwa_danger_zone")}}
                  <template v-slot:actions>
                    <v-icon color="error">
                      mdi-chevron-down
                    </v-icon>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content class="danger-bg">
                  <v-row justify="center" align="center mt-2">
                    <v-col cols="12" class="d-flex justify-center">
                      <span class="danger-body-title">{{$t("athlete_settings_card_title_delete_acc")}}</span>
                    </v-col>
                    <v-col cols="12" class="d-flex justify-center">
                      <span class="danger-body-sub-title">{{$t("athlete_settings_section_delete_account_desc")}}</span>
                    </v-col>
                    <v-col cols="6" class="d-flex justify-center mb-10">
                      <v-btn 
                        color="#C7311D"
                        class="white--text"
                        block
                        @click.stop="handleDeleteAccountBtnClick"
                      >{{$t("athlete_settings_card_title_delete_acc")}}</v-btn>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
        <!-- Delete Account dialog -->
        <v-row v-if="deleteAccount.dialog">
          <v-col>
            <v-dialog
              v-model="deleteAccount.dialog"
              persistent
              max-width="400"
            >
              <v-card>
                <v-card-title class="headline">
                  {{$t("athlete_settings_card_title_delete_acc")}} ?
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="deleteAccount.password"
                        dense
                        solo
                        type="password"
                        label="Enter Password"
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
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { coachSettingApi, coachTimezoneApi, authApi } from "@/api";
import { endpoint } from "../../api";
import { pathData } from "@/data";
import ClientBackFooter from "@/components/artifact/global/ClientBackFooter";
import MobileTopNav from '@/components/layout/global/MobileTopNav'

export default {
  layout: "common",
  components: {
    ClientBackFooter,
    MobileTopNav
  },
  data() {
    return {
      show1: false,
      show2: false,
      tab: null,
      emailReset: {
        dialog: false,
        email: "",
        password: ""
      },
      passwordReset: {
        dialog: false,
      },
      deleteAccount: {
        dialog: false,
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
          timezone: "",
          has_password: ""
        },
        email: "",
        password: {
          oldPassword: "",
          newPassword: ""
        },
        timeZone: "",
        countryList: [],
      },
      rule: {
        oldPassword: [],
        newPassword: [],
        email: []
      },
      valid: true,
      show_loading_on_add_pass_btn: false,
      password: "",
      rePassword: "",
      passwordRules: [
        v => !!v || "Password is required",
        v => /^(?=.*[A-Z]).*$/.test(v) || "At least one upper case letter.",
        v => (v && v.length >= 6) || "Password must be minimum 6 characters"
      ],
      reEnterPasswordRules: [
        v => !!v || "Password is required",
        v => /^(?=.*[A-Z]).*$/.test(v) || "At least one upper case letter.",
        v => (v && v.length >= 6) || "Password must be minimum 6 characters",
        v => (v && v.length >= 6) || "Password must be minimum 6 characters"
      ]
    };
  },
  watch: {
    "form.contactInformation.country": function() {},
    "$vuetify.breakpoint.smAndUp" : function() {
      this.$router.push(this.localePath(pathData.coach.settings));
    }
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
      ],
      email: [
      (v) => !!v || this.$i18n.t("valid_required_email"),
      (v) => /.+@.+\..+/.test(v) || this.$i18n.t("valid_valid_email"),
      ],
    }),
    this.fetchSettings();
  },
  methods: {
    addNewPassBtnHandle() {
      if (this.$refs.passwordForm.validate()) {
        this.show_loading_on_add_pass_btn = true;
        let payload = {
          email: this.form.email,
          password: this.password
        };
        authApi(this.$axios)
          .addNewPassword(payload)
          .then((response) => {
            this.$toast.success(response.data.message);
            this.form.contactInformation.has_password = true;
            this.show_loading_on_add_pass_btn = false;
          })
          .catch(({ response }) => {
            if (response.data.message) {
              this.$toast.error(response.data.message);
            }
            this.show_loading_on_add_pass_btn = false;
          });
      }

    },
    handleBack(){
      this.$router.push(this.localePath(pathData.coach.settings));
    },
    async handleDeleteAccount() {
      try {
        await this.$axios.delete(
          endpoint.ACCOUNTS_DELETE + "?password=" + this.deleteAccount.password
        );
        await this.$auth.logout();
        this.$router.push(this.localePath(pathData.pages.home));
      } catch (err) {
        // this.$toast.error(err.response.data.error.message);
        this.$toast.error("Something went wrong, Please try again!");
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
    handlePasswordChangeBtn(){
      this.passwordReset.dialog = true;
    },
    async handlePasswordChange() {
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
        this.form.password.oldPassword = "";
        this.form.password.newPassword = "";
      } catch (error) {
        this.form.password.oldPassword = "";
        this.form.password.newPassword = "";
        let { data } = error.response;
        if (data.message) {
          this.$toast.error(data.message);
        }
      }
      this.passwordReset.dialog = false;
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
    passwordResetCancelHandle() {
      this.form.password.oldPassword = "";
      this.form.password.newPassword = "";
      this.passwordReset.dialog = false;
    },
    passwordResetSaveHandle() {
      this.handlePasswordChange();
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
        // this.setTimezone();
      }
    },
    async fetchSettings() {
      let { data } = await coachSettingApi(this.$axios).get();
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
        this.form.contactInformation.has_password = data.userSetting.has_password;
        this.form.activeNotifications =
          data.userSetting.activeNotificationCategories;
        this.form.email = data.userSetting.email;
      }
    },
  }
};
</script>


<style scoped>
.save-button{
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
  /* identical to box height */

  text-align: right;
  text-decoration-line: underline;

  color: #15577C!important;
}
.v-application {
  line-height: 0!important;
}
.w-100{
  width: 100% !important;
}

.setting-title{
  font-family: Open Sans;
  font-style: normal;
  font-weight: 300;
  font-size: 36px;
  line-height: 49px;
  /* identical to box height */

  text-transform: uppercase;

  /* Dusty blue */

  color: #15577C;

}
.danger-title{
  /* Section headline */

  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 25px;
  /* identical to box height */

  text-transform: uppercase;

  /* Thunderbird */

  color: #C7311D;
  background: #f8e7e4!important;

}
.danger-bg{
  background: #f8e7e4!important;
}

.danger-body-title{
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 25px;
  /* identical to box height */

  text-transform: uppercase;

  /* Dusty blue */

  color: #15577C;

}

.danger-body-sub-title{
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  text-align: center;

  /* G600 */

  color: #6F8098;

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

.login-option-btn{
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 16px;
  text-align: center;
  letter-spacing: 1px;
  width: 100%;
  text-transform: none !important;
  color: #15577C;
  
}


.account-label{
    /* Section headline */

    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 25px;
    /* identical to box height */

    text-transform: uppercase;

    /* Dusty blue */

    color: #15577C;

}






.tm-login-logo {
  height: 100px;
}
.cs-forgot-password-sec{
  height: calc(100vh - 248px);
  position: relative;
  min-height: 280px;
}
.cs-forgot-password-middle {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.cs-forgot-password-footer {
  height: 100px;
}

.align-items-to-center{
  display: flex;
  justify-content: center;
  align-items: center;
}

.forgot-password-title{
    font-family: Open Sans;
    font-style: normal;
    font-weight: 800;
    font-size: 25px;
    line-height: 34px;
    display: flex;
    align-items: center;
    text-align: center;

    color: #15577C;
}

.forgot-password-validation-subtitle{
    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    display: flex;
    align-items: center;
    text-align: center;

    color: #15577C;
}

.forgot-password-footer-text{
    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 14px;
    display: flex;
    align-items: center;
    text-align: center;

    color: #15577C;
}
</style>
