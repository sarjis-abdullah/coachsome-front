<template>
  <v-btn small color="#D61BA2" dark @click="toggleDrawer()">
    <slot>
      {{ $t("btn_label_toggle_drawer") }}
    </slot>
  </v-btn>
</template>

<script>
export default {
  methods: {
    toggleDrawer() {
      this.$store.dispatch("toggleClientBackDrawer");
    },
  },
};
</script>

<style lang="scss" scoped></style>
