<template>
  <div class="group-invitations-verify">
    <div class="d-flex flex-column justify-center align-center">
      <div>
        <v-progress-circular
          :size="30"
          color="primary-light-2"
          indeterminate
        ></v-progress-circular>
      </div>
      <div class="subtitle-2">
        Verifying ....
      </div>
    </div>
  </div>
</template>

<script>
import { pathData } from "@/data";

export default {
  mounted() {
    if (this.$route.query.token) {
        console.log(this.$route.query.token)
    } else {
      this.$router.push(
        this.localePath({
          ...pathData.pages.chat,
          query: { groupId: 1 }
        })
      );
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.group-invitations-verify {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
