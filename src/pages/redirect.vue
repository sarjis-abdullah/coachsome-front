<template>
  <div></div>
</template>

<script>
import { userApi } from "@/api";
import { pathData } from "@/data";

export default {
  data: () => ({
    loading: true
  }),
  mounted() {
    if (this.$route.query.access_token) {
      userApi(this.$axios)
        .authUserInformation()
        .then(({ data }) => {
          this.$auth.setUser(data.user);
          this.$auth.setUserToken(this.$route.query.access_token);
          if (this.$auth.hasRole(["coach"])) {
            this.$router.push(this.localePath(pathData.coach.editProfile));
          } else if (this.$auth.hasRole(["athlete"])) {
            this.$router.push(this.localePath(pathData.athlete.editProfile));
          } else {
            this.$router.push(this.localePath(pathData.admin.dashboard));
          }
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss" scoped></style>
