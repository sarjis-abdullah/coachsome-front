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
         <!-- Package Create Dialog -->
        <PackageCreateDialog
            v-model="dialogPackageCreate"
            :rate="hourlyRate.inputVal"
            @close="dialogPackageCreate = false"
            @created="hideTabs"
        />
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
                        <p :class="{'onboarding--body--left-banner-text--md px-15' : !$vuetify.breakpoint.smAndDown, 'onboarding--body--left-banner-text--sm' : $vuetify.breakpoint.smAndDown}">{{$t('package_banner')}}</p>
                    </v-col>
                </v-row>
            </div>
            <div class= "onboarding--body--right" :class="{'onboarding--body--right--md' : !$vuetify.breakpoint.smAndDown,'onboarding--body--right--sm mb-15': $vuetify.breakpoint.smAndDown}">
                <v-row>
                    <v-col cols="12" md="9" sm="12" class="onboarding--body--right-content--body-top">
                        <div class="default--label pb-2">
                            {{ $t("text_rate") }}
                        </div>
                        <div class="section-description">
                            {{ $t("package_dialog_hourly_rate_desc") }}
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
                        <v-text-field
                            :error-messages="hourlyRateErrors"
                            required
                            outlined
                            dense
                            v-model="hourlyRate.inputVal"
                            @input="saveHourlyRate()"
                         ></v-text-field>
                    </v-col>
                    <!-- <v-col cols="12" md="3">
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
                    </v-col> -->
                    <v-col cols="12">
                        <div class="default--label pb-2">
                            {{ $t("text_rate") }}
                        </div>
                        <div class="section-description">
                            {{ $t("package_dialog_hourly_rate_desc") }}
                        </div>
                    </v-col>
                    <v-col cols="12" md="6">
                        <div @click="handleAddBtnClick" class="onboarding--body--right--add-btn">
                            <v-icon class="onboarding--body--right--add-btn__icon" color="primary-light-1">
                                mdi-plus-circle-outline
                            </v-icon>
                            <div class="onboarding--body--right--add-btn__text">
                            {{ $t("btn_label_add_package") }}
                            </div>
                        </div>
                    </v-col>
                    <v-col
                        cols="12"
                        md="6"
                        v-for="item in packageList"
                        :key="item.id"
                    >
                        <on-boarding-package-card
                            class="all-scroll"
                            v-bind="item"
                            :rate="hourlyRate.inputVal"
                            :max-chars="descriptionMaxChar"
                        >
                            <template v-slot:original-price="{ price, discount }">
                                <div v-if="discount && discount > 0">
                                {{ currencyService.toCurrencyByBase(price) }}
                                </div>
                                <div else></div>
                            </template>
                            <template v-slot:sale-price="{ price }">
                                <span>{{ currencyService.toCurrencyByBase(price) }}</span>
                            </template>
                        </on-boarding-package-card>
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
import { coachGeographyApi, coachPackageApi } from "@/api";
import { required, decimal } from "vuelidate/lib/validators";
import { constantData, pathData } from "@/data";
import { currencyService } from "@/services";
import MobileTopNav from '@/components/layout/global/MobileTopNav';
import PackageCreateDialog from "@/components/artifact/coach/package/PackageCreateDialog";
import OnBoardingPackageCard from "@/components/card/OnBoardingPackageCard";


export default {
    layout: "common",
    head() {
        return {
            title: this.$i18n.t("package_banner"),
            titleTemplate: "%s"
        };
    },
    components: {
        MobileTopNav,
        PackageCreateDialog,
        OnBoardingPackageCard
    },
    data() {
        return {
            currencyService,
            dialogPackageCreate: false,
            quickBooking: {
                value: false
            },
            descriptionMaxChar: 500,
            editDialog: false,
            editAblePackage: null,
            packageCurrency: currencyService.defaultCurrency(),
            hourlyRate: {
                dialog: false,
                inputVal: null
            },
            showTabs: false,
            isEdit: false,
            tabs: ["default", "camp"],
            packageList: [],
            highestLimit: 8,
            drag: false,
            loading: false,
        };
    },
    computed: {
        currencyCode() {
            return this.packageCurrency.code;
        },
        hasPermitToCreateNewPackage() {
            return this.highestLimit >= this.packageList.length + 1;
        },
        hourlyRateErrors() {
            const errors = [];
            if (!this.$v.hourlyRate.inputVal.$dirty) return errors;
            !this.$v.hourlyRate.inputVal.required &&
                errors.push("Hourly rate is required.");
            !this.$v.hourlyRate.inputVal.decimal &&
                errors.push("Only number is allowed");
            return errors;
        },
        validContinue(){
            if(this.hourlyRate.inputVal != null && this.packageList.length > 0){
                return true;
            }else{
                return false;
            }
        },
    },
    validations: {
        hourlyRate: {
            inputVal: {
                required,
                decimal
            }
        }
    },
    created() {
        coachPackageApi(this.$axios)
        .packageInfo()
        .then(response => {
            this.hourlyRate.inputVal = response.data.hourly_rate;
            this.quickBooking.value =
            response.data.quickBooking == 1 ? true : false;
            this.packageList = response.data.packages.data;
            if (!this.hourlyRate.inputVal) {
            this.hourlyRate.dialog = true;
            }
            if (response.data.currency_code) {
            this.packageCurrency = currencyService.getByCode(
                response.data.currency_code
            );
            }
        })
        .catch(() => {});
    },
    methods:{
        hideTabs(newPackage) {
            this.packageList.push(newPackage);
            this.dialogPackageCreate = false;
            this.updateOrderList();
        },
        handleAddBtnClick() {
            this.dialogPackageCreate = true;
        },
        saveHourlyRate() {
            if (!this.$v.$invalid) {
                let payload = {
                    hourly_rate: this.hourlyRate.inputVal
                };
                coachPackageApi(this.$axios)
                .saveHourlyRate(payload)
                .then(response => {
                    if (response.data.status == "success") {
                        this.hourlyRate.inputVal = response.data.hourly_rate;
                        this.packageList = response.data.packages.data;
                    }
                })
                .catch(() => {});
            }
        },
        updateOrderList() {
            let payload = this.packageList.map(item => item.id);
            coachPackageApi(this.$axios)
            .updateOrder(payload)
            .then(({ data }) => {
            });
        },
        handleQuickBooking() {
            coachPackageApi(this.$axios)
                .quickBooking()
                .then(({ data }) => {
                this.quickBooking.value = data.changedValue == 1 ? true : false;
                if (data.message) {
                    this.$toast.success(
                    this.$i18n.t("package_quick_booking_success_toggle_mesg")
                    );
                }
                })
                .catch(error => {
                this.$toast.error(error.response.data.message);
                });
        },
        updateDefaultPackage(item) {
        let payload = item;
        coachPackageApi(this.$axios)
            .updatePackage(payload)
            .then(response => {
            if (response.data.status == "success") {
                this.packageList.forEach((item, index) => {
                if (item.id == response.data.package.id) {
                    this.packageList[index] = response.data.package;
                } else {
                    this.packageList[index] = item;
                }
                });
                this.$toast.success(
                this.$i18n.t("package_success_msg_package_updated")
                );
                this.editDialog = false;
                this.editAblePackage = null;
            }
            })
            .catch(() => {});
        },
        editPackage(item) {
        item.price = item.originalPrice;
        this.editAblePackage = item;
        },
        removePackage(item) {
        if (confirm(this.$i18n.t("alert_confirm_short_text"))) {
            let payload = item;
            coachPackageApi(this.$axios)
            .removePackage(payload)
            .then(({ data }) => {
                if (data.status == "success") {
                let i = this.packageList
                    .map(packageItem => packageItem.id)
                    .indexOf(item.id);
                this.packageList.splice(i, 1);
                this.$toast.success(data.message);
                }
            })
            .catch(() => {});
        }
        },
        changeStatus(item, $event) {
        let payload = {
            id: item.id,
            changed_status: $event
        };
        coachPackageApi(this.$axios)
            .changePackageStatus(payload)
            .then(response => {
            if (response.data.status == "success") {
                this.$toast.success(response.data.message);
            }
            })
            .catch(error => {
            console.log(error);
            });
        },
        handleCancelBtnClick(){
            this.$router.push(this.localePath(pathData.pages.becomeACoach));
        },
        handleBackBtnClick(){
            this.$router.push(this.localePath(pathData.coach.onboarding.step5));
        },
        handleSkipButtonClick(){
            this.$router.push(this.localePath(pathData.coach.onboarding.readyToGo));
        },
        handleSaveBtnClick(){
            this.$router.push(this.localePath(pathData.coach.onboarding.readyToGo));
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
                &--add-btn {
                    border-radius: 5px;
                    background: white;
                    border: 2px solid $primary-light-1;
                    width: 100%;
                    height: 200px;
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    &__text {
                        font-family: $font-family;
                        font-size: 18px;
                        line-height: 28px;
                        color: $primary-light-1;
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
      
