<template>

<v-container fluid>

    <mobile-top-nav extraClass="body-bg-secondary" :headerText="$t('pwa_profile_menu')">
      <template v-slot:goBack >
       <span style="width: 10px"></span>
        <v-avatar size="32px"  v-if="avatarImage">
          <v-img aspect-ratio="1" :src="avatarImage" alt="Avatar" />
        </v-avatar>
        <v-avatar color="primary-light-1" size="32px" v-else>
          <span>{{ initialImageContent }}</span>
        </v-avatar>
      </template>
      <template v-slot:action>
        <v-avatar color="#F7FAFC" size="32px">
          <span></span>
        </v-avatar>
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
        
        <v-row>
          <v-col cols="12">
            <v-list class="body-bg">
              <!-- User List -->
              <v-list-item link @click.stop="handleUsers">
                <v-list-item-icon>
                  <v-img :src="require('@/assets/img/svg-icons/new/user-icon.svg')" alt="user_list" />
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title class="list-text">{{$t("pwa_user_list")}}</v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon>
                  <v-icon class="common-top-back-icon">mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>

              <!-- Order List -->
              <v-list-item link @click.stop="handleOrders">
                <v-list-item-icon>
                  <v-img :src="require('@/assets/img/svg-icons/new/basket-plus.svg')" alt="order_list" />
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title class="list-text">{{$t("pwa_order_list")}}</v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon>
                  <v-icon class="common-top-back-icon">mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>

              <!-- Exercise List -->
              <v-list-item link @click.stop="handleExercise">
                <v-list-item-icon>
                  <v-img :src="require('@/assets/img/svg-icons/new/exercise.svg')" alt="order_list" />
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title class="list-text">{{$t("dropdown_item_exercises")}}</v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon>
                  <v-icon class="common-top-back-icon">mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>

              <!-- Promo Codes -->
              <v-list-item link @click.stop="handlePromoCodes">
                <v-list-item-icon>
                  <v-img :src="require('@/assets/img/svg-icons/new/special-discount.svg')" alt="promo_codes" />
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title class="list-text">{{$t("pwa_promo_codes")}}</v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon>
                  <v-icon class="common-top-back-icon">mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>

              <!-- Payout request -->
              <v-list-item link @click.stop="handlePayoutRequests">
                <v-list-item-icon>
                  <v-img :src="require('@/assets/img/svg-icons/new/bank.svg')" alt="payout_request" />
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title class="list-text">{{$t("pwa_payout_request")}}</v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon>
                  <v-icon class="common-top-back-icon">mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>

              <!-- Translations -->
              <v-list-item link @click.stop="handleTranslations">
                <v-list-item-icon>
                  <v-img :src="require('@/assets/img/svg-icons/new/type-square.svg')" alt="translation" />
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title class="list-text">{{$t("dropdown_item_translation")}}</v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon>
                  <v-icon class="common-top-back-icon">mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>

              <!-- Logs -->
              <v-list-item link @click.stop="handleLogs">
                <v-list-item-icon>
                  <v-img :src="require('@/assets/img/svg-icons/new/books-pencil.svg')" alt="logs" />
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title class="list-text">{{$t("dropdown_item_logs")}}</v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon>
                  <v-icon class="common-top-back-icon">mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-col cols="11" class="pr-5 py-0">
            <div class="line"></div>
          </v-col>
        </v-row>
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
            </v-list>
          </v-col>
        </v-row>

        <v-row class="justify-center">
          <v-col cols="11" class="pr-5 py-0">
            <div class="line"></div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-list  class="body-bg">
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
          <v-col cols="11" class="pr-5 pt-0">
            <div class="line"></div>
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-col cols="11">
            <v-btn
              solo
              color="#15577C"
              class="login-option-btn"
              @click="logout()"
            >
              <img class="btn-icon"  :src="require('@/assets/img/svg-icons/unlock-white.svg')" alt="">  <span class="btn-text">{{$t("dropdown_item_log_out")}}</span>
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
import MobileTopNav from '@/components/layout/global/MobileTopNav'

export default ({
  layout: "admin",
  components: {MobileTopNav},
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
  watch:{
    "$vuetify.breakpoint.smAndUp" : function() {
      this.$router.push(this.localePath(pathData.admin.dashboard));
    }
  },
  computed: {
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
      showProfile() {
        this.$router.push(this.localePath(pathData.pages.publicProfile(this.$auth.user.user_name)));
      },
      authUser() {
        return this.$auth.user;
      },
      
      handleUsers() {
        this.$router.push(this.localePath(pathData.admin.userList));
      },

      handleOrders(){
        this.$router.push(this.localePath(pathData.admin.orderList));
      },
      handleExercise(){
        this.$router.push(this.localePath(pathData.admin.exercises));
      },
      handlePromoCodes(){
        this.$router.push(this.localePath(pathData.admin.promos));
      },
      handlePayoutRequests(){
        this.$router.push(this.localePath(pathData.admin.payoutRequest));
      },
      handleTranslations(){
        this.$router.push(this.localePath(pathData.admin.translation));
      },
      handleLogs(){
        this.$router.push(this.localePath(pathData.admin.userLog));
      },
      handleLanguageBtn(){
        this.$router.push(this.localePath(pathData.pages.language));
      },
      handleCurrencyBtn(){
        this.$router.push(this.localePath(pathData.pages.currency));
      },
      async logout(){
        await this.$auth.logout();
        this.$router.push(this.localePath(pathData.pages.home));
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
  /* margin-right: auto; */
  padding-right: 5px!important ;
}

.btn-text{
  /* margin-right: auto; */
  color: white;
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

  color: #15577C;
}
</style>
