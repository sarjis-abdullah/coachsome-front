<template>
  <v-menu
    v-model="menu"
    transition="slide-y-transition"
    bottom
    offset-y
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on }">
      <v-btn icon large v-on="on">
        <v-avatar color="primary-light-1" size="32px" v-if="!avatarImage">
          <span v-if="initialImageContent != ''">{{ initialImageContent }}</span>
          <v-img v-else aspect-ratio="1" :src="require('@/assets/images/profile-default.jpg')" alt="Avatar"></v-img>
        </v-avatar>
        <v-avatar size="32px" item v-if="avatarImage">
          <v-img aspect-ratio="1" :src="avatarImage" alt="Avatar" />
        </v-avatar>
      </v-btn>
    </template>

    <v-list width="246px" dense>
      <!-- Coach Show Profile -->
      <span v-if="isCoach" class="d-sm-flex d-xs-flex d-md-none">
        <v-list-item color="primary" link @click.stop="handleShowProfile">
          <v-list-item-content>
            <v-list-item-title>
              {{ $t(items.showProfile.t_key) }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </span>

      <!-- Coach Edit Profile -->
      <span v-if="isCoach" class="d-sm-flex d-xs-flex d-md-none">
        <v-list-item color="primary" link @click.stop="handleCoachEditProfile">
          <v-list-item-content>
            <v-list-item-title>
              {{ $t(items.editProfile.t_key) }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </span>

      <!-- Athlete Edit Profile -->
      <span v-if="isAthlete" class="d-sm-flex d-xs-flex d-md-none">
        <v-list-item
          color="primary"
          link
          @click.stop="handleAthleteEditProfile"
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ $t(items.athleteEditProfile.t_key) }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </span>

      <span class="d-sm-flex d-xs-flex d-md-none">
        <!-- Marketplace -->
        <v-list-item color="primary" link @click.stop="handleMarketplace">
          <v-list-item-content>
            <v-list-item-title>
              {{ $t(items.marketplace.t_key) }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Message -->
        <v-list-item color="primary" link @click.stop="handleChatPage">
          <v-list-item-content>
            <v-list-item-title>{{ $t(items.message.t_key) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Coach Booking -->
        <span v-if="isLoggedIn && isCoach">
          <v-list-item
            color="primary"
            link
            @click.stop="$router.push(localePath(items.coachBooking.path))"
          >
            <v-list-item-content>
              <v-list-item-title>
                {{ $t(items.coachBooking.t_key) }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </span>

        <!-- Athlete Booking -->
        <span v-if="isLoggedIn && isAthlete">
          <v-list-item
            color="primary"
            link
            @click.stop="$router.push(localePath(items.athleteBooking.path))"
          >
            <v-list-item-content>
              <v-list-item-title>
                {{ $t(items.athleteBooking.t_key) }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </span>
      </span>

      <!-- Dashboard -->
      <span v-if="false">
        <v-list-item color="primary" link @click.stop="handleAdminDashboard">
          <v-list-item-content>
            <v-list-item-title>
              {{ $t(items.adminDashBoard.t_key) }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </span>

      <!-- Payments -->
      <span v-if="hasRole(['athlete'])">
        <v-list-item color="primary" link @click.stop="handlePayments">
          <v-list-item-content>
            <v-list-item-title>
              {{ $t(items.payments.t_key) }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </span>
      <v-divider v-if="hasRole(['athlete'])"></v-divider>

      <!-- Wishlist -->
      <span v-if="hasRole(['athlete'])">
        <v-list-item color="primary" link @click.stop="gotoWishlist">
          <v-list-item-content>
            <v-list-item-title>
              {{ 'Wishlist' }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </span>
      <v-divider v-if="hasRole(['athlete'])"></v-divider>

      <!-- Langugae -->
      <v-list-group v-model="languageGroup" link>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t(items.changeLanguage.t_key) }}
            </v-list-item-title>
          </v-list-item-content>
        </template>
        <nuxt-link
          v-for="(locale, i) in availableLocales"
          :key="locale.code"
          :to="switchLocalePath(locale.code)"
        >
          <v-list-item :key="i" link>
            <v-list-item-title>{{ $t(locale.tKey) }}</v-list-item-title>
          </v-list-item>
        </nuxt-link>
      </v-list-group>
      
      <v-divider></v-divider>

      <!-- Currency -->
      <v-list-group v-model="currencyGroup" link>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t(items.changeCurrency.t_key) }}
            </v-list-item-title>
          </v-list-item-content>
        </template>
        <template v-for="(item, i) in items.changeCurrency.currencies">
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
      </v-list-group>

      <v-divider></v-divider>

      <v-dialog v-model="inviteFriendModal" max-width="680">
        <v-card class="bg-2">
          <InviteYourFriends :isModal="true" @close-modal="inviteFriendModal = false"/>
        </v-card>
      </v-dialog>

      <!-- Invite Friends -->
      <v-list-item v-if="isAthlete || isCoach" color="primary" link @click.stop="handleInviteFriends">
        <v-list-item-content>
          <v-list-item-title>
            {{$t("invite_your_friends_title")}}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider v-if="isAthlete || isCoach"></v-divider>

      <!-- Admin -->
      <span v-if="isAdmin && !$vuetify.breakpoint.lgAndUp">
        <v-list-group v-model="adminGroup" link>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{ $t(items.admin.name) }}</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="(item, i) in items.admin.subItems"
            :key="i"
            link
            :to="localePath(item.path)"
          >
            <v-list-item-title>{{ $t(item.t_key) }}</v-list-item-title>
            <v-divider></v-divider>
          </v-list-item>
        </v-list-group>
      </span>

      <!-- Becoma a Coach -->

      <v-divider v-if="!is_profile_switched_ever && !isAdmin && !isCoach" ></v-divider>

      <v-list-item v-if="!is_profile_switched_ever && !isAdmin && !isCoach" color="primary" link @click.stop="handleBecomeCoach">
        <v-list-item-content>
          <v-list-item-title>
            {{$t("dropdown_item_become_coach")}}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Switch Profile to Coach -->

      <v-list-item v-if="is_profile_switched_ever && isProfileSwitchedToAthlete && isAthlete" color="primary" link @click.stop="handleSwitchProfile('coach')">
        <v-list-item-content>
          <v-list-item-title>
            {{$t("pwa_switch_to_coach")}}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider v-if="is_profile_switched_ever && isProfileSwitchedToAthlete && isAthlete"></v-divider>

      <!-- Switch Profile to Athlete -->

      <v-list-item v-if="isCoach" color="primary" link @click.stop="handleSwitchProfile('athlete')">
        <v-list-item-content>
          <v-list-item-title>
            {{$t("pwa_switch_to_athlete")}}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider v-if="isCoach"></v-divider>

      <!-- Athelete Switched Button -->
      <v-list-item
        color="blue"
        outlined
        link
        v-if="isSwitchedUser"
        @click.stop="revertUser"
      >
        <v-list-item-content>
          <v-list-item-title> {{$t("pwa_switch_to_own_user")}} </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider v-if="isSwitchedUser"></v-divider>

      <!-- Athlete settings -->
      <div v-if="false">
        <v-list-item
          v-if="isAthlete"
          color="primary"
          link
          @click.stop="$router.push(localePath(items.athleteSettings.path))"
        >
          <v-list-item-content>
            <v-list-item-title>{{
              $t(items.athleteSettings.t_key)
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>

      <!-- Logout -->
      <v-list-item color="primary" link @click.stop="handleLogout">
        <v-list-item-content>
          <v-list-item-title>{{ $t(items.logout.t_key) }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { pathData } from "@/data";
import { avatarHelper } from "@/helper"
import impersonateAdminApi from "@/api/admin/impersonate";
import { endpoint, authApi } from "@/api";
import { currencyService } from "@/services";
import InviteYourFriends from '@/components/profile/invite-friends/InviteYourFriends.vue';
export default {
  components: {
    InviteYourFriends,
  },
  data() {
    return {
      is_profile_switched_ever: false,
      menu: false,
      languageGroup: false,
      currencyGroup: false,
      selectedCurrencyCode: currencyService.currentCurrencyCode(),
      adminGroup: false,
      friendInvitationInfo: [
        { email: "", name: "" },
        { email: "", name: "" }
      ],
      dialog: {
        inviteFriend: false
      },
      items: {
        showProfile: {
          name: "Show Profile",
          path: "",
          key: "show_profile",
          icon: "mdi-account-box-outline",
          t_key: "dropdown_item_show_profile"
        },
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
        marketplace: {
          name: "Marketplace",
          path: pathData.pages.marketplace,
          key: "marketplace",
          icon: "mdi-menu-down",
          t_key: "nav_item_marketplace"
        },
        payoutInformation: {
          name: "Payout Information",
          path: pathData.coach.payoutInformation,
          key: "payout_information",
          icon: "mdi-menu-down",
          t_key: "nav_item_payout_information"
        },
        payments: {
          name: "Payments",
          path: pathData.athlete.payments,
          key: "payments",
          icon: "mdi-menu-down",
          t_key: "nav_item_payments"
        },
        // verification: {
        //   name: "Verifications",
        //   path:  pathData.pages.verification,
        //   key: "verification",
        //   icon: 'mdi-menu-down',
        //   t_key: "dropdown_item_verification"
        // },
        // earning: {
        //   name: "Balance / earnings",
        //   path:  pathData.pages.earning,
        //   key: "earning",
        //   icon: 'mdi-menu-down',
        //   t_key: "dropdown_item_earning"
        // },
        // inviteFriend: {
        //   name: "Invite friends",
        //   path: pathData.pages.inviteFriend,
        //   key: "invitation",
        //   icon: 'mdi-menu-down',
        //   t_key: "dropdown_item_invite_friend"
        // },
        coachSetting: {
          name: "Settings",
          path: pathData.coach.settings,
          key: "settings",
          icon: "mdi-menu-down",
          t_key: "dropdown_item_settings"
        },
        coachBalanceEarnings: {
          name: "balanceEarnings",
          path: pathData.coach.balanceEarnings,
          key: "balanceEarnings",
          icon: "mdi-menu-down",
          t_key: "dropdown_item_balance_earnings"
        },
        changeLanguage: {
          name: "Change Language",
          path: "",
          key: "change_language",
          icon: "mdi-view-list",
          t_key: "dropdown_item_change_language",
          languages: []
        },
        changeCurrency: {
          name: "Change Language",
          path: "",
          key: "change_currency",
          icon: "mdi-view-list",
          t_key: "dropdown_item_change_currency",
          currencies: currencyService.all()
        },
        admin: {
          name: "Admin",
          path: "",
          key: "admin",
          icon: "",
          t_key: "",
          subItems: [
            {
              name: "Exercises",
              path: pathData.pages.exercises,
              icon: "mdi-view-list",
              t_key: "dropdown_item_exercises"
            },
            {
              name: "Translation",
              path: pathData.admin.translation,
              icon: "mdi-view-list",
              t_key: "dropdown_item_translation"
            },
            {
              name: "Order List",
              path: pathData.admin.orderList,
              icon: "mdi-view-list",
              t_key: "dropdown_item_order_list"
            },
            {
              name: "Promo Codes",
              path: pathData.admin.promos,
              icon: "mdi-view-list",
              t_key: "pwa_promo_codes"
            },
            {
              name: "Users",
              path: pathData.admin.userList,
              icon: "mdi-view-list",
              t_key: "dropdown_item_users"
            },
            {
              name: "Logs",
              path: pathData.admin.userLog,
              icon: "mdi-view-list",
              t_key: "dropdown_item_logs"
            },
            {
              name: "Find A Coach",
              path: pathData.pages.marketplace.name,
              icon: "mdi-view-list",
              t_key: "nav_item_marketplace"
            },
            {
              name: "Message",
              path: pathData.pages.chat,
              icon: "mdi-view-list",
              t_key: "app_bar_dashboard_message"
            },
            
          ]
        },
        logout: {
          name: "Log Out",
          path: "#",
          key: "logout",
          icon: "mdi-logout",
          t_key: "dropdown_item_log_out"
        },
        adminDashBoard: {
          name: "Dashboard",
          path: pathData.admin.dashboard,
          key: "admin_dashboard",
          icon: "dashboard",
          t_key: "text_dashboard"
        },
        message: {
          name: "Message",
          path: pathData.pages.chat,
          key: "message",
          icon: "folder_open",
          t_key: "app_bar_dashboard_message"
        },
        coachBooking: {
          name: "Coach Booking",
          path: pathData.coach.bookings,
          key: "coachBooking",
          icon: "folder_open",
          t_key: "app_bar_dashboard_booking"
        },
        athleteBooking: {
          name: "Athlete Booking",
          path: pathData.athlete.bookings,
          key: "athleteBooking",
          icon: "folder_open",
          t_key: "app_bar_dashboard_booking"
        },
        athleteSettings: {
          name: "Athlete Booking",
          path: pathData.athlete.settings,
          key: "athleteBooking",
          icon: "folder_open",
          t_key: "app_bar_setings"
        }
      },
      inviteFriendModal: false
    };
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales;
    },
    isSwitchedUser() {
      if (this.authUser()) {
        return this.authUser().is_switched;
      } else {
        return false;
      }
    },
    isProfileSwitchedToAthlete() {
      if (this.authUser()) {
        return this.authUser().is_profile_switched && this.authUser().profile_switched_to == "athlete" ? true : false;
      } else {
        return false;
      }
    },
    isProfileSwitchedToCoach() {
      if (this.authUser()) {
        return this.authUser().is_profile_switched && this.authUser().profile_switched_to == "coach" ? true : false;
      } else {
        return false;
      }
    },
    isLoggedIn() {
      return this.$auth.loggedIn;
    },
    isCoach() {
      return this.hasRole(["coach"]);
    },
    isAthlete() {
      return this.hasRole(["athlete"]);
    },
    isAdmin() {
      return this.hasRole(["superadmin", "admin", "staff"]);
    },
    avatarImage() {
      if (this.authUser()) {
        return this.authUser().image;
      } else {
        return "";
      }
    },
    initialImageContent() {
      return avatarHelper.getAvatarName(this.authUser());
    }
  },
  watch: {
    menu: function(val) {
      if (val == false) {
        this.languageGroup = false;
        this.adminGroup = false;
        this.currencyGroup = false;
      }
    },
    isProfileSwitchedToCoach(){
      this.checkSwitchInfo();
    },
    isProfileSwitchedToAthlete(){
      this.checkSwitchInfo();
    }
  },
  created(){
    this.checkSwitchInfo();
  },
  methods: {
    gotoWishlist(){
      this.$router.push("/athlete/wishlist")
    },
    async checkSwitchInfo(){
      if(this.$auth.user && this.$auth.user.id){
        const { data } = await this.$axios.get(endpoint.SWITCH_INFO);
        this.is_profile_switched_ever = data.is_profile_switched;
      }
    },
    handleSwitchProfile(roleData){

      const payload = {
        role: roleData,
        is_admin_switched: this.isSwitchedUser
      };

      authApi(this.$axios).switchProfile(payload)
      .then(({ data }) => {
        this.$auth.setUser(data.user);
        this.$store.dispatch("setUser", data.user);
        this.$store.dispatch("activeBottomNav", 0);

        if(this.$auth.loggedIn && this.$auth.hasRole(["superadmin", "admin", "staff"])){
          this.$router.push(this.localePath(pathData.admin.dashboard))
        }else if(this.$auth.loggedIn && this.$auth.hasRole(["coach"])){
            this.$router.push(this.localePath(pathData.coach.home))
        }else if(this.$auth.loggedIn && this.$auth.hasRole(["athlete"])){
            this.$router.push(this.localePath(pathData.athlete.home))
        }else{
            this.$router.push(this.localePath(pathData.pages.home))
        }
        
      })
      .catch((error) => {this.$toast.error(error.response.data.message);});

    },

    handleCurrencyChnage(item) {
      currencyService.setCurrencyCode(item.code);
      location.reload();
    },
    profileUrl() {
      return window.location.origin + "/" + this.$auth.user.user_name;
    },
    authUser() {
      return this.$auth.user;
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
    hasRole(roles = []) {
      return this.$auth.hasRole(roles);
    },
    toggleDrawer(event) {
      this.$root.$emit("toggle-drawer", event);
    },
    inviteFriend() {
      this.dialog.inviteFriend = true;
    },
    handleAdminSubItem(item) {
      // console.log(item);
    },
    handleMarketplace() {
      this.$router.push(this.localePath(this.items.marketplace.path));
    },
    handleChatPage() {
      this.$router.push(this.localePath(this.items.message.path));
    },
    handlePayments() {
      this.$router.push(this.localePath(this.items.payments.path));
    },
    handleBecomeCoach(){
      this.$router.push(this.localePath(pathData.pages.becomeACoach));
    },
    async handleLogout() {
      this.$nuxt.$loading.start();
      await this.$auth.logout();
      this.$socket.emit("force_disconnect");

      this.$store.dispatch("setUser", null);

      if (!this.$auth.loggedIn) {
        this.$router.push(this.localePath(pathData.pages.home));
      }
      this.$nuxt.$loading.finish();
    },
    handleCoachEditProfile() {
      this.$router.push(this.localePath(this.items.editProfile.path));
    },
    handleAthleteEditProfile() {
      this.$router.push(this.localePath(this.items.athleteEditProfile.path));
    },
    handleShowProfile() {
      window.open(this.profileUrl(), "_blank");
    },
    handleAdminDashboard() {
      this.$router.push(this.localePath(this.items.adminDashBoard.path));
    },
    handleInviteFriends(){
      this.inviteFriendModal = true
    },
    gotoSettings () {
      const path = this.isCoach ? this.items.coachSetting.path : this.items.athleteSettings.path
      this.$router.push(this.localePath(path))
    }
  }
};
</script>
<style lang="scss" scoped></style>
