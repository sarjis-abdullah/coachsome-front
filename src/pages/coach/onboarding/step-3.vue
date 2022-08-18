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
                    <v-col cols="12" class="text-right d-md-none pb-0" style="height: 0!important;">
                        <v-btn
                            outlined
                            rounded
                            x-small
                            color="#FFFFFF"
                            class="onboarding--body--button--cancel mr-2 "
                            @click="handleSkipButtonClick"
                        >
                            {{$t('skip_step')}}
                        </v-btn>
                    </v-col>
                    <v-col cols="12" class="onboarding--body--left-banner-text pt-0">
                        <p :class="{'onboarding--body--left-banner-text--md px-15' : !$vuetify.breakpoint.smAndDown, 'onboarding--body--left-banner-text--sm' : $vuetify.breakpoint.smAndDown}">{{$t('qualification_banner_text')}}</p>
                    </v-col>
                </v-row>
            </div>
            <div class= "onboarding--body--right" :class="{'onboarding--body--right--md' : !$vuetify.breakpoint.smAndDown,'onboarding--body--right--sm mb-15': $vuetify.breakpoint.smAndDown}">
                <v-row>
                    <v-col cols="12" md="9" sm="12" class="onboarding--body--right-content--body-top">
                        <div class="default--label pb-2">
                            {{ $t("profile_qualification_title") }}
                        </div>
                        <div class="section-description">
                            {{ $t("profile_qualification_description") }}
                        </div>
                    </v-col>
                    <v-col cols="3" class="text-right d-none d-md-block">
                        <v-btn
                            outlined
                            rounded
                            color="#49556A"
                            class="onboarding--body--button--cancel mr-2"
                            @click="handleSkipButtonClick"
                        >
                            {{$t('skip_step')}}
                        </v-btn>
                    </v-col>
                    <v-col cols="12">
                        <v-skeleton-loader
                            v-if="!completed"
                            type="list-item"
                        ></v-skeleton-loader>
                       <v-combobox
                            v-else
                            v-model="profileData.sport_tag_list_id"
                            :items="tags"
                            clearable
                            multiple
                            outlined
                            dense
                            :label="$t('add_onboarding_qualification_tag')"
                            append-icon
                          >
                            <template
                              v-slot:selection="{ attrs, item, select, selected }"
                            >
                              <v-chip
                                v-bind="attrs"
                                :input-value="selected"
                                close
                                @click="select"
                                @click:close="removeTag(item)"
                                small
                                color="#6EB5CB"
                                text-color="white"
                                class="py-1"
                              >
                                <strong>{{ item }}</strong
                                >&nbsp;
                              </v-chip>
                            </template>
                        </v-combobox>
                    </v-col>
                </v-row>
            </div>
            <div :class="{ 'onboarding--body--footer' : !$vuetify.breakpoint.smAndDown, 'd-none' : $vuetify.breakpoint.smAndDown}">
                <v-btn
                    text
                    color="#000000"
                    class="onboarding--body--footer--button-left"
                    @click="handleBackBtnClick"
                >
                    <u>{{$t('go_back')}}</u>
                </v-btn>
                <v-btn
                    color="#15577C"
                    class="onboarding--body--footer--button-right px-15 py-3"
                    @click="handleSaveBtnClick"
                    :disabled="!validContinue"
                >
                    {{$t('pwa_continue_btn')}}
                </v-btn>
            </div>
            
             <v-footer class="d-md-none" color="white" inset app bottom fixed > 
                <v-row>
                  <v-col cols="12" class="pb-0 mb-0 px-5 mt-2">
                    <div class="mb-6">
                      <v-btn
                        depressed
                        color="#15577C"
                        class="white--text mb-2"
                        block
                        @click="handleSaveBtnClick"
                        :disabled="!validContinue"
                      >
                        <span
                          v-html="$t('pwa_continue_btn')"
                        ></span>
                      </v-btn>
                      <v-btn
                        outlined
                        color="#000000"
                        block
                        @click="handleBackBtnClick"
                      >
                        <u
                          v-html="$t('go_back')"
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
import { coachProfileApi } from "@/api";
import { pathData } from "@/data";
import MobileTopNav from '@/components/layout/global/MobileTopNav'
import VuePhoneNumberInput from "vue-phone-number-input";
import TiptopEditor from "@/components/editor/TiptopEditor";


export default {
    layout: "common-without-drawer",
    head() {
        return {
        title: this.$i18n.t("qualification_banner_text"),
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
            completed: false,
            tags: [],
            initialImageContent: "",
            profileData: {
                image: null,
                profile_name: "",
                about_me: "",
                mobile_no: "",
                mobile_code: "DK",
                category_tag_list_id: [],
                category_tag_list_id: [],
                sport_tag_list_id: [],
                language_tag_list_id: [],
                is_onboarding: true,
            },
        };
    },
    created() {
        this.langCode = this.$i18n.locale;
        this.init();
    },
    computed: {
        validContinue(){
            if(this.profileData.sport_tag_list_id.length > 0 && this.completed){
                return true;
            }else{
                return false;
            }
        },
    },
    methods:{
        init() {
            let is_onboarding = true;
            coachProfileApi(this.$axios)
                .onBoardingUserProfileInfo(is_onboarding)
                .then(response => {
                    this.completed = true;
                    this.initialImageContent = response.data.initial_image_content;
                    this.profileData.profile_name = response.data.profile_name;
                    this.profileData.image =response.data.image.square ;
                    this.profileData.about_me = response.data.about_me;
                    this.profileData.mobile_no = response.data.mobile_no;
                    this.profileData.mobile_code = response.data.mobile_code;
                    this.profileData.category_tag_list_id = response.data.selectedCategories;
                    this.profileData.sport_tag_list_id = response.data.selectedSportTags.map(
                        item => item.name
                    );
                    this.profileData.language_tag_list_id = response.data.selectedLanguages;
                })
                .catch(() => {});
        },
        removeTag(item) {
            this.tagData.tagsSelected.splice(
                this.tagData.tagsSelected.indexOf(item),
                1
            );
        },
         handleCancelBtnClick(){
            this.$router.push(this.localePath(pathData.pages.becomeACoach));
        },
        handleBackBtnClick(){
            this.$router.push(this.localePath(pathData.coach.onboarding.step2));
        },
        handleSkipButtonClick(){
            this.$router.push(this.localePath(pathData.coach.onboarding.step4));
        },
        handleSaveBtnClick(){
            let payload = this.profileData;
            payload.category_tag_list_id = this.profileData.category_tag_list_id.map(
                item => item.id
            );
            payload.language_tag_list_id = this.profileData.language_tag_list_id.map(
                item => item.id
            );
            payload.sport_tag_list_name = this.profileData.sport_tag_list_id;
            coachProfileApi(this.$axios)
                .profileSave(payload)
                .then(response => {
                if (response.data.status == "success") {
                    // this.$toast.success(this.$i18n.t(response.data.t_key));
                    this.init();
                    this.$router.push(this.localePath(pathData.coach.onboarding.step4));
                }
                })
                .catch(error => {
                if (
                    error.response.status == statusCodeData.HTTP_UNPROCESSABLE_ENTITY
                ) {
                    this.$toast.error(this.$i18n.t(error.response.data.t_key));
                }
            });
        },
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
                    min-height: 88vh!important;
                    height: 100%!important;
                    width: 65%;
                    margin: 0px;
                    float: right!important;
                    padding: 30px!important;
                }
                &--sm{
                    padding: 15px!important;
                    margin-bottom: 80px!important;
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
      
