<template>
  <div class="text-center">
    <v-dialog v-model="dialog" :hide-overlay="hideOverlay" persistent width="100">
      <v-card color="white" class="d-flex justify-center align-center" width="auto">
        <v-card-text class="text-center pt-5">
          <img class="rotate" :src="require(`@/assets/images/logo-icon.png`)" alt="" height="40">
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
    show:{
      type:Boolean,
      default: false
    },
    hideOverlay:{
      type:Boolean,
      default: true
    }
  },
  data() {
    return {
      dialog: false,
    };
  },
  watch: {
    show: {
      immediate: true,
      handler(val) {
        this.dialog = val;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.rotate {
  animation: rotation 1s infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
