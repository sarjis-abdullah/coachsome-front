<template>
  <div class="onboarding">
    <v-container fluid >
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
        <div class="onboarding--body">
            <v-row class="onboarding--body--row">
                <v-col cols="12">
                    <img
                        :style="{ width: '150px' }"
                        :src="require(`@/assets/images/onboarding/trophy.svg`)"
                    />
                </v-col>
                <v-col cols="12">
                    <span class="onboarding--body--row--title" :class="{ 'onboarding--body--row--title--md' : !$vuetify.breakpoint.smAndDown, 'onboarding--body--row--title--sm' : $vuetify.breakpoint.smAndDown}">You are ready to go!</span>
                </v-col>
                <v-col cols="12" md="8"><span class="onboarding--body--row--description" :class="{ 'onboarding--body--row--description--md' : !$vuetify.breakpoint.smAndDown, 'onboarding--body--row--description--sm' : $vuetify.breakpoint.smAndDown}">You have completed all steps and your profile can now be published. Publish your profile or continue to edit it before you make it public. </span></v-col>
                <v-col cols="12"></v-col>
                <v-col cols="12" md="3" class="px-5">
                    <v-btn
                        depressed
                        color="#15577C"
                        class="white--text mb-2"
                        block
                        @click="handleSaveBtnClick"
                      >
                        <span
                          v-html="$t('Publish profile')"
                        ></span>
                    </v-btn>
                    <v-btn
                        outlined
                        color="#000000"
                        block
                        @click="handleBackBtnClick"
                      >
                        <u
                          v-html="$t('Continue to edit profile')"
                        ></u>
                    </v-btn>
                </v-col>
            </v-row>
        </div>
    </v-container>
  </div>
</template>
<script>
import { pathData } from "@/data";
import MobileTopNav from '@/components/layout/global/MobileTopNav'


export default {
    layout: "athlete",
    head() {
        return {
        title: this.$i18n.t("coach_onboarding--body"),
        titleTemplate: "%s"
        };
    },
    components: {
        MobileTopNav,
    },
    data() {
        return {
            //
        };
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
        &--body{
            height:80vh;
            width: 100%;
            margin: 0px;
            display: flex!important;
            align-items: center!important;
            justify-content: center!important;
            text-align: center!important;
            &--row{
                display: flex!important;
                    align-items: center!important;
                    justify-content: center!important;
                    text-align: center!important;
                &--title{
                    font-family: $font-family!important;
                    font-style: normal;
                    color: $grey-700!important;
                    display: flex!important;
                    align-items: center!important;
                    justify-content: center!important;
                    text-align: center!important;
                    &--md{
                        font-weight: 700;
                        font-size: 55px;
                        line-height: 75px;
                    }
                    &--sm{
                        font-weight: 700;
                        font-size: 31.135px;
                        line-height: 42px;
                    }
                }
                &--description{
                    font-family: $font-family!important;
                    font-style: normal;
                    color: $grey-500;
                    display: flex!important;
                    align-items: center!important;
                    justify-content: center!important;
                    text-align: center!important;
                    &--md{
                        font-weight: 400;
                        font-size: 24px;
                        line-height: 33px;
                    }
                    &--sm{
                        font-weight: 400;
                        font-size: 20px;
                        line-height: 28px;
                    }
                }
            }
        }
    }
</style>
      
