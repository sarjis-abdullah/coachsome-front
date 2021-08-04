<template>
  <div>
    <cookie-dialog :open="isOpenCookieDialog"></cookie-dialog>
  </div>
</template>

<script>
import CookieDialog from "@/components/dialogs/CookieDialog";

export default {
  components: {
    CookieDialog
  },
  data() {
    return {
      socket: null
    };
  },
  computed: {
    isOpenCookieDialog() {
      if (process.browser) {
        if (localStorage.getItem("cookie:accept") === null) {
          return true;
        } else {
          return false;
        }
      }
    }
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped></style>
