<template>
  <div>
    <iframe
      style="width: 100vw; height: 94vh"
      :src="url"
      title="Page Builder"
      @load="onLoad()"
    ></iframe>
  </div>
</template>

<script>
import { pageBuilderApi } from "@/api";

export default {
  layout: "admin",
  data() {
    return {};
  },
  computed: {
    url() {
      return (
        process.env.PAGE_BUILDER_URL +
        "/public?access_token=" +
        this.$auth.strategy.token.get().split(" ")[1]
      );
    }
  },
  created() {
    pageBuilderApi(this.$axios)
      .getPage("Terms")
      .then(({ data }) => {
        console.log(data);
      });
  },
  methods: {
    onLoad() {}
  }
};
</script>

<style lang="scss" scoped></style>
