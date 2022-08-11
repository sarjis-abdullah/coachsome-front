<template>
  <div class="bootstrap-wrapper">
    <div class="container-fluid">
      <mobile-top-nav extraClass="body-bg-secondary" :headerText="$t('title_become_a_coach')">
        <template v-slot:goBack>
          <v-btn
            icon
          >
          </v-btn>
        </template>
        <template v-slot:action>
          <span></span>
        </template>
      </mobile-top-nav>
      <div class="row">
        <div class="col px-md-0">
          <div v-html="content" @click="handleClick"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { authApi, pageBuilderApi } from "@/api";
import { pathData } from "@/data";
import MobileTopNav from '@/components/layout/global/MobileTopNav'


export default {
  head() {
    return {
      title: this.$i18n.t("header_title_tag_become_a_coach"),
      titleTemplate: "%s"
    };
  },
  components: {
    MobileTopNav
  },
  async asyncData({ app, $axios }) {
    const { data } = await pageBuilderApi($axios).getPage("BecomeACoach");

    let content = "";
    if (data.data) {
      if (data.data.pages.length) {
        data.data.pages.forEach(item => {
  
          if (item.locale == app.i18n.locale) {
          //
            content = item.content;
          //
          }
        });
      }
    }
    // Fallback
    if (!content) {
      data.data.pages.forEach(item => {
        if (app.i18n.locale == item.locale) {
          content = item.content;
        }
      });
    }

    return {
      content
    };
  },
  methods: {
    handleClick(e) {
      const elt = e.target.closest(".btn-coach");
      if(this.$auth.loggedIn){
        this.$router.push(this.localePath(pathData.coach.onboarding.start));
      }else{
        if (elt) {
          this.$store.dispatch("activeBottomNav", 4);
          this.$store.dispatch("setUserType", "coach");
          if(!this.$vuetify.breakpoint.smAndDown){
              this.$store.dispatch("toggleDialog");
          }else{
            if(this.$route.path != pathData.pages.login){
              this.$router.push(this.localePath(pathData.pages.login))
            }
          }
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.bootstrap-wrapper::v-deep {
  @import "~bootstrap/dist/css/bootstrap.min";
}
</style>
              