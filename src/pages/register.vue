<template>
<v-container fluid grid-list-md text-xs-center class="d-flex" >
    <v-layout row wrap class="align-items-to-center" >
        <v-flex xs12>
            <router-link to="/login-with-email"> 
                <img class="caret-left" :src="require('@/assets/img/svg-icons/carrot-left.svg')" alt=""> 
            </router-link>
        </v-flex>
        <v-flex xs12 class="align-items-to-center" >
            <p class="register-title">{{$t("pwa_register_title")}}</p>
        </v-flex>
        <v-flex xs12 class="align-items-to-center">
            <img class="trophy"  :src="require('@/assets/img/svg-icons/trophy.svg')" alt="">
        </v-flex>
        <v-flex xs12 class="align-items-to-center">
            <img class="registration-steps" :src="require('@/assets/img/svg-icons/Steps-3.svg')" alt="">
        </v-flex>
        <v-flex xs10 > 
            <p class="login-email-label mt-2 "> {{$t("pwa_email_label_text")}}</p>
            <p class="login-email-text mt-2 "> {{email}}</p>
        </v-flex>
        <v-flex xs10 class="align-items-to-center ">
                  <v-text-field
                    outlined
                    dense 
                    id="first_name"
                    v-model="first_name"
                    class="cs-input-text-field-login"
                    :placeholder="$t('pwa_first_name_hint')"
                    required
                    name="first_name"
                    :label="$t('pwa_first_name')"
                    :rules="first_name_rules"
                  />
        </v-flex>
        <v-flex xs10 class="align-items-to-center ">
                  <v-text-field
                    outlined
                    dense 
                    id="last_name"
                    v-model="last_name"
                    class="cs-input-text-field-login"
                    :placeholder="$t('pwa_last_name_hint')"
                    required
                    name="last_name"
                    :label="$t('pwa_last_name')"
                    :rules="last_name_rules"
                  />
        </v-flex>
          <v-flex xs10 class="align-items-to-center ">
                <v-text-field
                    outlined
                    dense
                    v-model="password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    :label="$t('setting_sec_password_title')"
                    @click:append="show1 = !show1"
                    id="password"
                    class="cs-input-text-field-login"
                    :rules="password_rules"
                    required
                    style=""
                    @keyup.enter="login"
                  />
                 </v-flex>
        <v-flex xs10 class="align-items-to-center">
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            style="width:100%"
          >
            <v-btn 
              block
              color="#EDB041"
              class="white--text continue-with-email-btn"
              :loading="show_loading_on_login_btn"
              @click="register()"
            >
                {{$t("pwa_finish")}}
            </v-btn>
          </v-form>
        </v-flex>
        <v-flex xs10 class="align-items-to-center mt-2" >
            <p class="register-footer-text">{{ $t("pwa_login_footer_1") }} 
                <router-link :to="uri.terms" class="link-text"><u>{{ $t("global_url_terms_of_use") }}</u></router-link>
                  {{ $t("pwa_login_footer_2") }}
                  <router-link :to="uri.policy" class="link-text"><u>{{ $t("global_url_privacy_policy") }}</u></router-link>
              </p>
        </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { authApi } from "@/api";
import { pathData } from "@/data";
import axios from "@/plugins/axios";
export default ({
  layout: "auth",
    data () {
      return {
        email: this.$store.getters.existingUserEmail || " ",
        uri: {
          policy: pathData.pages.policy,
          terms: pathData.pages.terms,
        },
        show1: false,
        show2: true,
        show3: false,
        show4: false,
        snackbar: {
          multiLine: true,
          show: false,
          text: ""
        },
        show_loading_on_login_btn: false,
        deferredPrompt: null,
        loading: false,
        name: false,
        valid: true,
        user_type: "coach",
        agree_to_terms: true,
        first_name: '',
        first_name_rules: [
          (v) => !!v || this.$i18n.t("valid_required_first_name"),
          (v) => /^([A-Za-zæøåÆØÅ]\s*)+$/.test(v) || this.$i18n.t("valid_first_name_only_letter"),
        ],
        last_name: "",
        last_name_rules: [
          (v) => !!v || this.$i18n.t("valid_required_last_name"),
          (v) => /^([A-Za-zæøåÆØÅ]\s*)+$/.test(v) || this.$i18n.t("valid_last_name_only_letter"),
        ],
        password: '',
        password_rules: [
          (v) => !!v || this.$i18n.t("valid_pass_required"),
          (v) =>/^(?=.*[A-Z]).*$/.test(v) || this.$i18n.t("valid_at_least_one_upper_case_letter"),
          (v) => (v && v.length >= 6) || this.$i18n.t("valid_pass_min_character"),
        ],
      }
    },
    watch:{
      "$vuetify.breakpoint.smAndUp" : function() {
        this.$store.dispatch("setActivePopupItem", "Register");
        this.$store.dispatch("toggleDialog");
      }
    },
    async created(){
      let user_email = this.$route.query.email || '';
      if(user_email != ''){

        let payload = {
          email: this.email
        };
        const response =  await authApi(this.$axios).login(payload);
        if(response.data.email_exist){
          this.hideLoading();
          this.$store.dispatch("setExistingEmail", this.email);
          this.$router.push(this.localePath(pathData.pages.postEmailLogin));
          this.$toast.error("You've already registered! please login to continue.");
          this.$Progress.finish()
        }else{
            if (response.data.message) {
            this.$toast.error(response.data.message);
          }
        }
      }
    },
    methods: {
        backToLogin(){
          this.$store.dispatch("setActivePopupItem", "loginUsingEmail")
        },
        async register() {
          try {
            let payload = {
              first_name: this.first_name,
              last_name: this.last_name,
              email: this.email,
              password: this.password,
              user_type: this.user_type,
              agree_to_terms: this.agree_to_terms,
              lang: localStorage.getItem("curr_lang"),
            };
            const response = await authApi(this.$axios).postRegister(payload);
            if (response.data.status == "success") {
              this.$axios
                .put("auth/emailVerification", {
                  request_from_pwa: true,
                  email: this.email,
                })
                .then(response => {
                  if (response.status == 200) {
                    this.$toast.success(
                      "Congrats! You have registered successfully."
                    );
                    this.$router.push(this.localePath(pathData.pages.getStarted));
                  }
                })
                .catch(error => {
                  this.$toast.error(error.response.data.message);
                });
            }else{
              if (response.data.message) {
                this.$toast.error(response.data.message);
              }
            }
          } catch (error) {
            console.log(error.response.data.message);
            this.$toast.error(error.response.data.message);
          } finally {
            //
          }
          
        }

    }
})
</script>


<style scoped>
.align-items-to-center{
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-title{
    font-family: Open Sans;
    font-style: normal;
    font-weight: 800;
    font-size: 25px;
    line-height: 34px;
    display: flex;
    align-items: center;

    color: #15577C;

}

.mail-completed{
    position: absolute;
    width: 75px;
    height: 56px;

}
.mail-open{
    /* position: absolute; */
    width: 140px;
    height: 140px;
}
.login-email-label{
    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    /* identical to box height */


    /* Dusty blue */

    color: #15577C;

}
.login-email-text{
    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    /* identical to box height */

    display: flex;
    align-items: center;

    color: #8692A6;

}
.continue-with-email-btn{
  background: #EDB041;
  border-radius: 6px;
  width: 100%;
  text-transform: none !important;
}
.register-footer-text{
    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 14px;

    /* Dusty blue */
    text-align: center;
    color: #15577C;

}
.link-text{
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  text-decoration-line: underline;
  color: #15577C;
}
</style>
