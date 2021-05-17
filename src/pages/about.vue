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
import { endpointData } from "@/data";

export default {
  head() {
    return {
      title: this.$i18n.t("header_title_tag_front_about"),
      titleTemplate: "%s"
    };
  },
  data: () => ({
    content: ""
  }),
  async asyncData({ app, $axios }) {
    const { data } = await $axios.get(
      endpointData.TIKCMS_GET_PAGE_BY_GROUP_NAME,
      {
        params: {
          page_group_name: "About"
        }
      }
    );

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
