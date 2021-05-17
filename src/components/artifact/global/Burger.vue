<template>
  <v-menu
    v-model="menu"
    transition="slide-y-transition"
    bottom
    offset-y
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on }">
      <v-app-bar-nav-icon v-on="on" />
    </template>
    <v-list width="246px" dense>
      <!-- Register -->
      <!-- <v-list-item color="primary" link :to="items.register.path">
        <v-list-item-content>
          <v-list-item-title>{{ $t(items.register.t_key) }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->

      <!-- Login -->
      <v-list-item color="primary" link :to="items.login.path">
        <v-list-item-content>
          <v-list-item-title>{{ $t(items.login.t_key) }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Marketplace -->
      <v-list-item color="primary" link @click.stop="handleMarketplace">
        <v-list-item-content>
          <v-list-item-title>{{
            $t(items.marketplace.t_key)
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Langugae -->
      <v-list-group v-model="languageGroup" link>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>{{
              $t(items.changeLanguage.t_key)
            }}</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item
          v-for="(item, i) in items.changeLanguage.languages"
          :key="i"
          link
          @click="handleLanguage(item)"
        >
          <v-list-item-title>{{ $t(item.t_key) }}</v-list-item-title>
        </v-list-item>
      </v-list-group>

      <!-- About -->
      <v-list-item color="primary" link :to="items.about.path">
        <v-list-item-content>
          <v-list-item-title>{{ $t(items.about.t_key) }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import imageHelper from "@/helper/image";
import { pathData } from "@/data";

export default {
  data() {
    return {
      menu: false,
      languageGroup: false,
      adminGroup: false,
      items: {
        marketplace: {
          path: pathData.pages.marketplace,
          key: "marketplace",
          icon: "mdi-menu-down",
          t_key: "nav_item_marketplace",
        },
        changeLanguage: {
          path: "",
          key: "change_language",
          icon: "mdi-view-list",
          t_key: "dropdown_item_change_language",
          languages: [],
        },
        about: {
          key: "about",
          icon: "folder_open",
          t_key: "nav_item_about",
          path: pathData.pages.about,
        },
        login: {
          key: "login",
          icon: "folder_open",
          t_key: "nav_item_login",
          path: pathData.pages.login,
        },
        register: {
          key: "register",
          icon: "folder_open",
          t_key: "nav_item_create_free_user",
          path: pathData.pages.register,
        },
      },
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    isCoach() {
      return this.hasRole(["coach"]);
    },
    isAdmin() {
      return this.hasRole(["superadmin", "admin", "staff"]);
    },
    avatarImage() {
      return this.$store.getters.auth.image
        ? imageHelper.getImageByName(this.$store.getters.auth.image)
        : null;
    },
    initialImageContent() {
      return (
        this.$store.getters.auth.first_name.substring(0, 1) +
        this.$store.getters.auth.last_name.substring(0, 1)
      );
    },
  },
  watch: {
    menu: function(val) {
      if (val == false) {
        this.languageGroup = false;
        this.adminGroup = false;
      }
    },
  },
  created() {
    this.items.changeLanguage.languages = this.$store.getters[
      "locale/getLanguages"
    ];
  },
  methods: {
    toggleDrawer(event) {
      this.$root.$emit("toggle-drawer", event);
    },
    handleMarketplace() {
      this.$router.push(this.items.marketplace.path);
    },
    handleLanguage(item) {
      this.$i18n.locale = item.lang;
      location.reload();
    },
  },
};
</script>
<style lang="scss" scoped></style>
