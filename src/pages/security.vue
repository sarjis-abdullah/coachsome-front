<template>
    <v-container fluid >
        <mobile-top-nav extraClass="body-bg-secondary" :headerText="$t('athlete_settings_tab_security')">
            <template v-slot:goBack>
                <v-btn
                icon
                @click="handleBack"
                >
                <v-icon class="common-top-back-icon">mdi-chevron-left</v-icon>
                </v-btn>
            </template>
            <template v-slot:action>
                <span></span>
            </template>
        </mobile-top-nav>

        <v-row
        justify="center"
        >
        <v-col
            cols="12"
            sm="8"
            md="6"
            lg="4"
            xs="12"
        >


            <div class="security-title mt-5">
                {{$t("text_verify_profile")}}
            </div>
            <v-row class="mt-5">
                <v-col cols="7" class="d-flex align-center">
                    <v-icon color="#6EB5CB">mdi-email-outline</v-icon>
                    <div class="security-subtitle">
                    {{$t("pwa_email")}}
                    </div>
                </v-col>
                <v-col cols="5" class="text-right">
                    <div class="security-subtitle-checked" v-if="security.isEmailVerified">
                        {{$t("txt_verified")}} <v-icon color="#15577C">mdi-check</v-icon>
                    </div>
                    <v-btn
                        depressed block
                        outlined
                        color="#15577C"
                        v-if="!security.isEmailVerified"
                        @click="handleEmailVerifyBtnClick"
                    >
                        {{$t("txt_verify")}}
                    </v-btn>
                </v-col>
            </v-row>

            <!-- <v-row class="mt-5">
                <v-col cols="7" class="d-flex align-center">
                    <v-icon color="#6EB5CB">mdi-phone</v-icon>
                    <div class="security-subtitle">
                        SMS / Text message
                    </div>
                </v-col>
                <v-col cols="5" class="text-right">
                    <v-btn
                        depressed block
                        outlined
                        color="#15577C"
                        disabled
                        @click="handlePhoneVerifyBtnClick"
                    >
                        {{$t("txt_verify")}}
                    </v-btn>
                </v-col>
            </v-row> -->
            
            <div class="security-title mt-10">
               {{$t("athlete_settigs_conect_social_account")}}
            </div>

            <v-row class="mt-5">
                <v-col cols="7" class="d-flex align-center">
                    <v-icon color="#4267B2">mdi-facebook</v-icon>
                    <div class="security-subtitle">
                        Facebook
                    </div>
                </v-col>
                <v-col cols="5" class="text-right">
                    <v-btn
                        depressed block
                        outlined
                        color="#15577C"
                        v-if="!security.isConnectedFacebook"
                        @click="handleFacebookVerifyBtnClick"
                    >
                        {{$t("txt_connect")}}
                    </v-btn>
                    <!-- <v-btn v-else depressed block color="success">
                        {{$t("txt_connected")}}
                    </v-btn> -->
                    <div class="security-subtitle-checked" v-else>
                        {{$t("txt_connected")}} <v-icon color="#15577C">mdi-check</v-icon>
                    </div>
                </v-col>
            </v-row>

            <v-row class="mt-5">
                <v-col cols="7" class="d-flex align-center">
                    <v-icon color="#EB4335">mdi-google</v-icon>
                    <div class="security-subtitle">
                        Google
                    </div>
                </v-col>
                <v-col cols="5" class="text-right">
                    <v-btn
                        depressed block
                        outlined
                        color="#15577C"
                        v-if="!security.isConnectedGoogle"
                        @click="handleGoogleVerifyBtnClick"
                    >
                        {{$t("txt_connect")}}
                    </v-btn>
                    <!-- <v-btn v-else depressed block color="success">
                        {{$t("txt_connected")}}
                    </v-btn> -->
                    <div class="security-subtitle-checked" v-else>
                        {{$t("txt_connected")}} <v-icon color="#15577C">mdi-check</v-icon>
                    </div>
                </v-col>
            </v-row>

            <!-- <v-row class="mt-5">
                <v-col cols="7" class="d-flex align-center">
                    <v-icon color="#47ACDF">mdi-twitter</v-icon>
                    <div class="security-subtitle">
                        Twitter
                    </div>
                </v-col>
                <v-col cols="5" class="text-right">
                    <v-btn
                        depressed block
                        outlined
                        color="#15577C"
                        v-if="!security.isConnectedTwitter"
                        @click="handleTwitterVerifyBtnClick"
                    >
                        {{$t("txt_connect")}}
                    </v-btn>
                    <v-btn v-else depressed block color="success">
                        {{$t("txt_connected")}}
                    </v-btn>
                </v-col>
            </v-row> -->

        </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { endpoint } from "../api";
import { pathData, settingValueData, roleData } from "@/data";
import MobileTopNav from '@/components/layout/global/MobileTopNav'

export default ({
    layout: "common",
    components: {MobileTopNav},
    data(){
        return {
            settingValueData,
            action: "security_identify",
            tab: null,
            security: {
                isEmailVerified: null,
                isPhoneNumberVerified: null,
                isConnectedFacebook: null,
                isConnectedGoogle: null,
                isConnectedTwitter: null
            },
        }
    },
    // computed: {
    //     redirectLink(){
    //         return this.$auth.hasRole(["coach"]) ? this.localePath(pathData.coach.profileMenu) : this.localePath(pathData.athlete.profileMenu);
    //     },
    // },
    watch:{
        "$vuetify.breakpoint.smAndUp" : function() {
            if(this.$auth.hasRole(["coach"])){
                this.$router.push(this.localePath(pathData.coach.settings));
            }else if(this.$auth.hasRole(["athlete"])){
                this.$router.push(this.localePath(pathData.athlete.settings));
            }
        }
    },
    created(){
        this.securityDetails();
    },
    mounted() {
        window.addEventListener("message", this.onMessage, false);
    },
    methods: {
        handleBack(){
            if(this.$auth.hasRole(["coach"])){
                this.$router.push(this.localePath(pathData.coach.settings));
            }else if(this.$auth.hasRole(["athlete"])){
                this.$router.push(this.localePath(pathData.athlete.settings));
            }
        },
        onMessage(e) {
            this.securityDetails();
        },
        openWindow(url, title, options = {}) {
            if (typeof url === "object") {
                options = url;
                url = "";
            }

            options = { url, title, width: 600, height: 720, ...options };

            const dualScreenLeft =
                window.screenLeft !== undefined
                ? window.screenLeft
                : window.screen.left;
            const dualScreenTop =
                window.screenTop !== undefined ? window.screenTop : window.screen.top;
            const width =
                window.innerWidth ||
                document.documentElement.clientWidth ||
                window.screen.width;
            const height =
                window.innerHeight ||
                document.documentElement.clientHeight ||
                window.screen.height;

            options.left = width / 2 - options.width / 2 + dualScreenLeft;
            options.top = height / 2 - options.height / 2 + dualScreenTop;

            const optionsStr = Object.keys(options)
                .reduce((acc, key) => {
                acc.push(`${key}=${options[key]}`);
                return acc;
                }, [])
                .join(",");

            const newWindow = window.open(url, title, optionsStr);

            if (window.focus) {
                newWindow.focus();
            }

            return newWindow;
        },
        async handleEmailVerifyBtnClick() {
            try {
                const { data } = await this.$axios.post(
                    endpoint.VERIFICATIONS_EMAIL_VERIFY_POST
                );
                this.$toast.success("An email was sent to your email address.");
            } catch (error) {
                this.$toast.error(error.response.data.error.message);
            }
        },
        async handlePhoneVerifyBtnClick() {
            try {
                const { data } = await this.$axios.post(
                endpoint.VERIFICATIONS_EMAIL_VERIFY_POST
                );
            } catch (error) {
                this.$toast.error(error.response.data.error.message);
            }
        },
        async handleFacebookVerifyBtnClick() {
            window.location.href =
                process.env.API_SERVER_URL +
                "/auth/login/facebook?user_id=" +
                this.$auth.user.id +
                "&action=" +
                this.action +
                "&pwa=pwa_identify";
        },
        async handleGoogleVerifyBtnClick() {
            window.location.href =
                process.env.API_SERVER_URL +
                "/auth/login/google?user_id=" +
                this.$auth.user.id +
                "&action=" +
                this.action +
                "&pwa=pwa_identify";

                
        },
        async handleTwitterVerifyBtnClick() {
            try {
                const { data } = await this.$axios.post(
                endpoint.VERIFICATIONS_TWITTER_VERIFY_POST
                );
            } catch (error) {
                this.$toast.error(error.response.data.error.message);
            }
        },
        async securityDetails() {
            try {
                const { data } = await this.$axios.get(endpoint.SECURITIES_GET);
                if (data.data) {
                this.security.isEmailVerified = data.data.emailVerifiedAt;
                this.security.isPhoneNumberVerified = data.data.phoneNumberVerifiedAt;
                this.security.isConnectedFacebook = data.data.facebookConnectedAt;
                this.security.isConnectedGoogle = data.data.googleConnectedAt;
                this.security.isConnectedTwitter = data.data.twitterConnectedAt;
                }
            } catch (error) {
                if (error.response.data.error) {
                this.$toast.error(error.response.data.error.message);
                }
            }
        },
    }


})
</script>


<style scoped lang="scss">

.v-application {
  line-height: 0!important;
}
.w-100{
  width: 100% !important;
}

.security-top-title{
  font-family: Open Sans;
  font-style: normal;
  font-weight: 300;
  font-size: 36px;
  line-height: 49px;
  /* identical to box height */

  text-transform: uppercase;

  /* Dusty blue */

  color: #15577C;
}
  .security-title {
    font-family: $font-family;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 25px;
    /* identical to box height */

    text-transform: uppercase;

    /* Dusty blue */

    color: #15577C;

  }

  .security-subtitle {
    margin-left: 20px;
    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    /* identical to box height */

    text-transform: capitalize;

    color: #15577C;

  }
  .security-subtitle-checked {
    // margin-left: 20px;
    font-family: Open Sans;
    font-style: normal;
    font-weight: 800;
    font-size: 14px;
    line-height: 19px;
    /* identical to box height */

    text-align: right;

    color: #58A942;
  }
</style>
