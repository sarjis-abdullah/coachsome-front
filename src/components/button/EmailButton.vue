<template>
    <v-btn
        elevation="2"
        outlined
        color="#49556A"
        class="default--login-button"
        @click="loginWithEmail()"
        :loading="show_loading_on_email_login_btn"
        block
    >
        <img class="btn-icon" :src="require('@/assets/img/svg-icons/mail.svg')" alt="">  <span class="btn-text"> {{ $t("pwa_email_login") }}</span>
    </v-btn>
</template>

<script>
import { pathData } from "@/data";
export default ({
    data () {
      return{
        show_loading_on_email_login_btn : false,
      }
    },
   
    mounted() {
      this.show_loading_on_email_login_btn = false;
    },
    methods: {
      loginWithEmail() {
        this.show_loading_on_email_login_btn = true;
        if(this.$vuetify.breakpoint.smAndDown){
          this.$router.push(this.localePath(pathData.pages.emailLogin))
        }else{
          this.$store.dispatch("setActivePopupItem", "loginUsingEmail")
        }
      }
    },

})
</script>


<style scoped>
.btn-icon{
  margin-right: auto;
}

.btn-text{
  margin-right: auto;
}
</style>
