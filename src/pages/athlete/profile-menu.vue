<template>

<v-container fluid grid-list-md text-xs-center class="d-flex">
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
        <v-row class="page-top-header-row body-bg">
            <v-col cols="12" class="page-top-header-column px-0 mx-0" style="vertical-align: middle">
              <span class="header-title">{{$t("pwa_profile_menu")}}</span>
              <v-avatar size="32px" style="float:right" class="mt-2" v-if="avatarImage">
                <v-img aspect-ratio="1" :src="avatarImage" alt="Avatar" />
              </v-avatar>
              <v-avatar color="primary-light-1"  style="float:right" class="mt-2" size="55px" v-else>
                <span>{{ initialImageContent }}</span>
              </v-avatar>
              <br>
              <router-link class="show-profile" to="" @click.native="showProfile()">{{$t("pwa_show_profile")}}</router-link>
            </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-list class="body-bg">
              <!-- Edit Profile -->
              <v-list-item link @click.stop="handleEditProfile">
                <v-list-item-icon>
                  <v-img :src="require('@/assets/img/svg-icons/new/edit.svg')" alt="edit" />
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title class="list-text">{{$t("pwa_edit_profile")}}</v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon>
                   <v-icon class="common-top-back-icon">mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>
              <!-- Payment -->
               <v-list-item link @click.stop="handlePaymentBtn">
                <v-list-item-icon>
                  <v-img  :src="require('@/assets/img/svg-icons/new/credit-card.svg')" alt="payment" />
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title class="list-text">{{$t("pwa_payment_menu")}}</v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon>
                   <v-icon class="common-top-back-icon">mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-col cols="3">
            <v-img  :src="require('@/assets/img/svg-icons/new/line.svg')" alt="payment" />
          </v-col>
        </v-row>
        <!-- <div class="cs-forgot-password-sec">
          <div class="cs-forgot-password-middle">
            <v-row
              align="center"
              justify="center"
            >
              <v-col cols="12" class="align-items-to-center">
                <p class="forgot-password-title">{{ $t('forgot_password_heading_title') }}</p>
              </v-col>
            </v-row>
          </div>
        </div> -->

        <v-row>
          <v-col cols="12">
            <v-list class="body-bg">


              <v-list-item link @click.stop="handleLanguageBtn">
                <v-list-item-icon style="font-size:18px">
                  <flag class="mt-1" :iso="currentLocale.icon" v-bind:squared="false" />
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title class="list-text text-capitalize">{{ currentLocale.name }}</v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon>
                   <v-icon class="common-top-back-icon">mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>

              <!-- Currency -->
              <v-list-item link @click.stop="handleCurrencyBtn">
                <v-list-item-icon>
                  <h2 class="currency-symbol">{{currencySymbol}}</h2>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title class="list-text">{{currencyName}}</v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon>
                   <v-icon class="common-top-back-icon">mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>

              <v-list-item link @click.stop="handleSetting">
                <v-list-item-icon>
                  <v-img  :src="require('@/assets/img/svg-icons/new/setting.svg')" alt="setting" />
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title class="list-text">{{$t("dropdown_item_settings")}}</v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon>
                   <v-icon class="common-top-back-icon">mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>

        <v-row class="justify-center">
          <v-col cols="3">
            <v-img  :src="require('@/assets/img/svg-icons/new/line.svg')" alt="payment" />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-list class="body-bg">
              <!-- terms -->
              <v-list-item link @click.stop="handleTermsBtn">
                <v-list-item-icon>
                  <v-img  :src="require('@/assets/img/svg-icons/new/book-open.svg')" alt="payment" />
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title class="list-text">{{$t("global_url_terms_of_use")}}</v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon>
                   <v-icon class="common-top-back-icon">mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>

              <!-- Privacy Policy -->
              <v-list-item link @click.stop="handlePrivacyPolicyBtn">
                <v-list-item-icon>
                  <v-img  :src="require('@/assets/img/svg-icons/new/book-open.svg')" alt="payment" />
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title class="list-text">{{$t("global_url_privacy_policy")}}</v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon>
                   <v-icon class="common-top-back-icon">mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>

              <!-- Cookie Policy -->
              <v-list-item link @click.stop="handleCookiePolicyBtn">
                <v-list-item-icon>
                  <v-img  :src="require('@/assets/img/svg-icons/new/book-open.svg')" alt="payment" />
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title class="list-text">{{$t("footer_url_link_cookie_policy")}}</v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon>
                   <v-icon class="common-top-back-icon">mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>

              <!-- Refund Policy -->
              <v-list-item link @click.stop="handleRefundPolicyBtn">
                <v-list-item-icon>
                  <v-img  :src="require('@/assets/img/svg-icons/new/book-open.svg')" alt="payment" />
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title class="list-text">{{$t("footer_link_fefund_policy")}}</v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon>
                   <v-icon class="common-top-back-icon">mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>



        <v-row class="justify-center">
          <v-col cols="8">
            <v-btn
                outlined
                color="#49556A"
                class="login-option-btn"
                block
                @click="logout()"
            >
                <img class="btn-icon"  :src="require('@/assets/img/svg-icons/new/unlock.svg')" alt="">  <span class="social-login-btn-facebook-text btn-text">{{$t("dropdown_item_log_out")}}</span>
            </v-btn>
          </v-col>
        </v-row>
        <v-row class="justify-center pt-0 mt-0 pb-8">
          <v-col cols="8">
            <v-btn
              color="#D61BA2"
              class="switch-option-btn"
              block
              v-if="isSwitchedUser"
              @click="revertUser()"
            >
              {{$t("pwa_switch_to_own_user")}}
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { pathData } from "@/data";
import { currencyService } from "@/services";
import impersonateAdminApi from "@/api/admin/impersonate";

export default ({
  layout: "common",
  data(){
    return {
      editProfile: {
          name: "Edit Profile",
          path: pathData.coach.editProfile,
          key: "edit_profile",
          icon: "mdi-menu-down",
          t_key: "dropdown_edit_profile"
        },
        athleteEditProfile: {
          name: "Edit Profile",
          path: pathData.athlete.editProfile,
          key: "edit_profile",
          icon: "mdi-menu-down",
          t_key: "dropdown_edit_profile"
        },
    }
  },
  computed: {
      isSwitchedUser() {
        if (this.authUser()) {
          return this.authUser().is_switched;
        } else {
          return false;
        }
      },
      avatarImage() {
        if (this.authUser()) {
          return this.authUser().image;
        } else {
          return this.initialImageContent;
        }
      },
      initialImageContent() {
        if (this.authUser()) {
          return (
            this.authUser().first_name.substring(0, 1) +
            this.authUser().last_name.substring(0, 1)
          );
        } else {
          return "";
        }
      },
      currencyName(){
        const currency = currencyService.selectedCurrency();
        if (currency) {
          return currency.code;
        } else {
          return "";
        }
      },
      currencySymbol(){
        const currency = currencyService.selectedCurrency();
        if (currency) {
          return currency.symbol;
        } else {
          return "";
        }
      },
      currentLocale() {
        return this.$i18n.locales.find(i => i.code == this.$i18n.locale);
      },
    },
    methods: {
      revertUser() {
        impersonateAdminApi(this.$axios)
          .revert()
          .then(({ data }) => {
            this.$auth.setUser(data.user);
            this.$auth.setUserToken(data.accessToken);
            if (this.$auth.hasRole(["coach"])) {
              this.$router.push(this.localePath(pathData.coach.editProfile));
            } else if (this.$auth.hasRole(["athlete"])) {
              this.$router.push(this.localePath(pathData.athlete.editProfile));
            } else {
              this.$router.push(this.localePath(pathData.admin.dashboard));
            }
          })
          .catch(() => {});
      },
      showProfile() {
        this.$router.push(this.localePath(pathData.pages.publicProfile(this.$auth.user.user_name)));
      },
      authUser() {
        return this.$auth.user;
      },
      async logout(){
        await this.$auth.logout();
        this.$router.push(this.localePath(pathData.pages.home));
      },
      handleEditProfile() {
        this.$router.push(this.localePath(pathData.athlete.editProfile));
      },
      handleSetting(){
        this.$router.push(this.localePath(pathData.athlete.settings));
      },
      handlePaymentBtn(){
        this.$router.push(this.localePath(pathData.pages.payments));
      },
      handleLanguageBtn(){
        this.$router.push(this.localePath(pathData.pages.language));
      },
      handleCurrencyBtn(){
        this.$router.push(this.localePath(pathData.pages.currency));
      },
      handleTermsBtn(){
        this.$router.push(this.localePath(pathData.pages.terms));
      },
      handlePrivacyPolicyBtn(){
        this.$router.push(this.localePath(pathData.pages.policy));
      },
      handleCookiePolicyBtn(){
        this.$router.push(this.localePath(pathData.pages.cookiePolicy));
      },
      handleRefundPolicyBtn(){
        this.$router.push(this.localePath(pathData.pages.refundPolicy));
      }
    }
})
</script>


<style scoped>

.v-application {
  line-height: 0!important;
}
.w-100{
  width: 100% !important;
}

.header-title{
  font-family: Open Sans;
  font-style: normal;
  font-weight: 300;
  font-size: 36px;
  line-height: 49px;
  /* identical to box height */

  text-transform: uppercase;
  color: #49556A;

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
.switch-option-btn{
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 16px;
  text-align: center;
  letter-spacing: 1px;
  width: 100%;
  text-transform: none !important;
  color: white;
  
}
.currency-symbol{
  width: 15px;
  height: 16px;
  color: #49556A!important;
  text-align: center;
  text-transform: uppercase;
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
.show-profile{
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  text-decoration-line: underline;

  color: #49556A;
}
</style>
