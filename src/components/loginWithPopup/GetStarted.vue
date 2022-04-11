<template>
  <div>
     <v-row class="justify-center  half-area align-items-to-center py-10"  :style="{backgroundImage: background_image_1}">
          <v-col cols="12" class="align-items-to-center">
              <p class="top-title">{{$t("pwa_role_title")}}</p>
            </v-col>
          <v-col cols="12"  class="align-items-to-center px-15">
            <v-btn 
              rounded
              block
              color="#15577C"
              class="white--text athlete-btn"
              :loading="show_loading_on_athlete_btn"
              @click="setUserTypeAsAthlete()"
            >
                {{$t("pwa_athlete")}}
            </v-btn>
          </v-col>
          <v-col cols="12"  class="align-items-to-center px-5">
            <p class="footer-text">{{$t("pwa_role_desc_athlete")}}</p>
          </v-col>
      </v-row>
      <v-row class="justify-center  half-area align-items-to-center py-10"  :style="{backgroundImage: background_image_2}">
          <v-col cols="12" class="align-items-to-center">
            <p class="bottom-title" >{{$t("pwa_or_as")}}</p>
          </v-col>
          <v-col cols="12"  class="align-items-to-center px-15">
            <v-btn 
              rounded
              block
              color="#6EB5CB"
              class="white--text coach-btn"
              @click="setUserTypeAsCoach()"
              :loading="show_loading_on_coach_btn"
            >
                {{$t("home_search_group_item_name")}}
            </v-btn>
          </v-col>
          <v-col cols="12"  class="align-items-to-center px-5">
            <p class="footer-text">{{$t("pwa_coach_desc_text")}}</p>
          </v-col>
      </v-row>
  </div>
</template>
<script>
import { roleHelper } from "@/helper";
import { pathData } from "@/data";
export default({
    data () {
      return {
        show_loading_on_coach_btn: false,
        show_loading_on_athlete_btn: false,
        background_image_1: `url(${require('@/assets/img/bg/get-started-1.svg')})`,
        background_image_2: `url(${require('@/assets/img/bg/get-started-2.svg')})`,
        user_type: "",
        email: "",
      }
    },
    created(){
      
      if(this.hasRole()){
        this.$router.push(this.localePath(pathData.pages.home));
      }
    },
    methods: {
      hasRole() {
        return roleHelper.hasAnyRole();
      },
      setUserTypeAsAthlete(){
        this.user_type = 'athlete';
        this.attachRole();
      },
      setUserTypeAsCoach(){
        this.user_type = 'coach';
        this.attachRole();
      },
      attachRole(){
        if(this.user_type == 'coach'){
          this.show_loading_on_coach_btn = true;
        }else if(this.user_type == 'athlete'){
          this.show_loading_on_athlete_btn = true;
        }
        this.$axios
          .post("pwa/attach-user-role", { email: this.$store.getters.existingUserEmail,
          user_type: this.user_type })
          .then(response => {
            if (response.data.status == 'success') {
              this.$toast.success(response.data.message+'. You can login now!');
              this.$store.dispatch("setActivePopupItem", "postLoginUsingEmail");
            }
          })
          .catch(error => {
            this.show_loading_on_coach_btn = false;
            this.show_loading_on_athlete_btn = false;
            this.$toast.error(error.response.data.message);
          });
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
.total-area {
    height:100vh;
}
.half-area{
  background-size: cover;
  background-repeat: no-repeat;
}
.half-area::before {
    content: "";
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background-color: rgba(0, 0, 0, 0.2);
}
.top-title, .bottom-title{
  font-family: Open Sans;
  font-style: normal;
  font-weight: 800;
  font-size: 32px;
  line-height: 44px;
  /* G100 */
  z-index: 1;

  color: #F7FAFC;
}

.v-btn{
  border-radius: 22px;
  width: 100%;
  z-index: 1!important;
  text-transform: none !important;
}

.footer-text{
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  text-align: center;

  /* G100 */
  z-index: 1;
  color: #F7FAFC;

}
.container {
    padding: 0 12px!important;
}

</style>
