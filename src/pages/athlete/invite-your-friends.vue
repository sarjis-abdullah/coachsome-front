<template>
  <v-container fluid>
      <mobile-top-nav extraClass="body-bg-secondary" :headerText="$t('pwa_invite_friends')">
        <template v-slot:goBack>
          <v-btn
            icon
            @click="handleBackBtnClick"
          >
            <v-icon class="common-top-back-icon">mdi-chevron-left</v-icon>
          </v-btn>
        </template>
        <template v-slot:action>
          <span></span>
        </template>
      </mobile-top-nav>
      <invite-your-friends/>
  </v-container>
</template>

<script>
import MobileTopNav from '@/components/layout/global/MobileTopNav'
import InviteYourFriends from '@/components/profile/invite-friends/InviteYourFriends.vue';
import { pathData } from "@/data";
  export default {
    layout:"athlete",
    components: {
      InviteYourFriends,
      MobileTopNav
    },
     methods: {
      handleBackBtnClick(){
      if(this.$auth.hasRole(['superadmin', 'admin', 'staff'])){
        this.$router.push(this.localePath(pathData.admin.profileMenu));
      }else if(this.$auth.hasRole(["coach"])){
        this.$router.push(this.localePath(pathData.coach.profileMenu));
      }else if(this.$auth.hasRole(["athlete"])){
        this.$router.push(this.localePath(pathData.athlete.profileMenu));
      }
    },
    },
  }
</script>