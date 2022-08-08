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
                    <v-col cols="12" class="text-right d-md-none pb-0"  style="height: 0!important;">
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
                        <p :class="{'onboarding--body--left-banner-text--md px-15' : !$vuetify.breakpoint.smAndDown, 'onboarding--body--left-banner-text--sm' : $vuetify.breakpoint.smAndDown}">{{$t('location_banner')}}</p>
                    </v-col>
                </v-row>
            </div>
            <div class= "onboarding--body--right" :class="{'onboarding--body--right--md' : !$vuetify.breakpoint.smAndDown,'onboarding--body--right--sm mb-15': $vuetify.breakpoint.smAndDown}">
                <v-row>
                    <v-col cols="12" md="9" sm="12" class="onboarding--body--right-content--body-top">
                        <div class="default--label pb-2">
                            {{ $t("geography_section_title_location") }}
                        </div>
                        <div class="section-description">
                            {{ $t("geography_section_location_desc") }}
                        </div>
                    </v-col>
                    <v-col cols="3" class="text-right d-none d-md-block">
                        <v-btn
                            outlined
                            rounded
                            color="$grey-700"
                            class="onboarding--body--button--cancel mr-2"
                            @click="handleSkipButtonClick"
                        >
                             {{$t('skip_step')}}
                        </v-btn>
                    </v-col>
                    <v-col cols="12">
                        <GooglePlaceSearch
                            @no-value="isDisabled = true"
                            @location="handleGoogleLocation"
                        />
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-btn
                            block
                            class="white--text"
                            color="primary-light-1"
                            :disabled="isDisabled"
                            depressed
                            light
                            @click="addLocation()"
                        >
                            {{ $t("btn_label_add_location") }}
                        </v-btn>
                    </v-col>
                    <v-col cols="12 d-none d-md-block">
                        <v-data-table
                            :headers="locationDataTable.headers"
                            :items="locationList"
                            :header-props="{ sortIcon: 'mdi-chevron-down' }"
                            hide-default-footer
                            class="elevation-1 location-table row-pointer"
                        >   
                            <template v-slot:item.address="{ item }">
                                <div class="location-table--text">
                                    {{$t(item.address)}}
                                </div>
                            </template>
                            <template v-slot:item.action="{ item }">
                                <v-icon color="$grey-700" @click="deleteLocationItem(item)">mdi-delete-outline</v-icon>
                            </template>
                        </v-data-table>
                    </v-col>
                    <v-col cols="12" v-for="(item, index) in locationList" :key="index" class="d-md-none">
                        <v-hover v-slot="{ hover }">
                            <v-card :color="hover ? '#eef1f3' : '#FFFFFF'" class="location-table--mobile-view " @click.native="showExercise(item)" exact >
                                <v-card-text class="pa-2 ma-2">
                                    <v-row>
                                        <v-col cols="9" class="location-table--mobile-view--header pb-0">{{$t('adress_header')}}</v-col>
                                        <v-col cols="3" class="location-table--mobile-view--header pb-0"><v-icon color="$grey-700" @click="deleteLocationItem(item)">mdi-delete</v-icon></v-col>
                                        <v-col cols="12" class="location-table--mobile-view--text">{{item.address}}</v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-hover>
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
import { coachGeographyApi, countryApi } from "@/api";
import GooglePlaceSearch from "@/components/geography/GooglePlaceSearch";
import { pathData } from "@/data";
import MobileTopNav from '@/components/layout/global/MobileTopNav'


export default {
    layout: "athlete",
    head() {
        return {
            title: this.$i18n.t("location_banner"),
            titleTemplate: "%s"
        };
    },
    components: {
        MobileTopNav,
        GooglePlaceSearch
    },
    data() {
        return {
            googlePlaceSearch: {
                value: ""
            },
            cca2: null,
            countryList: [],
            isDisabled: true,
            locationDataTable: {
                headers: []
            },
            locationList: [],
            location: {
                zipCode: "",
                city: "",
                address: "",
                long: "",
                lat: "",
                cca2: "",
                googleMapApiResponse: null
            },
            distance: {
                isOfferOnlyOnline: false,
                unit: "",
                farAway: ""
            },
            map: null
        };
    },
    computed: {
        validContinue(){
            if(this.locationList.length > 0){
                return true;
            }else{
                return false;
            }
        },
    },
    created() {
        this.locationDataTable = {
            headers: [
                {
                    text: this.$i18n.t("geography_table_header_text_address"),
                    value: "address",
                    class: "location-table--header",
                },
                {
                    text: this.$i18n.t("geography_table_header_text_actions"),
                    value: "action",
                    sortable: false,
                    class: "location-table--header",
                }
            ]
        };
        this.fetchCountryList();
        coachGeographyApi(this.$axios)
        .geographyPageInitialData()
        .then(response => {
            if (response.data.status == "success") {
            if (response.data.locations.length > 0) {
                this.locationList = response.data.locations;
            }
            if (response.data.distance) {
                this.distance.isOfferOnlyOnline =
                response.data.distance.is_offer_only_online;
                this.distance.farAway = response.data.distance.far_away;
            }
            }
            this.initMap();
        })
        .catch(() => {});
    },
    methods:{
        handleGoogleLocation(item) {
            this.isDisabled = false;
            let {
                zipCode,
                city,
                address,
                long,
                lat,
                cca2,
                googleMapApiResponse
            } = item;
            this.location.zipCode = zipCode;
            this.location.city = city;
            this.location.address = address;
            this.location.long = long;
            this.location.lat = lat;
            this.location.cca2 = cca2;
            this.location.googleMapApiResponse = googleMapApiResponse;
        },
        async fetchCountryList() {
            try {
                let { data } = await countryApi(this.$axios).get();
                if (data.data.length) {
                data.data.forEach(item => {
                    this.countryList.push(item);
                });
                }
            } catch (error) {
                console.log(error);
            }
        },
        addLocation() {
            let payload = {
                lat: this.location.lat,
                long: this.location.long,
                address: this.location.address,
                zip: this.location.zipCode,
                city: this.location.city,
                cca2: this.location.cca2,
                googleMapApiResponse: this.location.googleMapApiResponse,
                is_onboarding : true,

            };

            coachGeographyApi(this.$axios)
                .storeLocation(payload)
                .then(response => {
                if (response.data.status == "success") {
                    this.locationList.push(response.data.location);
                    this.location.address = "";
                    this.location.zipCode = "";
                    this.location.city = "";
                    this.$toast.success(response.data.message);
                }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        deleteLocationItem(item) {
            const index = this.locationList.indexOf(item);
            if (confirm("Are you sure you want to delete this item?")) {
                coachGeographyApi(this.$axios)
                .deleteLocation(item.id)
                .then(response => {
                    if (response.data.status == "success") {
                    this.$toast.success(response.data.message);
                    this.locationList.splice(index, 1);
                    this.initMap();
                    }
                    this.refreshPageProgress();
                })
                .catch(error => {
                    console.log(error);
                });
            }
        },
        handleCancelBtnClick(){
            this.$router.push(this.localePath(pathData.pages.becomeACoach));
        },
        handleBackBtnClick(){
            this.$router.push(this.localePath(pathData.coach.onboarding.step4));
        },
        handleSkipButtonClick(){
            this.$router.push(this.localePath(pathData.coach.onboarding.step6));
        },
        handleSaveBtnClick(){
            this.$router.push(this.localePath(pathData.coach.onboarding.step6));
        }
    }
};
</script>

<style scoped lang="scss">
    ::v-deep .v-data-table-header {
        background-color: $grey-200;
        font-family: $font-family!important;
        font-style: normal!important;
        font-weight: 600!important;
        font-size: 12px!important;
        line-height: 16px!important;
        letter-spacing: 0.05em!important;
        text-transform: uppercase!important;
        color: $grey-700!important;
    }
    ::v-deep .v-data-table {
        border-radius: 5px;  
    }
    .location-table{
        &--mobile-view{
            background: #FFFFFF;
            box-shadow: 0px 4px 12px rgba(73, 85, 106, 0.15);
            border-radius: 8px;
            padding: 5px;
            &--header{
                font-family: $font-family;
                font-style: normal;
                font-weight: 600;
                font-size: 16px;
                line-height: 22px;
                display: flex;
                align-items: center;
                text-transform: capitalize;
                color: $grey-700;
            }
            &--text{
                font-family: $font-family;
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 22px;
                display: flex;
                align-items: center;
                color: $grey-500;
                overflow-wrap: break-word!important;
            }
        }
        &--text{
            font-family: $font-family;
            font-style: normal;
            font-weight: 600;
            font-size: 14px;
            line-height: 18px;
            color: $grey-700;
        }
        &--header{
            font-family: $font-family!important;
            font-style: normal!important;
            font-weight: 600!important;
            font-size: 12px!important;
            line-height: 16px!important;
            letter-spacing: 0.05em!important;
            text-transform: uppercase!important;
            color: $grey-700!important;
        }
        &--button{
            font-family: $font-family;
            font-style: normal;
            font-weight: 600!important;
            font-size: 14px;
            line-height: 18px;
            color: #15577C !important;
            text-transform: none;
            font-weight: bold!important;
        }
    }
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
      
