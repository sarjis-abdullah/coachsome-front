<template>
<v-container fluid grid-list-md text-xs-center>
    <Facebook v-if="loginMedium == 'facebook'" />
    <Google v-else-if="loginMedium == 'google'" />
    <Email v-else-if="loginMedium == 'email'" />
</v-container>
</template>

<script>
import Email from '@/components/login/medium/Email'
import Facebook from '@/components/login/medium/Facebook'
import Google from '@/components/login/medium/Google'
export default ({
    components: {
      Email,
      Facebook,
      Google
    },
    computed: {
      loginMedium() {
        return this.$store.getters.loginMedium;
      },
    },
    data () {
      return{
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
