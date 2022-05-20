<template>
<v-container fluid grid-list-md text-xs-center class="d-flex">
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

        <v-row>
            <v-col cols="12">
                <router-link to="/login-with-email"> 
                    <img class="caret-left" :src="require('@/assets/img/svg-icons/carrot-left.svg')" alt=""> 
                </router-link>
            </v-col>
        </v-row>

            <v-row
              align="center"
              justify="center"
              class="mt-5"
            >
              <v-col cols="12" class="align-items-to-center">
                <p class="otp-title">{{$t("pwa_otp_validation_title_1")}}<br>{{$t("pwa_otp_validation_title_2")}}</p>
              </v-col>
            </v-row>
            <v-row class=" justify-center">
              <v-col cols="12">
                <div >
                  <p class="otp-validation-subtitle">{{$t("pwa_verification_email_has_sent_title")}}</p>
                </div>
              </v-col>
            </v-row>
            <v-row class="justify-center">
              <v-col cols="12">
                <v-otp-input
                    v-model="otp"
                    length="4"
                    type="number"
                    :disabled="loading"
                    @finish="onFinish"
                    color="#E1E8F1"
                    background-color="#E1E8F1"
                ></v-otp-input>
              </v-col>
            </v-row>
            <v-row class="justify-center">
              <v-col cols="12">
                  <p class="otp-footer-text">{{$t("pwa_didnt_receive_email")}}</p>
              </v-col>
            </v-row>
            <v-row class="justify-center">
              <v-col cols="12">
                <v-btn 
                    color="#EDB041"
                    class="white--text register-btn"
                    block
                    :loading="show_loading_on_reset_btn"
                    @click="resendEmail()"
                >
                    {{$t("pwa_resend_email")}}
                </v-btn>
              </v-col>
            </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { authApi } from "@/api";
import { pathData } from "@/data";
export default ({
  layout: "auth",
    data () {
      return{
          email: this.$store.getters.existingUserEmail || " ",
          show_loading_on_reset_btn: false,
          otp: "",
          loading: false,
      }
    },
    watch:{
      "$vuetify.breakpoint.smAndUp" : function() {
        this.$store.dispatch("setActivePopupItem", "ResetOTPValidation");
        this.$store.dispatch("toggleDialog");
      }
    },
    methods: {
      onFinish (otp_code) {
        this.loading = true
        let payload = {
          email : this.email,
          otp: otp_code
        }
        authApi(this.$axios)
        .resetOTPValidation(payload)
        .then(response => {
          if(response.status == 200){
            this.$store.dispatch("setExistingEmail", this.email);
            this.$router.push(this.localePath(pathData.pages.passwordReset))
            this.$toast.success(response.data.message);
          }else{
            //
          }
        })
        .catch((e) => {
          this.otp = ""
          this.loading = false
          this.$toast.error(e.response.data.message);
        });
      },
       
      resendEmail() {
        this.show_loading_on_reset_btn = true;
        let payload = {
            email: this.email
        };
        authApi
            .passowrdRecovery(payload)
            .then(response => {
              if(response.status == 200){
                this.$toast.success(response.data.message);
                this.show_loading_on_reset_btn = false;
              }
            })
            .catch(({ response }) => {
              this.show_loading_on_reset_btn = false;
              if (response.data.message) {
                this.$toast.error(response.data.message);
              }
            });
      },
    }
})
</script>


<style scoped>

.v-application {
  line-height: 0!important;
}
.w-100{
  width: 100% !important;
}
.tm-login-logo {
  height: 100px;
}
.cs-login-sec{
  height: calc(100vh - 248px);
  position: relative;
  min-height: 280px;
}
.cs-login-middle {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.cs-login-footer {
  height: 100px;
}

.align-items-to-center{
  display: flex;
  justify-content: center;
  align-items: center;
}

.otp-title{
    font-family: Open Sans;
    font-style: normal;
    font-weight: 800;
    font-size: 25px;
    line-height: 34px;
    display: flex;
    align-items: center;
    text-align: center;

    color: #15577C;
}

.otp-validation-subtitle{
    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    display: flex;
    align-items: center;
    text-align: center;

    color: #15577C;
}

.otp-footer-text{
    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 14px;
    display: flex;
    align-items: center;
    text-align: center;

    color: #15577C;
}

</style>
