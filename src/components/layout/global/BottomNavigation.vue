<template>
  <v-container >
    <v-bottom-navigation
        fixed
        app
        horizontal
        class="bottom_background hidden-md-and-up"
        background-color="#15577C"
        :value="activeItem"
        width="90%"
      >
        <v-btn
          icon large
          text
          class="menu-icon-button"
          @click="GoToHome()" 
        >
          <img class="menu-icon-image" :src="require('@/assets/img/svg-icons/home.svg')" alt="">
        </v-btn>

        <v-btn
          icon large
          text
          v-show="isLoggedIn"
          class="menu-icon-button"
          @click="GoToMessages()"
        >
          <img class="menu-icon-image" :src="require('@/assets/img/svg-icons/messages.svg')" alt="">
        </v-btn>

        <v-btn
          icon large
          text
          class="menu-icon-button"
          @click="searchmarketPlace()"
        >
          <img class="menu-icon-image" :src="require('@/assets/img/svg-icons/search.svg')" alt="">
        </v-btn>


        <v-btn
          icon large
          text
          class="menu-icon-button"
          v-show="isLoggedIn && showBooking"
          @click="bookings()"
        >
          <img class="menu-icon-image" :src="require('@/assets/img/svg-icons/calendar-alt.svg')" alt="">
        </v-btn>

        <v-btn icon large class="menu-icon-button" v-if="avatarImage && isLoggedIn"  @click="goToProfile()">
          <v-avatar size="32px" item >
            <v-img aspect-ratio="1" :src="avatarImage" alt="Avatar" />
          </v-avatar>
        </v-btn>
        <v-btn icon large class="menu-icon-button" v-else-if="!avatarImage && isLoggedIn" @click="goToProfile()">
          <v-avatar color="primary-light-1" size="32px" >
            <span>{{ initialImageContent }}</span>
          </v-avatar>
        </v-btn>
        <!-- <v-btn icon large class="menu-icon-button" >
          <v-avatar size="32px" item >
            <v-img aspect-ratio="1" :src="require('@/assets/img/svg-icons/lock.svg')" alt="Avatar_not_logged_in" />
          </v-avatar>
        </v-btn> -->
        <v-btn
          icon
          large
          text
          v-else  
          @click="goToLogin()"
          class="menu-icon-button"
        >
          <img class="menu-icon-image" :src="require('@/assets/img/svg-icons/lock.svg')" alt="Avatar_not_logged_in">
        </v-btn>
    </v-bottom-navigation>
    <login-dialog v-if="!isLoggedIn"></login-dialog>
  </v-container>
</template>
<script>
import { pathData } from "@/data";
import LoginDialog from '@/components/loginWithPopup/LoginDialog'

export default ({
    name: "BottomNavigation",
    components: {
      LoginDialog
    },
    data: () => ({
      backgroundSize: "auto",
      steps: [],
      tooltips: [],
      user: [],
      name: 'herhwbe',
      items: [
        { title: 'Profile' },
        { title: 'Settings' },
        { title: 'Sign Out' },
      ],
      offset: true,
      display_name: '',
      active: true
    }),
    computed: {
      isLoggedIn(){
        return this.$auth.loggedIn;
      },
      role_name() { 
        if(this.user.roles){
          let display_name =  this.user.roles.map((role) =>{
            return { display_name : role.display_name};
          });
          return display_name[0].display_name;
        }else{
          return "";
        }
      },
      avatarImage() {
        if (this.authUser()) {
          return this.authUser().image;
        } else {
          return "";
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
      activeItem(){
        return this.$store.getters.activeBottomNav;
      },
      showBooking(){
        return this.$auth.hasRole(['superadmin', 'admin', 'staff']) ? false : true;
      }
    },
    mounted() {
      // Tawk Api exist in static directory
      // Only chat page do not effect
      Tawk_API.onLoad = function() {
        Tawk_API.hideWidget();
      };
      if (Tawk_API.hideWidget) {
        Tawk_API.hideWidget();
      }
    },
    destroyed() {
      if (Tawk_API.hideWidget && this.$nuxt.$data.layoutName != "chat") {
        Tawk_API.showWidget();
      }
    },
    methods: {
      goToProfile(){
        this.$store.dispatch("activeBottomNav", 4);
        if (this.$auth.hasRole(["coach"])) {
          this.$router.push(this.localePath(pathData.coach.profileMenu));
        } else if (this.$auth.hasRole(["athlete"])) {
          this.$router.push(this.localePath(pathData.athlete.profileMenu));
        }else if (this.$auth.hasRole(['superadmin', 'admin', 'staff'])) {
          this.$router.push(this.localePath(pathData.admin.profileMenu));
        }
      },
      authUser() {
        return this.$auth.user;
      },
      profileUrl() {
        return window.location.origin + "/" + this.$store.getters.auth.user_name;
      },
      GoToHome(){
        this.$store.dispatch("activeBottomNav", 0);
          if(this.$auth.loggedIn && this.$auth.hasRole(["superadmin", "admin", "staff"])){
            this.$router.push(this.localePath(pathData.admin.dashboard));
          }
          else if(this.$auth.loggedIn && this.$auth.hasRole(["coach"])){
            this.$router.push(this.localePath(pathData.coach.home));
          }else if(this.$auth.loggedIn && this.$auth.hasRole(["athlete"])){
            this.$router.push(this.localePath(pathData.athlete.home))
          }
          else{
            this.$router.push(this.localePath(pathData.pages.home))
          }
      },
      GoToMessages(){
        this.$store.dispatch("activeBottomNav", 1);
        this.$store.dispatch("chat/refreshTotalNewMessageCount");
        // if(this.navItems.message.path != pathData.pages.chat.path){
          this.$router.push(this.localePath({path: "/chat"}));
        // }
      },
      searchmarketPlace(){
        this.$store.dispatch("activeBottomNav", 2);
        if(this.$route.path != pathData.pages.coaches){
          this.$router.push(this.localePath(pathData.pages.coaches))
        }
      },
      bookings(){
        this.$store.dispatch("activeBottomNav", 3);
        if (this.$auth.hasRole(["coach"])) {
          this.$router.push(this.localePath(pathData.coach.bookings));
        } else if (this.$auth.hasRole(["athlete"])) {
          this.$router.push(this.localePath(pathData.athlete.bookings));
        }
      },
      goToLogin(){
        this.$store.dispatch("activeBottomNav", 4);
        if(this.$vuetify.breakpoint.smAndUp){
            this.$store.dispatch("toggleDialog");
        }else{
          if(this.$route.path != pathData.pages.login){
            this.$router.push(this.localePath(pathData.pages.login))
          }
        }
      }
    }
})
</script>

<style scoped>


  .v-item-group.v-bottom-navigation {
      align-items: center !important;;
  }

  .bottom_background{
    border-radius: 70px;
    z-index: 999!important;
    left: 50%!important;
    transform: translate(-50%)!important;
  }


  @media only screen and (max-width: 375px) {
    [class*="bottom_background"] {
      margin-bottom: 2.5%;
    }
  }
  @media screen and (min-width: 376px) and (max-width: 780px) {
    [class*="bottom_background"] {
      margin-bottom: 2%;
    }
  }
  @media only screen and (min-width: 781px) {
    [class*="bottom_background"] {
      margin-bottom: 0.80%;
    }
  }
 

  .menu-icon-button{
    align-self: center;
    text-align: center;
    border-radius: 100%!important;
  }

  .v-btn:not(.v-btn--round).v-size--default {
      min-width: 20%;
  }

.v-btn--active, .active{
  color: #F7FAFC !important;
  caret-color: #F7FAFC !important;
  border-radius: 100%;
  width: 30%;
  background-color: #f8fcff33 !important;
  /* opacity: 0.1; */
}


.deep-purple--text.text--accent-4:active{
    color: #F7FAFC !important;
    caret-color: #F7FAFC !important;
    border-radius: 100%;
    width: 30%;
}

.v-btn:not(.v-btn--round).v-size--default {
    height: 100%!important;;
}

.user-image{
    height: 32px;
    width: 32px;
    border-radius: 100%;
}
.v-item-group.v-bottom-navigation .v-btn {
    background-color: transparent;
    border-radius: 0;
    box-shadow: none;
    flex: 0 1 auto;
    font-size: 0.75rem;
    height: 48px!important;
    width: 48px!important;
    /* max-width: 168px; */
    min-width:  48px!important;
    position: relative;
    text-transform: none;
    /* margin: 2%; */
}
  @media only screen and (min-width: 300px) {
    .v-item-group.v-bottom-navigation .v-btn  {
      margin: 2%;
    }
  }
.v-image__image{
  background-size: auto!important;
}

</style>