<template>
  <v-container fluid>

    <mobile-top-nav extraClass="body-bg-secondary" :headerText="$t('verify_group_chat')">
      <template v-slot:goBack>
        <v-btn
          icon
        >
          <!-- <v-icon class="common-top-back-icon">mdi-chevron-left</v-icon> -->
        </v-btn>
      </template>
      <template v-slot:action>
        <span></span>
      </template>
    </mobile-top-nav>
    <div class="group-invitations-verify" style="height: 50vh!important">
      <div v-if="!hasError">
        <div class="d-flex flex-column justify-center align-center">
          <v-progress-circular
            :size="30"
            color="primary-light-2"
            indeterminate
          ></v-progress-circular>
        </div>
        <div class="subtitle-2">
          Verifying ....
        </div>
      </div>
      <div v-else>
        <v-btn color="primary-light-1" outlined :to="localePath('/')">
          Go Home
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
import { pathData } from "@/data";
import { endpoint } from "../../api";
import { redirectPathService } from "@/services";
import MobileTopNav from '@/components/layout/global/MobileTopNav'

export default {
  data() {
    return {
      hasError: false,
      verified: false
    };
  },
  components: {
    MobileTopNav
  },
  mounted() {
    redirectPathService.destroy();
    if (!this.$auth.user) {
      redirectPathService.set(location.pathname + location.search);
      this.$router.push(this.localePath(pathData.pages.login))
    } else {
      if (this.$route.query.token) {
        this.$axios
          .post(endpoint.GROUP_INVITATIONS_VERIFY_POST, {
            token: this.$route.query.token
          })
          .then(({ data }) => {
            if (data.data.groupId) {
              this.$router.push(
                this.localePath({
                  ...pathData.pages.chat,
                  query: { groupId: data.data.groupId }
                })
              );
            }
          })
          .catch(({ response }) => {
            this.hasError = true;
            if (response.data.error) {
              this.$toast.error(response.data.error.message);
            }
          });
      }else{
        this.$toast.error("Sorry you're not verified for this.");
      }
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.group-invitations-verify {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
