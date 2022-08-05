<template>
  <div class="bootstrap-wrapper">
    <div class="container-fluid">
      <mobile-top-nav extraClass="body-bg-secondary" :headerText="$t('title_become_a_coach')">
        <template v-slot:goBack>
          <v-btn
            icon
          >
          </v-btn>
        </template>
        <template v-slot:action>
          <span></span>
        </template>
      </mobile-top-nav>
      <div class="row">
        <div class="col px-md-0">
        <div v-html="content" @click="handleClick"></div>
          <!-- <html>
            <head>
            <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
            </head>
           <body> 
              <style>
                .py-0{
                  padding: 0!important;
                }
                .py-5{
                  padding: 20px!important;
                }
                .py-8{
                  padding: 32px!important;
                }
                .py-15{
                  padding: 60px!important;
                }
                .pb-0{
                  padding-bottom: 0!important;
                }
                .pb-5{
                  padding-bottom: 20px!important;
                }
                .pt-0{
                  padding-top: 0!important;
                }  
                .pt-15{
                  padding-top: 60px!important;
                }    
                
                .card .card-body {
                    background-color: #d61ba2;
                  color: white;       
                }         
                .card,.card-body {
                  border-bottom-left-radius: 20px !important;
                  border-bottom-right-radius: 20px !important;       
                }
                .becoame-coach-header{
                  font-family: Open Sans, sans-serif !important;
                  font-style: normal;
                  font-weight: 700;
                  font-size: 64px;
                  line-height: 77px;
                  color: #49556A;
                }
                .becoame-coach-description{
                  font-family: Open Sans, sans-serif !important;
                  font-style: normal;
                  font-weight: 400;
                  font-size: 24px;
                  line-height: 35px;
                  color: #49556A;
                }
                .btn-coach{
                  font-family: Open Sans, sans-serif !important;
                  background-color: #15577C!important;
                  border-radius: 12px!important;
                  padding: 5px 37px;
                  width: 300px;
                  height: 50px;
                  font-size: 20px;
                }
                .coach-box{
                  padding: 0 3rem!important;
                }
                
                .first-box{
                  background-color: #F7FAFC!important;
                }
                .second-box{
                  background-color: white!important;
                  padding: 8px 3rem!important;
                }
                
                .coach-select-sub-title{
                  font-family: Open Sans, sans-serif !important;
                  font-style: normal;
                  font-weight: 700;
                  font-size: 50px;
                  line-height: 56px;
                  text-align: center;
                  color: #49556A;
                }
                .display-align-center{
                    display: flex;
                    justify-content: center!important;
                }
                .coach-title-text{
                  font-family: Open Sans, sans-serif !important;
                  font-style: normal;
                  font-weight: 600;
                  font-size: 34px;
                  line-height: 45px;
                  color: #49556A;
                }
                .coach-small-text{
                  font-family: Open Sans, sans-serif !important;
                  font-style: normal;
                  font-weight: 400;
                  font-size: 18px;
                  line-height: 30px;
                  color: #49556A;
                  text-align: justify
                }

                .vertical-box {
                  position: relative;
                }

                @media only screen and (min-width: 901px) {
                  .vertical-center {
                    position: absolute;
                    top: 50%;
                    -ms-transform: translateY(-50%);
                    transform: translateY(-50%);
                  }
                  .pay-img{
                    width: 70%
                  }
                  .coach-small-text{
                    padding-right: 15px!important;
                  }
                }

                @media screen and (max-width: 900px) and (min-width: 600px) {
                  .vertical-center {
                    position: absolute;
                    top: 50%;
                    -ms-transform: translateY(-50%);
                    transform: translateY(-50%);
                  }
                  .display-text-center{
                    text-align: center;
                  }
                  .coach-box{
                    padding: 0 3rem!important;
                  }
                  .display-align-center-sm{
                    display: flex;
                    justify-content: center!important;
                  }
                  .pay-img{
                    width: 100%
                  }
                  .button-center-sm{
                    margin: 0 auto!important;;
                    display: block!important;
                  }
                  
                  .becoame-coach-header{
                    font-size: 32px!important;
                    line-height: 43px;
                  }
                  .becoame-coach-description{
                    font-size: 14px;
                    line-height: 19px;
                  }
                  .btn-coach{
                   padding: 2px 20px;
                   width: 280px;
                   height: 38px;
                  }
                  
                  .coach-select-sub-title{
                    font-size: 25px;
                    line-height: 34px;
                  }

                  .coach-title-text{
                    font-size: 28px;
                    line-height: 34px;
                  }
                  .coach-small-text{
                    font-size: 15px;
                    line-height: 20px;
                  }
                }

                @media only screen and (max-width: 599px) {
                  .display-text-center{
                    text-align: center;
                  }
                  .coach-box{
                    padding: 0 5px!important;
                  }
                  .display-align-center-sm{
                    display: flex;
                    justify-content: center!important;
                  }
                  .pay-img{
                    width: 100%
                  }
                  .button-center-sm{
                    margin: 0 auto!important;;
                    display: block!important;
                  }

                  .becoame-coach-header{
                    font-size: 32px!important;
                    line-height: 43px;
                  }
                  .becoame-coach-description{
                    font-size: 14px;
                    line-height: 19px;
                  }
                  .btn-coach{
                    padding: 14px 37px;
                    width: 180px;
                    height: 38px;
                  }
                  
                  .coach-select-sub-title{
                    font-size: 25px;
                    line-height: 34px;
                  }

                  .coach-title-text{
                    font-size: 28px;
                    line-height: 34px;
                  }
                  .coach-small-text{
                    font-size: 15px;
                    line-height: 20px;
                  }
                }

              </style>  

              <div class="row pt-15 pb-5 coach-box first-box" style="padding-top: 60px!important; padding-bottom: 60px!important;">
                <div class="col-12">
                  <div class="row">
                    <div class="col-md-6 col-sm-12 vertical-box">
                        <div class="vertical-center">
                            <p class="becoame-coach-header display-text-center">Turn your passion into profit</p>
                            <p class="becoame-coach-description display-text-center">Coachsome gives you all the tools to grow your coaching business, find athletes and at the same time coach more effeciently.</p>
                            <button class="btn btn-coach display-text-center button-center-sm" style="color: white;">Become a coach </button>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-12">
                      <img width="100%" src="https://api.test.coachsome.com/assets/images/cms/coach-group.png" alt="">
                    </div>
                  </div>
                </div>
              </div>
              <div class="row coach-box second-box py-8" style="padding-top: 32px!important;padding-bottom: 32px!important;">
                <div class="col-12">
                  <div class="row">
                    <div class="col-12">
                      <p class="coach-select-sub-title">Scale your coaching business beyond what you thought was possible.</p>
                    </div>
                    <div class="col-md-6 col-sm-12 display-align-center">
                      <img class="pay-img" src="https://api.test.coachsome.com/assets/images/cms/get-pay.png" alt="">
                    </div>
                    <div class="col-md-6 col-sm-12 vertical-box">
                       <div class="vertical-center">
                          <p class="coach-title-text display-text-center">Get paid for what you love</p>
                          <p class="coach-small-text">Start a coaching business and get paid for coaching in the sport that you love. Sell one-time packages or start a monthly membership. We will help you turn your passion into profit. </p>
                       </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 py-3">
                  <span></span>
                </div>
                <div class="col-12">
                  <div class="row">
                    <div class="col-sm-12 d-md-none">
                      <img width="100%" src="https://api.test.coachsome.com/assets/images/cms/caoch-page.png" alt="">
                    </div>
                    <div class="col-md-5 col-sm-12 vertical-box">
                        <div class="vertical-center">
                            <p class="coach-title-text display-text-center">Public profile</p>
                            <p class="coach-small-text display-text-center">Create your unique profile and showcase it through our marketplace to people from anywhere. Athletes from other countries can buy your service and you are now able to scale beyond what you thought was possible. </p>
                        </div>
                    </div>
                    <div class="col-md-7 col-sm-12 d-none d-md-block">
                      <img width="100%" src="https://api.test.coachsome.com/assets/images/cms/caoch-page.png" alt="">
                    </div>
                  </div>
                </div>
                <div class="col-12 py-3 d-md-none">
                  <span></span>
                </div>
                <div class="col-12 py-5 d-none d-md-block">
                  <span></span>
                </div>
                <div class="col-12">
                  <div class="row">
                    <div class="col-md-6 col-sm-12 display-align-center">
                      <img width="100%" src="https://api.test.coachsome.com/assets/images/cms/screen-group.png" alt="">
                    </div>
                    <div class="col-md-6 col-sm-12 vertical-box">
                       <div class="vertical-center">
                          <p class="coach-title-text display-text-center">Online training</p>
                          <p class="coach-small-text">Customize your own exercise, design workouts, create training programs and assign athletes to complete them at-home, on the field or in the gym. </p>
                       </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 py-3">
                  <span></span>
                </div>
                <div class="col-12">
                  <div class="row">
                    <div class="col-sm-12 d-md-none">
                      <img width="100%" src="https://api.test.coachsome.com/assets/images/cms/coach-session.png" alt="">
                    </div>
                    <div class="col-md-5 col-sm-12 vertical-box">
                        <div class="vertical-center">
                            <p class="coach-title-text display-text-center">Smart chat</p>
                            <p class="coach-small-text display-text-center">Chat with your players anywhere you go. Create group chats, send training programs, book your next session. Our smart chat features is built to make coaching a breeze. </p>
                        </div>
                    </div>
                    <div class="col-md-7 col-sm-12 d-none d-md-block">
                      <img width="100%" src="https://api.test.coachsome.com/assets/images/cms/coach-session.png" alt="">
                    </div>
                  </div>
                </div>
              </div>
              <div class="row py-15 coach-box first-box" style="padding-top: 60px!important; padding-bottom: 60px!important;">
                <div class="col-12 display-align-center pb-0">
                  <p class="coach-title-text display-text-center">Get all the help you need</p>
                </div>
                <div class="col-12 display-align-center py-0">
                  <p class="coach-small-text display-text-center">We want you to succeed. We are here for our coaches at all times. Whether you are just getting started or already have a business rolling, we can help you.</p>
                </div>
                <div class="col-12 display-align-center pt-0">
                  <button class="btn btn-coach" style="color: white;">Become a coach </button>
                </div>
              </div>
            </body>   
          </html> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { authApi, pageBuilderApi } from "@/api";
import { pathData } from "@/data";
import MobileTopNav from '@/components/layout/global/MobileTopNav'


export default {
  head() {
    return {
      title: this.$i18n.t("header_title_tag_become_a_coach"),
      titleTemplate: "%s"
    };
  },
  components: {
    MobileTopNav
  },
  async asyncData({ app, $axios }) {
    const { data } = await pageBuilderApi($axios).getPage("BecomeACoach");

    let content = "";
    if (data.data) {
      if (data.data.pages.length) {
        data.data.pages.forEach(item => {
  
          if (item.locale == app.i18n.locale) {
          //
            content = item.content;
          //
          }
        });
      }
    }
    // Fallback
    if (!content) {
      data.data.pages.forEach(item => {
        if (app.i18n.locale == item.locale) {
          content = item.content;
        }
      });
    }

    return {
      content
    };
  },
  methods: {
    handleClick(e) {
      const elt = e.target.closest(".btn-coach");
      if(this.$auth.loggedIn){

        // const payload = {
        //   role: 'coach',
        //   is_admin_switched: this.isSwitchedUser
        // };

        // authApi(this.$axios).switchProfile(payload)
        // .then(({ data }) => {
        //   this.$auth.setUser(data.user);
        //   this.$store.dispatch("setUser", data.user);
        //   this.$store.dispatch("activeBottomNav", 0);
        //   if(this.$auth.loggedIn && this.$auth.hasRole(["superadmin", "admin", "staff"])){
        //     this.$router.push(this.localePath(pathData.admin.dashboard))
        //   }else if(this.$auth.loggedIn && this.$auth.hasRole(["coach"])){
        //       this.$router.push(this.localePath(pathData.coach.home))
        //   }else if(this.$auth.loggedIn && this.$auth.hasRole(["athlete"])){
        //       this.$router.push(this.localePath(pathData.athlete.home))
        //   }else{
        //       this.$router.push(this.localePath(pathData.pages.home))
        //   }
        // })
        // .catch((error) => {this.$toast.error(error.response.data.message);});


        this.$router.push(this.localePath(pathData.coach.onboarding.start));

        
      }else{
        if (elt) {
          this.$store.dispatch("activeBottomNav", 4);
          this.$store.dispatch("setUserType", "coach");
          if(!this.$vuetify.breakpoint.smAndDown){
              this.$store.dispatch("toggleDialog");
          }else{
            if(this.$route.path != pathData.pages.login){
              this.$router.push(this.localePath(pathData.pages.login))
            }
          }
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.bootstrap-wrapper::v-deep {
  @import "~bootstrap/dist/css/bootstrap.min";
}
</style>
              