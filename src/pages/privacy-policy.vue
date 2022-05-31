<template>
    <div class="bootstrap-wrapper">
      <div class="container-fluid">
        <mobile-top-nav extraClass="body-bg-secondary" :headerText="$t('global_url_privacy_policy')">
          <template v-slot:goBack>
            <v-btn
              icon
              @click="handleBack"
            >
              <v-icon class="common-top-back-icon">mdi-chevron-left</v-icon>
            </v-btn>
          </template>
          <template v-slot:action>
            <span></span>
          </template>
        </mobile-top-nav>
        <div class="row">
          <div class="col-12 px-md-0">
            <div v-html="content"></div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { pageBuilderApi } from "@/api";
import { pathData } from "@/data";
import MobileTopNav from '@/components/layout/global/MobileTopNav'

export default {
  head() {
    return {
      title: this.$i18n.t("header_title_tag_front_policy"),
      titleTemplate: "%s"
    };
  },
  components: {
    MobileTopNav
  },
  data: () => ({
    content: ""
  }),
  async asyncData({ app, $axios }) {
  
    const { data } = await pageBuilderApi($axios).getPageByGroupName("PrivacyPolicy");

    let content = "";
    if (data.data) {
      if (data.data.pages.length) {
        data.data.pages.forEach(item => {
          if (item.locale == app.i18n.locale) {
            content = item.content;
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
    handleBack(){
      if(this.$auth.hasRole(["coach"])){
        this.$router.push(this.localePath(pathData.coach.profileMenu));
      }else if(this.$auth.hasRole(["athlete"])){
        this.$router.push(this.localePath(pathData.athlete.profileMenu));
      }else{
        this.$router.push(this.localePath(pathData.pages.home));
      }
    },
  }
};
</script>

<style scoped lang="scss">
.bootstrap-wrapper::v-deep {
  @import "~bootstrap/dist/css/bootstrap.min";
}
</style>
