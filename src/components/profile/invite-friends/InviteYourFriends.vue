<template>
  <v-container class="invite-friend-container">
      <v-row :class="isModal && 'form-space'">
        <v-col cols="12" class="invite-friend-wrapper" :class="!isModal ? 'invite-friend-wrapper__space' : 'p-0'">
          <section>
            <div v-if="isModal" class="hidden-sm-and-down cursor-pointer" @click="$emit('close-modal')">
              <img class="menu-icon-image" :src="require('@/assets/img/svg-icons/cancel.svg')" alt="Cancel Button">
            </div>
            <div class="hidden-sm-and-down" style="padding:20px 0 0 0">
              <div class="form-title">
                {{$t('invite_your_friends_form_title')}}
              </div>
              <p class="form-top-description">
                {{$t('invite_your_friends_form_subtitle')}}
              </p>
            </div>
            <div class="email-label">
              {{$t('invite_your_friends_email_label')}} <sup class="red--text">*</sup>
            </div>
          </section>
          <div v-for="(item, index) in emails" :key="item.id">
            <invite-friends-single-email :key="customKey" :item="{...item, index}" 
            @removeEmail="removeEmail"
            @addEmail="addEmail"
            />
          </div>
          <div @click="addTextbox" class="cursor-pointer py-2">
            + {{$t('invite_your_friends_add_more_btn')}}
          </div>
        </v-col>
        <v-col :cols="isModal ? 4 : 12" class="send-invite-btn-wrapper">
          <v-btn :loading="loading" @click="inviteFriends" block class="btn-color white--text send-invite-btn">
            {{$t('invite_your_friends_send_invitation_btn')}}
          </v-btn>
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
import MobileTopNav from '@/components/layout/global/MobileTopNav'
import InviteFriendsSingleEmail from './SingleEmail.vue';
import API from "@/api/athlete/inviteFriend";
import {pathData} from '@/data'
const ID = new Date().getUTCMilliseconds() + "" + new Date().valueOf()

export default {
  name: "InviteYourFriends",
  components: {
    MobileTopNav,
    InviteFriendsSingleEmail
  },
  props: {
    isModal: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      loading: false,
      id: ID,
      customKey: 1,
      emails: [
        {
          id: ID
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
          this.emails = []
          this.emails.push({
            id: this.id
          })
          this.customKey ++
          // console.log(this.emails, "jjj");
          this.$emit('close-modal')
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
  padding-top: 30px;
}
.cursor-pointer {
  cursor: pointer;
}
.btn-color {
  background-color: rgb(21, 87, 124) !important;
}
.invite-friend-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.invite-friend-wrapper__space {
  padding: 0 0.5rem;
}
.form-space {
  padding:40px 67px 0px 67px;
}
.form-title {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 25px;
  line-height: 20px;
}
.form-top-description {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #9FAEC2;
  padding-top: 1rem;
}
.send-invite-btn-wrapper {
  padding-bottom: 70px;
}
.send-invite-btn {
  border-radius: 8px;
}
.invite-friend-container {
  max-width: 680px;
}
</style>
