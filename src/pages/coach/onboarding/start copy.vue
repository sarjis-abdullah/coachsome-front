<template>
  <div class="onboarding">
    <v-container fluid class="pa-0 ma-0">
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
        <v-row class="mt-0">
            <v-col cols="12" md="4" class="pa-0">
                <v-card flat class="rounded-0" :class="{'pt-5' : $vuetify.breakpoint.smAndDown}">
                    <v-img class="onboarding--left-img" :class="{'onboarding--left-img-md' : !$vuetify.breakpoint.smAndDown}" style="z-index: 0" :src="require('@/assets/images/onboarding/start.png')" >
                        <v-card-title class="align-start fill-height d-md-none ml-2" >
                            <v-btn style="z-index: 9999;height:22px!important; width:22px!important;" class="pa-5"  fab color="#D9D9D9" @click="handleCancelBtnClick"><v-icon color="white" medium >mdi-close</v-icon></v-btn>
                        </v-card-title>
                    </v-img>                       
                </v-card>
            </v-col>
            <v-col cols="12" md="8" >
                <v-row>
                    <v-col cols="12" class="onboarding--right-top d-none d-md-block ">
                            <v-btn
                                outlined
                                rounded
                                color="#49556A"
                                class="onboarding--button--cancel px-10 mr-10"
                                @click="handleCancelBtnClick"
                            >
                                Cancel
                            </v-btn>
                    </v-col>
                    <v-col cols="12" class="onboarding--right-center-text px-15" v-show="!$vuetify.breakpoint.smAndDown">
                            <span class="onboarding--right-center-text--content">Ready to become a coach on Coachsome?</span>
                    </v-col>
                    <v-col cols="12" class="onboarding--right-center-text-sm d-md-none">
                            <span class="onboarding--right-center-text--content-sm">Ready to become a coach on Coachsome?</span>
                    </v-col>
                    <v-col cols="12" class="onboarding--right-footer" v-show="!$vuetify.breakpoint.smAndDown">
                            <v-btn
                                large
                                color="#15577C"
                                class="onboarding--button--footer px-15 py-3 mr-10"
                                @click="handleSaveBtnClick"
                            >
                                Get Started
                            </v-btn>
                    </v-col>
                    <v-col cols="12" class="onboarding--right-footer-sm d-md-none">
                            <v-btn
                                color="#15577C"
                                class="onboarding--button--footer px-15 py-3"
                                @click="handleSaveBtnClick"
                            >
                                Get Started
                            </v-btn>
                    </v-col>
                </v-row>
            </v-col>
            <!-- <v-col cols="12" class="d-md-none">

            </v-col> -->
        </v-row>
    </v-container>
  </div>
</template>

<script>
import { authApi, pageBuilderApi } from "@/api";
import { pathData } from "@/data";
import MobileTopNav from '@/components/layout/global/MobileTopNav'


export default {
  head() {
    return {
      title: this.$i18n.t("coach_onboarding"),
      titleTemplate: "%s"
    };
  },
  components: {
    MobileTopNav
  },
  methods:{
      handleCancelBtnClick(){
        this.$router.push(this.localePath(pathData.pages.becomeACoach));
      },
      handleSaveBtnClick(){
        this.$router.push(this.localePath(pathData.coach.onboarding.step1));
      }
  }

};
</script>

<style scoped lang="scss">
.onboarding{
    background: $body-bg;
    // height: 95vh!important;
    &--left-img{
        width: 100%!important;
        
    }
    &--left-img-md{
        height: 92vh!important;
    }
    &--right-top{
        text-align: right!important;
        font-family: $font-family!important;
        height: 10vh!important;
    }
    &--right-center-text{
        height: 72vh!important;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-family: $font-family!important;
        font-style: normal;
        font-weight: 700;
        font-size: 64px;
        line-height: 87px;
        color: #49556A;
        &--content{
            padding-left: 20%!important;
            padding-right: 20%!important;
        }
    }
    &--right-center-text-sm{
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-family: $font-family!important;
        font-style: normal;
        font-weight: 700;
        font-size: 30.9366px;
        line-height: 42px;
        color: #49556A;
    }
    &--right-footer{
        font-family: $font-family!important;
        position:relative;
        bottom:0;
        width:100%;
        height:10vh!important;
        background: $grey-200;
        border-top: 1px solid $grey-500;
        display: flex;
       justify-content: flex-end!important;
    }
    &--right-footer-sm{
        font-family: $font-family!important;
        display: flex;
        justify-content: center!important;
    }
    &--button{
        padding-right: 15%!important;
        &--cancel{
            font-family: $font-family!important;
            margin-top: 20px!important;  
            text-transform: none!important;  
        }
        &--footer{
            text-transform: none!important;  
            border-radius: 10px;
            color: white!important;
        }
    }
}
</style>
              