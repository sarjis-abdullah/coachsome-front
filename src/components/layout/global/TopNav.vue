<template>
  <div class="top-nav">
    <v-app-bar
      app
      dense
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      :color="color"
      :light="isLight"
      :dark="isDark"
      elevation="0"
    >
      <!-- Logo and Slogan-->
      <v-toolbar-title class="ml-0">
        <div v-if="isLight" class="d-flex justify-center align-center">
          <NuxtLink :to="localePath('/')">
            <img :src="require('@/assets/images/logo-dark.svg')" alt="logo" />
          </NuxtLink>
          <span class="slogan d-none d-md-flex d-lg-flex ml-2 mt-2">{{
            $t("front_slogan_text")
          }}</span>
        </div>
        <div v-if="isDark" class="d-flex justify-center align-center">
          <NuxtLink :to="localePath('/')">
            <img
              class="d-none d-md-flex d-lg-flex"
              :src="require('@/assets/images/logo.svg')"
              alt="logo"
            />
            <img
              class="d-sm-flex d-xs-flex d-md-none"
              :src="require('@/assets/images/logo-icon-light.svg')"
              alt="logo"
            />
          </NuxtLink>
        </div>
      </v-toolbar-title>

      <!-- Search -->
      <slot name="sport-search">
        <div class="d-sm-flex d-xs-flex d-md-none mx-5">
          <!-- <sport-search :style="{ maxWidth: '350px' }" /> -->
        </div>
      </slot>

      <v-spacer></v-spacer>

      <span class="d-none d-md-flex d-lg-flex">
        <!-- Language -->
        <client-only>
          <v-menu offset-y bottom transition="slide-y-transition" open-on-hover>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-if="!isLoggedIn"
                v-on="on"
                v-bind="attrs"
                depressed
                small
                color="transparent"
              >
                <flag :iso="currentLocale.icon" v-bind:squared="false" />
              </v-btn>
            </template>
            <v-list dense nav>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="subtitle-2 text-uppercase">
                    {{ $t("topnav_label_txt_translation") }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item-group
                v-model="currentLocaleIndex"
                color="primary-light-1"
                dense
              >
                <template>
                  <nuxt-link
                    v-for="(locale, i) in availableLocales"
                    :key="locale.code"
                    :to="switchLocalePath(locale.code)"
                  >
                    <v-list-item :key="i" :value="i">
                      <v-list-item-avatar size="20" tile>
                        <flag :iso="locale.icon" v-bind:squared="false" />
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ $t(locale.tKey) }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </nuxt-link>
                </template>
              </v-list-item-group>
            </v-list>
          </v-menu>
        </client-only>

        <!-- Currency -->
        <v-menu offset-y bottom open-on-hover transition="slide-y-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              small
              v-if="!isLoggedIn"
              :color="colorOfTheTextBtn"
              text
              v-bind="attrs"
              v-on="on"
              class="text-normal mr-5"
            >
              {{ currencyBtnText }}
            </v-btn>
          </template>
          <v-list dense nav>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="subtitle-2 text-uppercase">
                  {{ $t("topnav_label_txt_currency") }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item-group
              v-model="selectedCurrencyCode"
              color="primary-light-1"
            >
              <template v-for="(item, i) in currencyItems">
                <v-list-item
                  :key="i"
                  :value="item.code"
                  @click="handleCurrencyChnage(item)"
                >
                  <v-list-item-avatar size="20" tile>
                    <span>
                      {{ item.symbol }}
                    </span>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-text="item.code"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
        </v-menu>

        <!-- Marketplace -->
        <v-btn
          small
          class="text-normal"
          :color="colorOfTheTextBtn"
          :to="localePath({ name: navItems.marketplace.name })"
          text
          nuxt
          >{{ $t(navItems.marketplace.t_key) }}</v-btn
        >

        <!-- Chat -->
        <message-btn
          class="text-normal"
          small
          :color="colorOfTheTextBtn"
          v-if="isLoggedIn"
          :to="localePath(navItems.message.path)"
          text
        >
          {{ $t(navItems.message.t_key) }}
        </message-btn>

        <!-- About -->
        <v-btn
          small
          class="text-normal"
          :color="colorOfTheTextBtn"
          :to="localePath(navItems.about.path)"
          text
          v-if="!isLoggedIn"
          >{{ $t(navItems.about.t_key) }}</v-btn
        >

        <!-- Login -->
        <v-btn
          small
          class="text-normal"
          :color="colorOfTheTextBtn"
          text
          @click.stop="loginBtnHandle"
          v-if="!isLoggedIn"
          >{{ $t(navItems.login.t_key) }}</v-btn
        >

        <!-- Coach-Booking -->
        <v-btn
          small
          class="text-normal"
          v-if="isAuthCoach"
          :to="localePath(navItems.coachBooking.path)"
          text
          :color="colorOfTheTextBtn"
          >{{ $t(navItems.coachBooking.t_key) }}</v-btn
        >

        <!-- Athlete-Booking -->
        <v-btn
          small
          class="text-normal"
          v-if="isAuthAthlete"
          :to="localePath(navItems.athleteBooking.path)"
          text
          :color="colorOfTheTextBtn"
          >{{ $t(navItems.athleteBooking.t_key) }}</v-btn
        >

        <!-- Coach-Edit-Profile -->
        <v-btn
          small
          class="text-normal"
          v-if="isAuthCoach"
          :to="localePath(navItems.coachEditProfile.path)"
          text
          :color="colorOfTheTextBtn"
          >{{ $t(navItems.coachEditProfile.t_key) }}</v-btn
        >

        <!-- Athlete-Edit-Profile -->
        <v-btn
          small
          class="text-normal"
          v-if="isAuthAthlete"
          @click="athleteProfileHandle"
          text
          :color="colorOfTheTextBtn"
          >{{ $t(navItems.athleteEditProfile.t_key) }}</v-btn
        >
      </span>

      <!-- Filter btn for marketplace page -->
      <span v-if="isMarketplacePage" class="d-sm-flex d-xs-flex d-md-none">
        <v-btn
          small
          class="text-normal mr-3"
          icon
          :color="colorOfTheTextBtn"
          @click="handleFilterBtnClick"
        >
          <v-icon small>mdi-filter</v-icon>
        </v-btn>
      </span>

      <!-- Register -->
      <span v-if="!isLoggedIn">
        <v-btn
          class="text-normal"
          small
          depressed
          dark
          :to="localePath(navItems.register.path)"
          color="primary-light-1"
          >{{ $t(navItems.register.t_key) }}</v-btn
        >
      </span>

      <!-- Avatar -->
      <span v-if="isLoggedIn">
        <avatar />
      </span>

      <span v-if="!isLoggedIn" class="d-sm-flex d-xs-flex d-md-none">
        <burger />
      </span>
    </v-app-bar>
  </div>
</template>

<script>
import { pathData } from "@/data";
import { bookingHelper } from "@/helper";
import { currencyService } from "@/services";
import Avatar from "@/components/artifact/global/Avatar";
import Burger from "@/components/artifact/global/Burger";
import MessageBtn from "@/components/artifact/global/MessageBtn";
import SportSearch from "@/components/artifact/global/SportSearch";

export default {
  props: {
    theme: {
      type: String,
      default: "dark"
    },
    color: {
      type: String,
      default: "dark"
    }
  },
  components: {
    avatar: Avatar,
    burger: Burger,
    MessageBtn,
    SportSearch
  },
  data() {
    return {
      currentLocaleIndex: 0,
      currencyItems: currencyService.all(),
      selectedCurrencyCode: currencyService.currentCurrencyCode(),
      searchBar: {
        selectedCategory: null,
        loading: false,
        categoryItems: []
      },
      navItems: {
        language: {
          key: "language",
          icon: "folder_open",
          t_key: "nav_item_language"
        },
        marketplace: {
          key: "marketplace",
          icon: "folder_open",
          t_key: "nav_item_marketplace",
          path: pathData.pages.marketplace.path,
          name: pathData.pages.marketplace.name
        },
        about: {
          key: "about",
          icon: "folder_open",
          t_key: "nav_item_about",
          path: pathData.pages.about
        },
        login: {
          key: "login",
          icon: "folder_open",
          t_key: "nav_item_login",
          path: pathData.pages.login
        },
        register: {
          key: "register",
          icon: "folder_open",
          t_key: "nav_item_signup",
          path: pathData.pages.register
        },
        coachEditProfile: {
          key: "coachEditProfile",
          icon: "folder_open",
          t_key: "app_bar_dashboard_item_my_service",
          path: pathData.coach.editProfile
        },
        athleteEditProfile: {
          key: "athleteEditProfile",
          icon: "folder_open",
          t_key: "app_bar_dashboard_item_my_service",
          path: pathData.athlete.editProfile
        },
        message: {
          key: "message",
          icon: "folder_open",
          t_key: "app_bar_dashboard_message",
          path: pathData.pages.chat
        },
        coachBooking: {
          key: "booking",
          icon: "folder_open",
          t_key: "app_bar_dashboard_booking",
          path: pathData.coach.bookings
        },
        athleteBooking: {
          key: "booking",
          icon: "folder_open",
          t_key: "app_bar_dashboard_booking",
          path: pathData.athlete.bookings
        }
      }
    };
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales;
    },
    currentLocale() {
      return this.$i18n.locales.find(i => i.code == this.$i18n.locale);
    },
    isMarketplacePage() {
      return this.localePath(pathData.pages.marketplace) == this.$router.currentRoute.path;
    },
    currencyBtnText() {
      const currency = currencyService.selectedCurrency();
      if (currency) {
        return currency.symbol + currency.code;
      } else {
        return "";
      }
    },
    colorOfTheTextBtn() {
      return this.theme === "light" ? "primary-light-1" : "white";
    },
    isLight() {
      return this.theme === "light";
    },
    isDark() {
      return this.theme === "dark";
    },
    isAuthCoach() {
      return this.$auth.loggedIn && this.$auth.hasRole("coach");
    },
    isAuthAthlete() {
      return this.$auth.loggedIn && this.$auth.hasRole("athlete");
    },
    showSignUpBtn() {
      return !this.$auth.loggedIn;
    },
    isLoggedIn() {
      return this.$auth.loggedIn;
    }
  },
  watch: {
    "$i18n.locale": {
      immediate: true,
      handler: function() {
        this.currentLocaleIndex = this.$i18n.locales.findIndex(
          i => i.code == this.$i18n.locale
        );
      }
    }
  },
  created() {},
  methods: {
    handleFilterBtnClick() {
      this.$store.dispatch("marketplace/showFilterDialog");
    },
    handleCurrencyChnage(item) {
      currencyService.setCurrencyCode(item.code);
      location.reload();
    },
    athleteProfileHandle() {
      bookingHelper.removeBookingInfoFromStorage();
      this.$router.push(this.localePath(this.navItems.athleteEditProfile.path));
    },
    toggleDrawer(event) {
      this.$root.$emit("toggle-front-drawer", event);
    },
    loginBtnHandle() {
      return this.$router.push(this.localePath(pathData.pages.login));
    }
  }
};
</script>

<style lang="scss" scoped>
.top-nav {
  .slogan {
    font-family: $font-family;
    font-style: italic;
    font-size: 14px;
    line-height: 19px;
    color: $primary-light-1;
  }
}
</style>
