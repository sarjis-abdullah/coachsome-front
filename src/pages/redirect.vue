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
    // Request from params indicate the request comes from
    // may be it is login page or setting page of athlete or coach
    if (this.$route.query.action == "security_identify") {
      window.opener.postMessage(
        { status: "success" },
        process.env.CLIENT_BASE_URL
      );
      window.close();
    } else {
      // if (this.$route.query.access_token) {
      //   this.$auth.setUserToken(this.$route.query.access_token);
      //   userApi(this.$axios)
      //     .authUserInformation()
      //     .then(({ data }) => {
      //       this.$auth.setUser(data.user);
      //       if (this.$auth.hasRole(["coach"])) {
      //         this.$router.push(this.localePath(pathData.coach.editProfile));
      //       } else if (this.$auth.hasRole(["athlete"])) {
      //         this.$router.push(this.localePath(pathData.athlete.editProfile));
      //       } else {
      //         this.$router.push(this.localePath(pathData.admin.dashboard));
      //       }
      //     })
      //     .catch(() => {});
      // }
      if (this.$route.query.access_token) {
        this.$store.dispatch("putToken", this.$route.query.access_token);
        this.$auth.setUserToken(this.$route.query.access_token);
        userApi(this.$axios)
          .authUserInformation()
          .then(({ data }) => {
            this.$store.dispatch("setExistingEmail", data.user.email);
            this.$store.dispatch("setUser", data.user);
            this.$auth.setUser(data.user);
            this.$socket.emit("connected", this.$auth.user.id);
            if(data.user.roles && data.user.roles[0]){

              let authUser = data.user;

              if(authUser.roles[0].name == "superadmin" || authUser.roles[0].name == "admin" || authUser.roles[0].name == "staff"){
                this.$router.push(this.localePath(pathData.admin.dashboard));
              }else if(authUser.roles[0].name == "coach"){
                this.$router.push(this.localePath(pathData.coach.home));
              }else if(authUser.roles[0].name == "athlete"){
                this.$router.push(this.localePath(pathData.athlete.home));
              }else{
                this.$router.push(this.localePath(pathData.pages.home));
              }
            }else{
              this.$router.push(this.localePath(pathData.pages.getStarted));
            }
            
          })
          .catch(() => {});
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
