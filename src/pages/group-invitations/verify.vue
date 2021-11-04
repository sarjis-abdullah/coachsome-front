<template>
  <div class="group-invitations-verify">
    <div v-if="!hasError">
      <div class="d-flex flex-column justify-center align-center">
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
    <div v-else>
      <v-btn color="primary-light-1" outlined :to="localePath('/')">
        Go Home
      </v-btn>
    </div>
  </div>
</template>

<script>
import { pathData } from "@/data";
import { endpoint } from "../../api";

export default {
  data() {
    return {
      hasError: false,
      verified: false
    };
  },
  mounted() {
    if (this.$route.query.token) {
      this.$axios
        .post(endpoint.GROUP_INVITATIONS_VERIFY_POST, {
          token: this.$route.query.token
        })
        .then(({ data }) => {
          if (data.data.groupId) {
            this.$router.push(
              this.localePath({
                ...pathData.pages.chat,
                query: { groupId: data.data.groupId }
              })
            );
          }
        })
        .catch(({ response }) => {
          this.hasError = true
          if (response.data.error) {
            this.$toast.error(response.data.error.message);
          }
        })
       
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
