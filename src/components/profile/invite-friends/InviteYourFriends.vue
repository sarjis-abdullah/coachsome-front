<template>
  <v-container>
    <v-row
      align="center"
      justify="center"
      class="pt-0"
    >
      <v-col
        cols="12"
        sm="8"
        md="6"
        lg="4"
        xs="12"
        class="mb-10"
      >
      <mobile-top-nav extraClass="body-bg" :headerText="$t('pwa_invite_friends')">
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
      <v-row>
        <v-col cols="12">
          <div class="email-label pb-2">
            E-mail Address <sup class="red--text">*</sup>
          </div>
          <div v-for="(item, index) in emails" :key="item.id">
            <invite-friends-single-email :item="{...item, index}" 
            @removeEmail="removeEmail"
            @addEmail="addEmail"
            />
          </div>
          <div @click="addTextbox" class="cursor-pointer py-2">
            + Add More
          </div>
        </v-col>
        <v-col cols="12" class="pr-0">
          <v-btn :loading="loading" @click="inviteFriends" block class="btn-color white--text">Send Invitation</v-btn>
        </v-col>
      </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MobileTopNav from '@/components/layout/global/MobileTopNav'
import InviteFriendsSingleEmail from './SingleEmail.vue';
import API from "@/api/athlete/inviteFriend";
import {pathData} from '@/data'

export default {
  name: "InviteYourFriends",
  components: {
    MobileTopNav,
    InviteFriendsSingleEmail
  },
  data() {
    return {
      loading: false,
      emails: [
        {
          id: new Date().getUTCMilliseconds() + "" + new Date().valueOf()
        }
      ]
    };
  },
  computed: {
    hasEmails() {
      if (this.emails?.length) {
        const emails = this.emails.map(item=> item.email)
        return emails?.length ? true : false;
      }
      return false
    },
    validatedEmails() {
      if (this.hasEmails) {
        const emails = this.emails.filter(item=> item.email).map(item => item.email)
        return emails;
      }
      return []
    }
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
    removeEmail(id) {
      this.emails = this.emails.filter(item=> item.id != id)
    },
    addEmail(item) {
      this.emails = this.emails.map(e=> (item.id == e.id ? item : e))
    },
    addTextbox(){
      this.emails.push({
        id: new Date().valueOf()
      })
    },
    async inviteFriends() {
      if (this.validatedEmails?.length) {
        this.loading = true
        try {
          await API(this.$axios).inviteFriend({emails: this.validatedEmails})
          this.$toast.success(this.$i18n.t("friend_invitation_sent"));
        } catch (error) {
          this.$toast.error("Something went wrong!");
          throw error
        } finally {
          this.loading = false
        }
      }else {
        this.$toast.error(this.$i18n.t("valid_required_email"));
      }
    }
  },
};
</script>
<style lang="scss" scoped>
.email-label {
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
}
.cursor-pointer {
  cursor: pointer;
}
.btn-color {
  background-color: rgb(21, 87, 124) !important;
}
</style>
