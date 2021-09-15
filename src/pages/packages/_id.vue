<template>
  <div class="front-booking-page">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="10">
          <v-stepper v-model="step">
            <v-stepper-header>
              <v-stepper-step
                :complete="step > 1"
                :step="1"
                :editable="isFirstStepEditAble"
              >
                {{ $t("booking_step_order_details") }}
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="step > 2" step="2">
                {{ $t("booking_step_confirm_and_pay") }}
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="3">
                {{ $t("booking_step_waiting_for_coach") }}
              </v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
              <!-- Step One -->
              <v-stepper-content step="1">
                <v-card>
                  <v-card-title>
                    <v-spacer></v-spacer>
                  </v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12" md="5">
                        <div class="profile-card">
                          <profile-simple-card
                            v-bind="profileCard"
                          ></profile-simple-card>
                        </div>
                      </v-col>
                      <v-col
                        cols="12"
                        md="2"
                        class="d-flex justify-center align-center"
                      >
                        <div class="line--vertical text-center"></div>
                      </v-col>
                      <v-col cols="12" md="5">
                        <div class="person-number" v-if="isCampPackage">
                          <div class="person-number__text">
                            {{ $t("booking_group_package_person_text") }}
                          </div>
                          <div class="person-number__select">
                            <v-select
                              dense
                              flat
                              color="primary-light-1"
                              outlined
                              v-model="
                                packageInfo.chargeBox.personNumbers.value
                              "
                              :items="packageInfo.chargeBox.personNumbers.items"
                              solo
                            ></v-select>
                          </div>
                        </div>
                        <charge-box
                          :charge-info="packageInfo.chargeBox"
                          :camp-package="isCampPackage"
                          :promo-code="promoCode"
                        />
                        <div class="package-info">
                          <package-simple-card
                            v-bind="packageInfo"
                          ></package-simple-card>
                        </div>
                        <div class="continue-btn mb-2">
                          <v-btn
                            color="#EDB041"
                            @click.stop="continueBtnHandler"
                            dark
                            >{{ $t("booking_btn_label_continue") }}</v-btn
                          >
                        </div>
                        <div class="help-text">
                          {{ $t("booking_continue_help_txt_not_charged_yet") }}
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-stepper-content>
              <!-- ./Step One -->

              <!-- Step Two -->
              <v-stepper-content step="2">
                <v-card>
                  <v-card-title>
                    <v-spacer></v-spacer>
                  </v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12" md="5">
                        <div class="profile-card">
                          <profile-simple-card
                            v-bind="profileCard"
                          ></profile-simple-card>
                        </div>
                        <div class="message-box">
                          <div class="message-box__title">
                            {{ $t("booking_message_box_title") }}
                            <span class="required">*</span>
                          </div>
                          <div class="message-box__field">
                            <v-textarea
                              ref="messageBoxTextArea"
                              outlined
                              flat
                              :hint="$t('booking_message_box_text_area_label')"
                              v-model="messageFromPackageBuyer"
                            />
                          </div>
                        </div>
                      </v-col>
                      <v-col
                        cols="12"
                        md="2"
                        class="d-flex justify-center align-center"
                      >
                        <div class="line--vertical text-center"></div>
                      </v-col>
                      <v-col cols="12" md="5">
                        <div class="person-number" v-if="isCampPackage">
                          <div class="person-number__text">
                            {{ $t("booking_group_package_person_text") }}
                          </div>
                          <div class="person-number__select">
                            <v-select
                              dense
                              flat
                              color="primary-light-1"
                              outlined
                              v-model="
                                packageInfo.chargeBox.personNumbers.value
                              "
                              :items="packageInfo.chargeBox.personNumbers.items"
                              solo
                            ></v-select>
                          </div>
                        </div>
                        <charge-box
                          :charge-info="packageInfo.chargeBox"
                          :camp-package="isCampPackage"
                          :promo-code="promoCode"
                        />
                        <div class="promo-code">
                          <v-text-field
                            v-model="promoCode.value"
                            outlined
                            dense
                            readonly
                            @click="promoCode.dialog = true"
                            elevation="0"
                            hide-details
                            class="mt-5"
                            placeholder="Enter promo code or gift certificate code here"
                          >
                            <template v-slot:append>
                              <div>
                                <v-icon v-if="promoCode.valid" color="green">
                                  mdi-check
                                </v-icon>
                              </div>
                            </template>
                          </v-text-field>
                          <v-dialog v-model="promoCode.dialog" max-width="290">
                            <v-card>
                              <v-card-title>
                                Promo Code
                                <v-spacer></v-spacer>
                                <v-btn
                                  icon
                                  x-small
                                  @click="promoCode.dialog = false"
                                >
                                  <v-icon>mdi-close</v-icon>
                                </v-btn>
                              </v-card-title>
                              <v-card-text>
                                <v-text-field
                                  v-model="promoCode.dialogValue"
                                  label="Enter promo code"
                                ></v-text-field>
                              </v-card-text>
                              <v-card-actions>
                                <v-spacer></v-spacer>

                                <v-btn
                                  color="error"
                                  text
                                  @click="handleRemoveBtnClick"
                                >
                                  remove
                                </v-btn>
                                <v-btn
                                  color="primary-light-1"
                                  text
                                  :loading="isLoading"
                                  @click="handleApplyBtnClick"
                                >
                                  apply
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </div>
                        <div class="payment">
                          <v-radio-group v-model="selectedPaymentMethod" column>
                            <span
                              v-for="(paymentMethod, i) in paymentMethods"
                              :key="i"
                            >
                              <v-radio
                                color="primary-light-1"
                                :value="paymentMethod.value"
                              >
                                <template v-slot:label>
                                  <img
                                    :src="
                                      require('@/assets/images/booking/' +
                                        paymentMethod.logo)
                                    "
                                  />
                                </template>
                              </v-radio>
                            </span>
                          </v-radio-group>
                        </div>
                        <div class="mt-2 mb-2">
                          <v-btn
                            depressed
                            :disabled="isDisabledRequestAndAuthorisePaymentBtn"
                            color="#EDB041"
                            class="white--text"
                            :loading="loadingRequestBookingBtn"
                            @click.stop="requestBookingButtonHandler"
                            x-large
                          >
                            <span
                              v-html="$t('booking_btn_label_request_booking')"
                            ></span>
                          </v-btn>
                        </div>
                        <div class="help-text" v-if="!isQuickBooking">
                          {{ $t("booking_request_btn_help_text") }}
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-stepper-content>
              <!-- ./Step Two -->

              <!-- Step Three -->
              <v-stepper-content step="3">
                <v-card color="#ECF2F7">
                  <v-card-text>
                    <img
                      v-if="$route.query.quick_booking"
                      :src="
                        `https://makeinfluence.com/p?bid=7e4d005a-5ca9-11eb-8c81-02d6cc0d2b4c&value=${$route.query.sale_price}&uid=${$route.query.order_key}`
                      "
                    />
                    <div class="message-container">
                      <div class="quick-booking--dissable" v-if="true">
                        <div class="quick-booking__message-box">
                          <div class="message">
                            <i18n
                              path="booking_congrate_message_timer"
                              tag="span"
                            >
                              <template v-slot:break>
                                <span><br /></span>
                              </template>
                              <template v-slot:name>
                                {{ profileCard.name }}
                              </template>
                            </i18n>
                          </div>
                        </div>
                        <div class="quick-booking__chat-btn mt-10">
                          <v-btn
                            class="white--text"
                            :loading="isChatBtnLoading"
                            color="#EDB041"
                            @click="chatNowBtnClickHandle"
                            >{{ $t("booking_btn_label_chat_now") }}
                            {{ profileCard.name }}</v-btn
                          >
                        </div>
                      </div>
                      <div class="quick-booking--enable" v-if="false">
                        <div class="quick-booking__message-box">
                          <div class="message">
                            <i18n
                              path="booking_congrate_message_no_timer"
                              tag="span"
                            >
                              <template v-slot:break>
                                <span><br /></span>
                              </template>
                            </i18n>
                          </div>
                        </div>
                        <div class="quick-booking__chat-btn mt-10">
                          <v-btn
                            :loading="isChatBtnLoading"
                            color="#EDB041"
                            @click="chatNowBtnClickHandle"
                            >{{ $t("booking_btn_label_chat_now") }}
                            {{ profileCard.name }}</v-btn
                          >
                        </div>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-stepper-content>
              <!-- ./ Step Three -->
            </v-stepper-items>
          </v-stepper>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import _ from "lodash";

import ProfileSimpleCard from "@/components/card/ProfileSimpleCard";
import PackageSimpleCard from "@/components/card/PackageSimpleCard";
import ChargeBox from "@/components/artifact/global/pages/booking/ChargeBox";
import { currencyService, bookingService } from "@/services";
import { constantData, pathData } from "@/data";
import { storageHelper } from "@/helper";
import { bookingApi } from "@/api";
export default {
  components: {
    ProfileSimpleCard,
    PackageSimpleCard,
    ChargeBox
  },
  data() {
    return {
      promoCode: {
        valid: false,
        value: "",
        amount: 0.0,
        dialog: false,
        dialogValue: ""
      },
      currencyService,
      isChatBtnLoading: false,
      loadingRequestBookingBtn: false,
      selectedPaymentMethod: null,
      isLoading: false,
      paymentMethods: [
        // {
        //   id: 1,
        //   name: "Mobile Pay",
        //   value: "mobile_pay",
        //   logo: "mobile-pay.svg",
        // },
        // {
        //   id: 2,
        //   name: "Apple Pay",
        //   value: "apple_pay",
        //   logo: "apple-pay.svg",
        // },
        // {
        //   id: 3,
        //   name: "Paypal",
        //   value: "paypal",
        //   logo: "paypal.svg",
        // },
        {
          id: 4,
          name: "VISA",
          value: "visa",
          logo: "visa-text.svg"
        },
        {
          id: 5,
          name: "Master Card",
          value: "master_card",
          logo: "visa-circle.svg"
        }
      ],
      messageFromPackageBuyer: "",
      currency: currencyService.selectedCurrency(),
      step: 1,
      profileCard: {
        userId: null,
        name: "",
        image: "",
        rating: 0,
        rating_count: 0,
        tags: [],
        categories: [],
        fb_link: "",
        twitter_link: "",
        instagram_link: ""
      },
      packageSetting: null,
      packageInfo: {
        packageId: null,
        chargeBox: {
          priceForPackage: 0,
          salePrice: 0,
          serviceFee: 0,
          totalPerPerson: 0,
          total: 0,
          personNumbers: {
            items: [],
            value: 1
          }
        },
        title: "",
        description: "",
        category: null
      },
      payment: {
        gateway: "red"
      }
    };
  },
  computed: {
    isFirstStepEditAble() {
      return this.step == 2;
    },
    isSelectPaymentMethod() {
      return this.selectedPaymentMethod ? true : false;
    },
    isDisabledRequestAndAuthorisePaymentBtn() {
      if (
        !this.selectedPaymentMethod ||
        this.messageFromPackageBuyer.trim().length < 1
      ) {
        return true;
      } else {
        return false;
      }
    },
    isQuickBooking: function() {
      let isQuick = false;
      if (this.packageSetting) {
        isQuick = this.packageSetting.isQuickBooking;
      }
      return isQuick;
    },
    isCampPackage: function() {
      let isCampPackage = false;
      let category = this.packageInfo.category;
      if (category && category.id == constantData.PACKAGE_CATEGORY_ID_CAMP) {
        isCampPackage = true;
      }
      return isCampPackage;
    }
  },
  watch: {
    selectedPaymentMethod() {
      this.$refs.messageBoxTextArea.focus();
    },
    step: function(val) {
      if (val) {
        let booking = storageHelper.get("booking");
        if (booking) {
          booking.step = val;
          storageHelper.set("booking", booking);
        }
      }
    },
    "packageInfo.chargeBox.personNumbers.value": {
      handler(val) {
        if (val) {
          this.packageInfo.chargeBox.total =
            this.packageInfo.chargeBox.totalPerPerson * val;
        }
      },
      immediate: true,
      deep: true
    }
  },
  async asyncData({ params }) {
    return { packageId: params.id };
  },
  created() {},
  mounted() {
    let initialValue = {
      id: null, // booking id
      step: 1,
      status: "Initial",
      person: 1,
      isNotified: false,
      packageId: parseInt(this.packageId),
      isRedirectToChat: false
    };

    // Get booking
    let booking = bookingService.getBookingInfo();

    // If there has no booking info
    if (!booking) {
      bookingService.setBookingInfo({ ...initialValue });
      booking = bookingService.getBookingInfo();
    }

    // if booking info exist
    if (booking) {
      this.step = booking.step;
      this.packageInfo.chargeBox.personNumbers.value = booking.value;
      booking.packageId = this.packageId;
    }

    // Notified if step at 3
    if (!booking.isNotified && this.$route.query.payment_status == "paid") {
      booking.isNotified = true;
      this.notify({ bookingId: booking.id });
    }

    // if status is paid && not redirect to chat
    if (
      this.$route.query.payment_status == "paid" &&
      !booking.isRedirectToChat
    ) {
      this.step = 3;
      booking.status = "Completed";
    }

    if (
      this.$route.query.payment_status == "paid" &&
      booking.isRedirectToChat
    ) {
      this.$router.push(pathData.pages.marketplace);
    }

    // Set booking info after some change
    bookingService.setBookingInfo(booking);

    // If payment is canceled
    if (this.$route.query.payment_status == "cancel") {
      bookingService.destroyBookingInfo();
      this.$router.push(this.localePath(pathData.pages.marketplace));
    }

    this.fetchBookingInfo({
      packageId: booking.packageId,
      promoCode: null,
      withPromoCode: false
    });
  },
  methods: {
    handleRemoveBtnClick() {
      this.fetchBookingInfo({
        packageId: this.packageId,
        promoCode: null,
        withPromoCode: false
      });
      this.promoCode.dialogValue = "";
      this.promoCode.dialog = false;
    },
    handleApplyBtnClick() {
      this.fetchBookingInfo({
        packageId: this.packageId,
        promoCode: this.promoCode.dialogValue,
        withPromoCode: true
      });
    },
    fetchBookingInfo(payload) {
      const { packageId, promoCode, withPromoCode } = payload;
      this.isChatBtnLoading = true;
      this.isLoading = true;

      bookingApi(this.$axios)
        .getBookingInfo({
          packageId,
          promoCode
        })
        .then(response => {
          let profileCardInfo = response.data.profileCard;
          let packageInfo = response.data.packageInfo;
          let chargeBox = response.data.chargeBox;
          let packageSetting = response.data.packageSetting;
          let promoCode = response.data.promoCode;

          if (packageSetting) {
            this.packageSetting = packageSetting;
          }

          if (profileCardInfo) {
            this.profileCard.userId = profileCardInfo.userId;
            this.profileCard.name = profileCardInfo.profileName;
            this.profileCard.image = profileCardInfo.image;

            this.profileCard.rating =
              profileCardInfo.reviews.length > 0
                ? profileCardInfo.reviews[0].rating
                : 0;
            this.profileCard.rating_count =
              profileCardInfo.reviews.length > 0
                ? profileCardInfo.reviews[0].ratingCount
                : 0;
            this.profileCard.tags = profileCardInfo.tags;
            this.profileCard.categories = profileCardInfo.categories;
          }

          if (packageInfo) {
            this.packageInfo.packageId = packageInfo.id;
            this.packageInfo.title = packageInfo.details.title;
            this.packageInfo.description = packageInfo.details.description;
            this.packageInfo.category = packageInfo.category;
            this.setCategoryId(packageInfo.category.id);
          }

          if (chargeBox) {
            this.packageInfo.chargeBox.priceForPackage =
              chargeBox.priceForPackage;
            this.packageInfo.chargeBox.totalPerPerson =
              chargeBox.totalPerPerson;
            this.packageInfo.chargeBox.total = chargeBox.total;
            this.packageInfo.chargeBox.salePrice = chargeBox.salePrice;
            this.packageInfo.chargeBox.serviceFee = chargeBox.serviceFee;
            this.packageInfo.chargeBox.personNumbers.items = _.range(
              chargeBox.minPerson,
              chargeBox.maxPerson + 1
            );
            this.packageInfo.chargeBox.personNumbers.value =
              chargeBox.minPerson;
            this.setPerson(chargeBox.minPerson);
          }

          if (promoCode) {
            this.promoCode.valid = promoCode.valid;
            this.promoCode.value = promoCode.value;
            this.promoCode.amount = promoCode.amount;
            if (withPromoCode) {
              if (!promoCode.valid) {
                this.$toast.error(promoCode.message);
              } else {
                this.promoCode.dialog = false;
              }
            }
          }
        })
        .finally(() => {
          this.isChatBtnLoading = false;
          this.isLoading = false;
        });
    },
    notify(payload) {
      bookingApi(this.$axios).notify(payload);
    },
    requestBookingButtonHandler() {
      let payload = {
        packageId: this.packageInfo.packageId,
        serviceFee: this.packageInfo.chargeBox.serviceFee,
        numberOfAttendees: this.packageInfo.chargeBox.personNumbers.value,
        totalPerPerson: this.packageInfo.chargeBox.totalPerPerson,
        totalAmount: this.packageInfo.chargeBox.total,
        currency: this.currency.code,
        message: this.messageFromPackageBuyer,
        salePrice: this.packageInfo.chargeBox.salePrice,
        paymentMethod: this.selectedPaymentMethod,
        packageUrl: location.href,
        promoCode: this.promoCode.value
      };
      this.loadingRequestBookingBtn = true;
      bookingApi(this.$axios)
        .payByQuickpay(payload)
        .then(({ data }) => {
          if (data.bookingId) {
            let booking = bookingService.getBookingInfo("booking");
            booking.id = data.bookingId;
            bookingService.setBookingInfo(booking);
          }
          if (data.link) {
            window.location.assign(data.link);
          }
        })
        .catch(error => {
          this.$toast.error(error.response.data.message);
        })
        .finally(() => {
          this.loadingRequestBookingBtn = false;
        });
    },
    continueBtnHandler() {
      if (!this.$auth.loggedIn) {
        this.$router.push(this.localePath(pathData.pages.register));
      } else {
        this.step = 2;
        this.setStepToStorage(this.step);
      }
    },
    chatNowBtnClickHandle() {
      let booking = bookingService.getBookingInfo();
      if (booking) {
        booking.isRedirectToChat = true;
        bookingService.setBookingInfo(booking);
      }
      this.$router.push(
        this.localePath({
          ...pathData.pages.chat,
          query: { userId: this.profileCard.userId }
        })
      );
    },
    setStepToStorage(step) {
      let booking = bookingService.getBookingInfo();
      booking.step = step;
      bookingService.setBookingInfo(booking);
    },
    setPerson(person) {
      if (person) {
        let booking = bookingService.getBookingInfo();
        booking.person = person;
        bookingService.setBookingInfo(booking);
      }
    },
    setCategoryId(id) {
      let booking = bookingService.getBookingInfo();
      booking.categoryId = id;
      bookingService.setBookingInfo(booking);
    }
  }
};
</script>

<style lang="scss">
.front-booking-page {
  background: $body-bg;
  height: 100%;
  .promo-code {
    .v-text-field--outlined.v-input--dense input::placeholder {
      font-size: 12px;
      color: #6f8098;
    }
  }

  .message-container {
    display: flex;
    justify-content: center;
    align-content: center;
    padding: 100px 50px;
  }

  .message {
    font-family: $font-family;
    font-weight: bold;
    font-size: 24px;
    line-height: 33px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #49556a;
  }
  .timer {
    font-family: $font-family;
    font-weight: bold;
    font-size: 60px;
    line-height: 33px;
    text-align: center;
    margin-top: 50px;
    color: #49556a;
  }

  .continue-btn {
    margin-top: 50px;
  }

  .help-text {
    font-family: $font-family;
    font-size: 12px;
    line-height: 16px;
    color: #6f8098;
  }

  .stroke {
    font-weight: bold;
  }
  .package-info {
    margin-top: 50px;
  }

  .profile-card {
    margin-top: 20px;
  }

  .line--vertical {
    border: 1px solid #15577c;
    width: 1px;
    height: 80%;
  }

  .availability {
    margin-top: 20px;
    background: #fcfdfe;
    border-radius: 20px;
    box-shadow: 0px 4px 12px rgba(73, 85, 106, 0.15);
    padding-top: 20px;
    padding-bottom: 100px;

    &__title {
      font-family: $font-family;
      font-size: 16px;
      line-height: 22px;
      text-align: center;
      color: $primary-light-1;
      border-radius: 20px;
    }
  }
  .availability-timebox {
    &__month {
      margin: 20px 0;
      font-family: $font-family;
      font-size: 16px;
      line-height: 22px;
      text-align: center;
      color: $primary-light-1;
      border-radius: 20px;
    }
    &__days {
      display: flex;
    }
  }
  .day-box {
    margin: 0 20px;
    &__name {
      font-family: $font-family;
      font-size: 12px;
      line-height: 16px;
      text-align: center;
      color: #6f8098;
    }
    &__date {
      font-family: $font-family;
      font-weight: 800;
      font-size: 36px;
      line-height: 49px;
      text-align: center;
      color: #49556a;
    }
  }
  .timeslot-box {
    margin-top: 15px;
  }
  .message-box {
    margin-top: 40px;
    border-radius: 10px 10px 0px 0px;
    border-top: 5px solid $primary-light-1;
    background: #ffffff;
    box-shadow: 0px 10px 20px rgba(159, 174, 194, 0.15);
    &__title {
      font-family: $font-family;
      font-weight: bold;
      font-size: 18px;
      line-height: 25px;
      text-indent: 16px;
      color: $primary-light-1;
      padding: 10px 0;
    }
    &__field {
      padding: 10px 15px 20px;
    }
  }
  .person-number {
    display: flex;
    &__text {
      font-family: $font-family;
      font-weight: 600;
      font-size: 18px;
      line-height: 25px;
      color: #000000;
      width: 80%;
    }
    &__select {
      width: 20%;
    }
  }
  .quick-booking--enable {
    .quick-booking__chat-btn {
      display: flex;
      justify-content: center;
    }
  }

  .quick-booking--dissable {
    .quick-booking__chat-btn {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
