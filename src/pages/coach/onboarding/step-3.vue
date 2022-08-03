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
                            @click="handleCancelBtnClick"
                        >
                            Skip this step
                        </v-btn>
                    </v-col>
                    <v-col cols="12" class="onboarding--body--left-banner-text pt-0">
                        <p :class="{'onboarding--body--left-banner-text--md px-15' : !$vuetify.breakpoint.smAndDown, 'onboarding--body--left-banner-text--sm' : $vuetify.breakpoint.smAndDown}">Qualifications</p>
                    </v-col>
                </v-row>
            </div>
            <div class= "onboarding--body--right" :class="{'onboarding--body--right--md' : !$vuetify.breakpoint.smAndDown,'onboarding--body--right--sm mb-15': $vuetify.breakpoint.smAndDown}">
                <v-row>
                    <v-col cols="12" md="9" sm="12" class="onboarding--body--right-content--body-top">
                        <div class="default--label pb-2">
                            {{ $t("profile_category_title") }}
                        </div>
                        <div class="section-description">
                            {{ $t("profile_category_description") }}
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
                       <v-combobox
                            v-model="tagData.tagsSelected"
                            :items="tagData.tags"
                            clearable
                            multiple
                            outlined
                            dense
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
                    <u>Go back</u>
                </v-btn>
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
                  <v-col cols="12" class="pb-0 mb-0 px-5 mt-2">
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
                      <v-btn
                        outlined
                        color="#000000"
                        block
                        @click="handleBackBtnClick"
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
import { sportCategoryApi } from "@/api";
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
            tagData: {
                tags: [],
                tagsSelected: []
            },
        };
    },
    created() {
        this.langCode = this.$i18n.locale;
    },
    methods:{
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
        handleSaveBtnClick(){
            this.$router.push(this.localePath(pathData.coach.onboarding.step4));
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
                    height: 88vh!important;
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
      
