<template>
<v-container fluid grid-list-md text-xs-center>
    <Facebook v-if="loginMedium == 'facebook'" />
    <Google v-else-if="loginMedium == 'google'" />
    <v-row
      justify="center"
      v-else-if="loginMedium == 'email' || queryParamsLoginMedium == 'email'"
    >
      <v-col
        cols="12"
        sm="8"
        md="6"
        lg="4"
        xs="12"
      >
        <Email />
      </v-col>
    </v-row>
</v-container>
</template>

<script>
import Email from '@/components/login/medium/Email'
import Facebook from '@/components/login/medium/Facebook'
import Google from '@/components/login/medium/Google'
export default ({
  layout: "auth",
    components: {
      Email,
      Facebook,
      Google
    },
    computed: {
      loginMedium() {
        return this.$store.getters.loginMedium;
      },
      queryParamsLoginMedium(){
        if (this.$route?.query?.email) {
          return "email"
        }
        return ""
      }
    },
    data () {
      return{
      }
    },
    watch:{
      "$vuetify.breakpoint.smAndUp" : function() {
        this.$store.dispatch("setActivePopupItem", "postLoginUsingEmail");
        this.$store.dispatch("toggleDialog");
      }
    },
    mounted() {
        if (this.$route.query.status) {
            if (this.$route.query.status == "error") {
                if (this.$route.query.message_key) {
                this.$toast.error(this.$i18n.t(this.$route.query.message_key));
                }
            }
        }
    },
    methods: {},

})
</script>
