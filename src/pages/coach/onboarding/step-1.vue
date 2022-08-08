<template>
  <div class="onboarding">
    <v-container fluid class="pa-0 ma-0">
        <mobile-top-nav extraClass="body-bg-secondary" :headerText="$t(!profilePictureDialog ?  'title_become_a_coach' : 'profile_edit_image_title_profile_image')">
            <template v-slot:goBack>
            <v-btn
                icon
                v-if="!profilePictureDialog"
            >
            </v-btn>
            <v-btn
                icon
                @click="handleCloseProfilePicture"
                v-else
            >
            <v-icon class="common-top-back-icon">mdi-chevron-left</v-icon>
          </v-btn>
            </template>
            <template v-slot:action>
            <span></span>
            </template>
        </mobile-top-nav>
        <div class="onboarding--body"  v-if="!profilePictureDialog">
            <div class= "onboarding--body--left-banner d-flex" :class="{'onboarding--body--left-banner--md' : !$vuetify.breakpoint.smAndDown,'onboarding--body--left-banner--sm': $vuetify.breakpoint.smAndDown}">
                <v-row :class="{'py-10' : $vuetify.breakpoint.smAndDown}">
                    <v-col cols="12" class="text-right d-md-none pb-2"  style="height: 0!important;">
                        <v-btn
                            outlined
                            rounded
                            x-small
                            color="#FFFFFF"
                            class="onboarding--body--button--cancel mr-2 d-md-none"
                            @click="handleSkipButtonClick"
                        >
                            {{$t('skip_step')}}
                        </v-btn>
                    </v-col>
                    <v-col cols="12" class="onboarding--body--left-banner-text pt-2">
                        <p :class="{'onboarding--body--left-banner-text--md' : !$vuetify.breakpoint.smAndDown, 'onboarding--body--left-banner-text--sm' : $vuetify.breakpoint.smAndDown}">{{$t('basic_info_text')}}</p>
                    </v-col>
                </v-row>
            </div>
            <div class= "onboarding--body--right"  :class="{'onboarding--body--right--md' : !$vuetify.breakpoint.smAndDown,'onboarding--body--right--sm mb-15': $vuetify.breakpoint.smAndDown}">
                <v-row>
                    <v-col cols="12" md="8" sm="12" class="onboarding--body--right-content--body-top">
                        <div class="default--label pb-2">
                            {{ $t("profile_picture_title") }}
                        </div>
                        <div class="section-description">
                            {{ $t("profile_picture_desc") }}
                        </div>
                    </v-col>
                    <v-col cols="4" class="text-right d-none d-md-block">
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
                            :rules="rules.profile_name_rules"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <div class="default--label pb-2">
                            {{ $t("profile_mobile_title") }}
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
                            :rules="rules.phone"
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
                        @click="handleSaveBtnClick"
                        :disabled="!validContinue"
                        block
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
        <v-row >
                    <v-col cols="12" >
                    <template v-if="profilePictureDialog">
                        <div v-if="$vuetify.breakpoint.mdAndUp">
                        <v-dialog color="#f7fafc" v-model="profilePictureDialog" max-width="1300px" persistent>
                            <EditImageDialog
                            :show="true"
                            :isOnboarding="true"
                            @hide="handleCloseProfilePicture"
                            @uploaded="handleCloseProfilePicture"
                            @onboardingImageUploaded="setProfileImage($event)"
                            />
                        </v-dialog>
                        </div>
                        <div v-else>
                        <EditImageDialog
                            :show="true"
                            :isOnboarding="true"
                            @hide="handleCloseProfilePicture"
                            @uploaded="handleCloseProfilePicture"
                            @onboardingImageUploaded="setProfileImage($event)"
                            />
                        </div>
                    </template>
                    </v-col>
                </v-row>
    </v-container>
  </div>
</template>
<script>
import { coachProfileApi } from "@/api";
import { pathData } from "@/data";
import MobileTopNav from '@/components/layout/global/MobileTopNav'
import VuePhoneNumberInput from "vue-phone-number-input";
import TiptopEditor from "@/components/editor/TiptopEditor";
import EditImageDialog from "@/components/profile/EditImageDialog";


export default {
    layout: "athlete",
    head() {
        return {
        title: this.$i18n.t("basic_info_text"),
        titleTemplate: "%s"
        };
    },
    components: {
        MobileTopNav,
        VuePhoneNumberInput,
        TiptopEditor,
        EditImageDialog
    },
    data() {
        return {
            tipTopEditor: { value: "" },
            profilePictureDialog: false,
            initialImageContent: "",
            profileData: {
                image: null,
                profile_name: "",
                about_me: "",
                mobile_no: "",
                mobile_code: "DK",
                is_onboarding: true,
                category_tag_list_id: [],
                sport_tag_list_id: [],
                language_tag_list_id: [],
            },
            rules: {
                profile_name_rules: [
                    (v) => !!v || this.$i18n.t("valid_required_profile_name"),
                    (v) => /^([A-Za-zæøåÆØÅ]\s*)+$/.test(v) || this.$i18n.t("valid_profile_name"),
                ],
                phone: [
                    (v) => !!v || this.$i18n.t("valid_required_profile_name")
                ],
                // categories: [v => v.length != 0 || "At least one category is needed"],
                // site: [
                // v => !!v || "Required.",
                // v =>
                //     new RegExp(
                //     "^(?:(?:https?|ftp)://)(?:S+(?::S*)?@)?(?:(?!(?:10|127)(?:.d{1,3}){3})(?!(?:169.254|192.168)(?:.d{1,3}){2})(?!172.(?:1[6-9]|2d|3[0-1])(?:.d{1,3}){2})(?:[1-9]d?|1dd|2[01]d|22[0-3])(?:.(?:1?d{1,2}|2[0-4]d|25[0-5])){2}(?:.(?:[1-9]d?|1dd|2[0-4]d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:.(?:[a-z\u00a1-\uffff]{2,})).?)(?::d{2,5})?(?:[/?#]S*)?$",
                //     "ig"
                //     ).test(v) || "Not a valid URL",
                // v =>
                //     !this.toolsData.map(u => u.site).includes(v) ||
                //     "This tool already exists"
                // ]
            }
        }
    },
    computed: {
        validContinue(){
            if(this.profileData.image != null &&  this.profileData.profile_name != "" && this.profileData.mobile_no != "" && this.profileData.about_me != ""){
                return true;
            }else{
                return false;
            }
        },
        userProfileImage() {
            return this.profileData.image;
        },
        enableSaveButton(){
            // if()
            // this.profileData
            // profileData: {
            //     image: null,
            //     profile_name: "",
            //     about_me: "",
            //     mobile_no: "",
            //     mobile_code: "DK",
            // },
        }
    },
    watch: {
        "profilePicture.file": function(val) {
            this.profilePicture.img = URL.createObjectURL(val);
        },
        '$route': {
            immediate: true,
            deep: true,
            handler(newValue, oldValue) {
                if (this.$route?.query?.profilePictureDialog) {
                this.profilePictureDialog = true
                }else{
                this.profilePictureDialog = false;
                }
            }
        },
    },
    mounted() {
        this.init();
        if(process.browser){
        document.querySelector(".input-tel__label").innerHTML = "Phone Number";
        }
    },
    methods:{
        handleTiptopUpdatedValue(value) {
            this.profileData.about_me = value;
        },
        init() {
            let is_onboarding = true;
            coachProfileApi(this.$axios)
                .onBoardingUserProfileInfo(is_onboarding)
                .then(response => {
                    this.initialImageContent = response.data.initial_image_content;
                    this.profileData.profile_name = response.data.profile_name;
                    this.profileData.image =response.data.image.square ;
                    this.profileData.about_me = response.data.about_me;
                    this.tipTopEditor.value = response.data.about_me;
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
        updateMobileInfo(item) {
            this.profileData.mobile_code = item.countryCode;
            this.profileData.mobile_no = item.phoneNumber;
        },
        setProfileImage(imageData){
            this.profileData.image = imageData.square ;
        },
        openProfilePictureDialog(){
            this.profilePictureDialog = true;
            this.$router.push({query:{}});
            const query = {
                ...this.$route.query,
                profilePictureDialog: true
            }
            this.$router.push({query})
        },
        handleCloseProfilePicture(){
            this.profilePictureDialog = false;
            this.$router.push({query:{}})
        },
        handleCancelBtnClick(){
            this.$router.push(this.localePath(pathData.pages.becomeACoach));
        },
        handleBackBtnClick(){
            this.$router.push(this.localePath(pathData.coach.onboarding.start));
        },
        handleSkipButtonClick(){
            this.$router.push(this.localePath(pathData.coach.onboarding.step2));
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
                    this.$router.push(this.localePath(pathData.coach.onboarding.step2));
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
      
