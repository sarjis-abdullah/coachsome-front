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
        <div class="onboarding--body">
            <div class= "onboarding--body--left-banner d-flex" :class="{'onboarding--body--left-banner--md' : !$vuetify.breakpoint.smAndDown,'onboarding--body--left-banner--sm': $vuetify.breakpoint.smAndDown}">
                <v-row :class="{'py-10' : $vuetify.breakpoint.smAndDown}">
                    <v-col cols="12" class="text-left pl-8">
                        <v-btn 
                            style="height:22px!important; width:22px!important;" 
                            class="pa-5 d-md-none"  
                            fab 
                            color="#D9D9D9" 
                            @click="handleCancelBtnClick"
                        >
                            <v-icon color="white" medium >mdi-close</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </div>
            <div class= "onboarding--body--right d-flex" :class="{'onboarding--body--right--md' : !$vuetify.breakpoint.smAndDown,'onboarding--body--right--sm mb-15': $vuetify.breakpoint.smAndDown}">
                <v-row>
                    <v-col cols="12" class="text-right onboarding--body--right--top d-none">
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
                    <v-col cols="12"  :class="{'px-15' : !$vuetify.breakpoint.smAndDown}">
                        <span class="onboarding--body--right--center-text" :class="{'onboarding--body--right--center-text--md' : !$vuetify.breakpoint.smAndDown,'onboarding--body--right--center-text--sm mb-15': $vuetify.breakpoint.smAndDown}">Ready to become a coach on Coachsome?</span>
                    </v-col>
                </v-row>
            </div>
            <div :class="{ 'onboarding--body--footer text-right' : !$vuetify.breakpoint.smAndDown, 'd-none' : $vuetify.breakpoint.smAndDown}">
                <v-btn
                    color="#15577C"
                    class="onboarding--body--footer--button-right px-15 py-3"
                    @click="handleSaveBtnClick"
                >
                    Continue
                </v-btn>
            </div>
            
             <v-footer class="d-md-none" color="white" inset app bottom fixed > 
                <v-row>
                  <v-col cols="12" class="mb-0 mt-2 px-5">
                    <div class="mb-6">
                      <v-btn
                        depressed
                        color="#15577C"
                        class="white--text mb-2"
                        block
                        @click="handleSaveBtnClick"
                      >
                        <span
                          v-html="$t('Continue')"
                        ></span>
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-footer>
        </div>
    </v-container>
  </div>
</template>
<script>
import { authApi, pageBuilderApi } from "@/api";
import { pathData } from "@/data";
import MobileTopNav from '@/components/layout/global/MobileTopNav'
import VuePhoneNumberInput from "vue-phone-number-input";
import TiptopEditor from "@/components/editor/TiptopEditor";


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
        VuePhoneNumberInput,
        TiptopEditor
    },
    data() {
        return {
            tipTopEditor: { value: "" },
            profileData: {
                profile_name: "",
                mobile_code: "DK",
                mobile_no: "",
            },
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
            height:100%;
            width: 100%;
            margin: 0px;
            &--left-banner{
                background-repeat: no-repeat!important;
                &--md{
                    background-size: cover!important;
                    height: 100vh!important;
                    background: url('@/assets/images/onboarding/start.png');
                    height: 100%;
                    width:34%;
                    margin: 0px;
                    float: left;
                    position: fixed;
                }
                &--sm{
                    background-size: cover!important;
                    height: 40vh!important;
                    background: url('@/assets/images/onboarding/start-sm.png');
                }
            }
           
            &--right{
                &--md{
                    height: 80%!important;
                    width: 66%;
                    margin: 0px;
                    float: right!important;
                    padding: 30px!important;
                }
                &--sm{
                    padding: 15px!important;
                    margin-bottom: 80px!important;
                    &--avatar-section{
                        justify-content: center!important;
                    }
                }
                &--top{
                    height: 10vh!important;
                }
                &--center-text{
                    color: #49556A!important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    font-family: $font-family!important;
                    font-style: normal;
                    &--md{
                        height: 81vh!important;
                        font-weight: 700;
                        font-size: 64px;
                        line-height: 87px;
                        padding-left: 20%!important;
                        padding-right: 20%!important;
                    }
                    &--sm{
                        font-weight: 700;
                        font-size: 30.9366px;
                        line-height: 42px;
                        padding-top: 20%!important;
                    }
                }
                
                
            }
            &--footer{
                height: 7vh;
                width: 66%;
                margin: 0px;
                float: right!important;
                position: sticky;
                bottom: 0!important;
                background: $grey-200!important;
                border-top: 1px solid $grey-500!important;
                padding: 10px!important;
                &--button-left{
                    text-transform: none;
                }
                &--button-right{
                    color: white;
                    text-transform: none;
                }
            }
        }
    }
</style>
      
