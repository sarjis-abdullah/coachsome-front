<template>
  <div class="bootstrap-wrapper">
    <div class="container-fluid">
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
  methods: {}
};
</script>

<style scoped lang="scss">
.bootstrap-wrapper::v-deep {
  @import "~bootstrap/dist/css/bootstrap.min";
}
</style>
