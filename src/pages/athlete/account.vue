<template>

<v-container fluid >
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
        <span></span>
      </template>
    </mobile-top-nav>
    <!-- <v-container grid-list-md text-xs-center class="d-flex"> -->
      <v-row
        justify="center"
      >
        <v-col
          cols="11"
          sm="8"
          md="6"
          lg="4"
          xs="11"
        >
            

          <v-row
            align="center"
            justify="center"
          >
            <v-col cols="12">

              <!-- Email -->
              <p class="account-label mt-2">{{$t("pwa_email")}}</p>
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
            <v-col cols="6">
              <v-btn
                color="primary-light-1"
                small
                dark
                @click.stop="handlePasswordChangeBtn()"
                >{{ $t("setting_btn_label_change_password") }}
              </v-btn>
            </v-col>
          </v-row>

          <!-- Email Reset Dialog Start -->
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
          <!-- Email Reset Dialog End -->
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
    <!-- </v-container> -->
  </v-container>
</template>
<script>
import { endpoint, athleteSettingApi } from "../../api";
import { pathData, settingValueData, roleData } from "@/data";
import MobileTopNav from '@/components/layout/global/MobileTopNav'

export default {
  layout: "athlete",
  components: {MobileTopNav},
  data() {
    return {
      show1: false,
      show2: false,
      settingValueData,
      action: "security_identify",
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
  watch: {
    "$vuetify.breakpoint.smAndUp" : function() {
      this.$router.push(this.localePath(pathData.athlete.settings));
    }
  },
  computed: {
    redirectLink(){
      return this.localePath(pathData.athlete.settings);
    }
  },
  created() {
    this.fetchSettings();
  },
  mounted() {},
  methods: {
    handleBack(){
      this.$router.push(this.localePath(pathData.athlete.settings));
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
    },
    async fetchSettings() {
      let { data } = await athleteSettingApi(this.$axios).get();
      this.form.email = data.email;
      // if (data.userSetting) {
      //   this.form.contactInformation.firstName = data.userSetting.firstName;
      //   this.form.contactInformation.lastName = data.userSetting.lastName;
      //   this.form.contactInformation.country = data.userSetting.country;
      //   this.form.contactInformation.address = data.userSetting.address;
      //   this.form.contactInformation.zipCode = data.userSetting.zipCode;
      //   this.form.contactInformation.city = data.userSetting.city;
      //   this.form.contactInformation.timezone = data.userSetting.timezone;
      //   this.form.activeNotifications =
      //     data.userSetting.activeNotificationCategories;
      //   this.form.email = data.userSetting.email;
      // }
    },
  }
};
</script>


<style scoped lang="scss">

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
