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
                    <v-col cols="12" class="text-right">
                        <v-btn
                            outlined
                            rounded
                            x-small
                            color="#FFFFFF"
                            class="onboarding--body--button--cancel mr-2 d-md-none"
                            @click="handleCancelBtnClick"
                        >
                            Skip this step
                        </v-btn>
                    </v-col>
                    <v-col cols="12" class="onboarding--body--left-banner-text">
                        <p :class="{'onboarding--body--left-banner-text--md' : !$vuetify.breakpoint.smAndDown, 'onboarding--body--left-banner-text--sm' : $vuetify.breakpoint.smAndDown}">Add your basic information</p>
                    </v-col>
                    <v-col cols="12" class="d-flex justify-center">
                    </v-col>
                </v-row>
            </div>
            <div class= "onboarding--body--right" :class="{'onboarding--body--right--md' : !$vuetify.breakpoint.smAndDown,'onboarding--body--right--sm mb-15': $vuetify.breakpoint.smAndDown}">
                <v-row>
                    <v-col cols="12" md="9" sm="12" class="onboarding--body--right-content--body-top">
                        <div class="default--label pb-2">
                            {{ $t("profile_picture_title") }}
                            <span class="required">*</span>
                        </div>
                        <div class="section-description">
                            {{ $t("profile_picture_desc") }}
                        </div>
                    </v-col>
                    <v-col cols="3" class="text-right d-none d-md-block">
                        <v-btn
                            outlined
                            rounded
                            color="#49556A"
                            class="onboarding--body--button--cancel mr-2"
                            @click="handleCancelBtnClick"
                        >
                            Skip this step
                        </v-btn>
                    </v-col>
                    <v-col cols="12">
                        <v-row :class="{'onboarding--body--right--sm--avatar-section' :$vuetify.breakpoint.smAndDown }">
                            <v-col cols="6" md="3" :class="{'d-flex justify-center' :$vuetify.breakpoint.smAndDown }">
                                <div style="width: 150px;" class="text-center" >
                                    <div>
                                        <v-avatar
                                        color="teal"
                                        v-if="!userProfileImage"
                                        tile
                                        style="width: 100%; height: 150px;"
                                        >
                                        <span class="white--text headline" v-if="initialImageContent != ''">{{ initialImageContent }}</span>
                                        <v-img v-else aspect-ratio="1" :src="require('@/assets/images/profile-default.jpg')" alt="Avatar"></v-img>
                                        </v-avatar>
                                        <v-avatar
                                        style="width: 100%; height: 150px;"
                                        color="primary"
                                        v-if="userProfileImage"
                                        tile
                                        >
                                        <img :src="userProfileImage" alt="Profile Image" />
                                        </v-avatar>
                                    </div>
                                    <div>
                                        <v-btn
                                        class="px-0"
                                        color="primary-light-1"
                                        dark
                                        tile
                                        block
                                        depressed
                                        @click.stop="openProfilePictureDialog"
                                        >
                                        {{ $t("profile_button_label_change_image") }}
                                        </v-btn>
                                    </div>
                                </div>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12">
                        <div class="default--label pb-2">
                            {{ $t("profile_name") }}
                            <span class="required">*</span>
                        </div>
                        <div class="section-description" >{{ $t("profile_name_desc") }}</div>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            v-model="profileData.profile_name"
                            outlined
                            dense
                            class="default-text-field"
                            color="#9FAEC2"
                            background-color="white"
                            counter="35"
                            maxlength="35"
                            :label="$t('profile_name_hint')"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <div class="default--label pb-2">
                            {{ $t("profile_mobile_title") }}
                            <span class="required">*</span>
                        </div>
                        <div class="section-description">
                            {{ $t("profile_mobile_description") }}
                        </div>
                    </v-col>
                    <v-col cols="12" class="py-0">
                        <VuePhoneNumberInput
                            :default-country-code="profileData.mobile_code"
                            v-model="profileData.mobile_no"
                            @update="updateMobileInfo"
                            color="#9FAEC2"
                            valid-color="#9FAEC2"
                            class="vue-phone-number-input"
                            :translations="{
                                countrySelectorLabel: $t(
                                    'profile_section_mobile_label_country_code'
                                ),
                                phoneNumberLabel: $t(
                                    'profile_section_mobile_input_label_phone_number'
                                ),
                                example: $t('profile_section_mobile_input_label_example')
                                }"
                        />
                    </v-col>
                    <v-col cols="12">
                        <div class="default--label pb-2">
                            {{ $t("profile_about_you") }}
                            <span class="required">*</span>
                        </div>
                        <div class="section-description ">
                            {{ $t("profile_about_you_desc") }}
                        </div>
                    </v-col>
                    <v-col cols="12">
                        <TiptopEditor
                            :value="tipTopEditor.value"
                            @updated="handleTiptopUpdatedValue"
                        />
                    </v-col>
                </v-row>
            </div>
            <div :class="{ 'onboarding--body--footer' : !$vuetify.breakpoint.smAndDown, 'd-none' : $vuetify.breakpoint.smAndDown}">
                <v-btn
                    text
                    color="#000000"
                    class="onboarding--body--footer--button-left"
                >
                    <u>Go back</u>
                </v-btn>
                <v-btn
                    color="#15577C"
                    class="onboarding--body--footer--button-right px-15 py-3"
                >
                    Continue
                </v-btn>
            </div>
            
             <v-footer class="d-md-none" color="white" inset app bottom fixed > 
                <v-row>
                  <v-col cols="12" class="pb-0 mb-0 mt-2">
                    <div class="mb-6">
                      <v-btn
                        depressed
                        color="#15577C"
                        class="white--text mb-2"
                        block
                      >
                        <span
                          v-html="$t('Continue')"
                        ></span>
                      </v-btn>
                      <v-btn
                        outlined
                        color="#000000"
                        block
                      >
                        <u
                          v-html="$t('Go_back')"
                        ></u>
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
            this.$router.push(this.localePath(pathData.coach.onboarding.start));
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
                background-size: cover!important;
                background-repeat: no-repeat!important;
                &--md{
                    background: url('@/assets/images/onboarding/left-bg.png');
                    height: 100%;
                    width:35%;
                    margin: 0px;
                    float: left;
                    position: fixed;
                }
                &--sm{
                    background: url('@/assets/images/onboarding/left-bg-sm.png');
                    height: 30vh!important;
                }
            }
            &--left-banner-text{
                display: flex!important;
                align-items: center!important;
                justify-content: center!important;
                text-align: center!important;
                font-family: $font-family!important;
                font-style: normal;
                color: #FFFFFF!important;
                &--sm{
                    font-weight: 700;
                    font-size: 35px;
                    line-height: 48px;
                }
                &--md{
                    font-weight: 700;
                    font-size: 55px;
                    line-height: 75px;
                }
            }
            &--right{
                &--md{
                    height: 80%;
                    width: 65%;
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
                
            }
            &--footer{
                height: 20%;
                width: 65%;
                margin: 0px;
                float: right!important;
                position: sticky;
                bottom: 0;
                background: $grey-200!important;
                border-top: 1px solid $grey-500!important;
                display: flex!important;
                justify-content: space-between!important;
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
      
