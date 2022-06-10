<template>
    <v-btn
        elevation="2"
        outlined
        color="#49556A"
        class="default--login-button"
        @click="loginWithFacebook()"
        :loading="show_loading_on_facebook_login_btn"
        block
    >
        <img class="btn-icon"  :src="require('@/assets/img/svg-icons/facebook.svg')" alt="">  <span class="btn-text"> {{ $t("pwa_facebook_login") }}</span>
    </v-btn>
</template>

<script>
import { pathData } from "@/data";
export default ({
    data () {
      return{
        show_loading_on_facebook_login_btn : false,
      }
    },
   
    mounted() {
      this.show_loading_on_facebook_login_btn = false;
    },
    methods: {
      loginWithFacebook() {
        this.show_loading_on_facebook_login_btn = true;
        window.location.href =
          process.env.API_SERVER_URL + "/auth/login/facebook?user_type=coach";
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
