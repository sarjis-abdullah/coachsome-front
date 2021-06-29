<template>
  <div class="marketplace-page">
    <MarketplaceContent />
  </div>
</template>

<script>
import MarketplaceContent from "@/components/artifact/global/pages/marketplace/Content";

export default {
  layout: "marketplace",
  components: {
    MarketplaceContent
  },
  head() {
    return {
      title: this.$i18n.t("header_title_tag_front_marketplace"),
      titleTemplate: "%s"
    };
  }
};
</script>

<style lang="scss" scoped>
.marketplace-page {
  background: $body-bg;

}
</style>
