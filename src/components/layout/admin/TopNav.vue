<template>
  <v-app-bar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    app
    elevation="0"
    dense
    dark
    :color="color"
  >
    <!-- Logo -->
      <img
        class="d-none d-md-flex d-lg-flex cursor-pointer"
        :src="require('@/assets/images/logo.svg')"
        alt="logo"
        @click="goToHome"
      />
      <img
        class="d-sm-flex d-xs-flex d-md-none cursor-pointer"
        :src="require('@/assets/images/logo-icon-light.svg')"
        alt="logo"
        @click="goToHome"
      />

    <!-- Search -->
    <sport-search
      class="d-sm-flex d-xs-flex d-md-none mx-5"
      :style="{ maxWidth: '350px' }"
    />
    <v-spacer></v-spacer>

    <!-- Main Menu -->
    <v-btn
      v-if="isSwitchedUser"
      @click="revertUser"
      outlined
      color="blue"
      light
      small
      >Switch to own user</v-btn
    >
    <div v-if="$vuetify.breakpoint.lgAndUp">
      <v-btn
        small
        class="text-capitalize"
        text
        v-for="(item, i) in mainMenu.items"
        :key="i"
        :to="localePath(item.path)"
        >{{ $t(item.t_key) }}</v-btn
      >
    </div>

    <!-- Avatar Menu -->
    <avatar v-if="isLoggedIn" />
  </v-app-bar>
</template>

<script>
import { imageService } from "@/services";
import { pathData } from "@/data";
import { impersonateAdminApi } from "@/api";
import Avatar from "@/components/artifact/global/Avatar";
import SportSearch from "@/components/artifact/global/SportSearch";
import { avatarHelper } from "@/helper"

export default {
  components: {
    Avatar,
    SportSearch
  },
  props: {
    fixed: {
      type: Boolean,
      default: true
    },
    theme: {
      type: String,
      default: "dark"
    },
    color: {
      type: String,
      default: "primary"
    }
  },
  data() {
    return {
      mainMenu: {
        items: {
          dashboard: {
            text: "Dashboard",
            path: pathData.admin.dashboard,
            icon: "mdi-view-list",
            t_key: "text_dashboard"
          },
          exercises: {
            text: "Exercises",
            path: pathData.admin.exercises,
            icon: "mdi-view-list",
            t_key: "dropdown_item_exercises"
          },
          pageBuilder: {
            text: "CMS",
            path: pathData.admin.pageBuilder,
            icon: "mdi-view-list",
            t_key: "dropdown_item_cms"
          },
          orderList: {
            text: "Order List",
            path: pathData.admin.orderList,
            icon: "mdi-view-list",
            t_key: "dropdown_item_order_list"
          },
          translation: {
            text: "Translation",
            path: pathData.admin.translation,
            icon: "mdi-view-list",
            t_key: "dropdown_item_translation"
          },
          users: {
            text: "Users",
            path: pathData.admin.userList,
            icon: "mdi-view-list",
            t_key: "dropdown_item_users"
          },
          promos: {
            text: "Promo Codes",
            path: pathData.admin.promos,
            icon: "mdi-view-list",
            t_key: "pwa_promo_codes"
          },
          payoutRequest: {
            text: "Payout Request",
            path: pathData.admin.payoutRequest,
            icon: "mdi-view-list",
            t_key: "pwa_payout_request"
          },
          logs: {
            text: "Logs",
            path: pathData.admin.userLog,
            icon: "mdi-view-list",
            t_key: "dropdown_item_logs"
          },
          marketplace: {
            text: "Find A Coach",
            path: pathData.pages.marketplace.name,
            icon: "mdi-view-list",
            t_key: "nav_item_marketplace"
          },
          message: {
            text: "Message",
            icon: "folder_open",
            t_key: "app_bar_dashboard_message",
            path: pathData.pages.chat
          },
          bookingSessions: {
            text: "Sessions",
            icon: "folder_open",
            t_key: "app_bar_booking_sessions",
            path: pathData.admin.bookingSessions
          },
        }
      },
      avatarMenu: {
        sub: {
          value: false
        },
        value: false,
        items: {
          language: {
            text: "Change Language",
            path: "#",
            icon: "mdi-view-list",
            t_key: "dropdown_item_change_language"
          },
          logout: {
            text: "Log Out",
            path: "#",
            icon: "mdi-logout",
            t_key: "dropdown_item_log_out"
          }
        }
      },
    };
  },
  methods: {
    goToHome(){
      this.$router.push(this.localePath(pathData.pages.home));
    },
    revertUser() {
      impersonateAdminApi(this.$axios)
        .revert()
        .then(({ data }) => {
          this.$auth.setUser(data.user);
          this.$store.dispatch("setUser", data.user);
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
    toggleDrawer(event) {
      this.$root.$emit("toggle-drawer", event);
    },
    inviteFriend() {
      this.dialog.inviteFriend = true;
    },
    changeLanguage(item) {
      if (item.key == "lang_da") {
        this.$i18n.locale = "da";
        this.$store.dispatch("setLang", "da");
        location.reload();
      } else if (item.key == "lang_en") {
        this.$i18n.locale = "en";
        this.$store.dispatch("setLang", "en");
        location.reload();
      }
    },
    async logout() {
      this.$nuxt.$loading.start();
      await this.$auth.logout();
      this.$socket.emit("force_disconnect");
      this.$store.dispatch("setUser", null);
      if (!this.$auth.loggedIn) {
        this.$router.push(this.localePath(pathData.pages.home));
      }
      this.$nuxt.$loading.finish();
    }
  },
  created() {
  },
  computed: {
    isSwitchedUser() {
      return this.$auth.user.is_switched;
    },
    avatarImage() {
      return this.$auth.user.image
        ? imageService.getImageByName(this.$auth.user.image)
        : null;
    },
    initialImageContent() {
      return avatarHelper.getAvatarName(this.$auth.user);
      
    },
    isLoggedIn() {
      return this.$auth.loggedIn;
    }
  },
  watch: {
    "avatarMenu.value": function(val) {
      if (val == false) {
        this.avatarMenu.sub.value = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
