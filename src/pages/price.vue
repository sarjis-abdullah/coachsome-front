<template>
  <div class="bootstrap-wrapper">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 px-md-0">
          <div v-html="content" @click="handleClick"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { pageBuilderApi } from "@/api";
import {pathData} from '@/data'

export default {
  head() {
    return {
      title: this.$i18n.t("price_header_title_txt"),
      titleTemplate: "%s"
    };
  },
  data: () => ({
    content: ""
  }),
  mounted() {
 
  },
  async asyncData({ app, $axios }) {
     const { data } = await pageBuilderApi($axios).getPageByGroupName("Pricing");

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
handleClick(e) {
      const elt = e.target.closest(".btn-pricing");
      if(this.$auth.loggedIn){
        if(this.$auth.loggedIn && this.$auth.hasRole(["superadmin", "admin", "staff"])){
            this.$router.push(this.localePath(pathData.admin.dashboard))
        }else if(this.$auth.loggedIn && this.$auth.hasRole(["coach"])){
            this.$router.push(this.localePath(pathData.coach.home))
        }else if(this.$auth.loggedIn && this.$auth.hasRole(["coach"])){
            this.$router.push(this.localePath(pathData.coach.home))
        }else{
            this.$router.push(this.localePath(pathData.pages.home))
        }
      }else{
        if (elt) {
          this.$store.dispatch("activeBottomNav", 4);
          if(!this.$vuetify.breakpoint.xsOnly){
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
