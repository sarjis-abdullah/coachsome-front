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
      title: this.$i18n.t("header_title_tag_advisory_board"),
      titleTemplate: "%s"
    };
  },
  data: () => ({
    content: ""
  }),
  async asyncData({ app, $axios }) {
    let content = "";
    try {
      const { data } = await pageBuilderApi($axios).getPageByGroupName(
        "AdvisoryBoard"
      );

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
    } catch (error) {}

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
