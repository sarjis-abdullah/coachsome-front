<template>
  <div class="gift-checkout">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="10">
          <v-stepper v-model="seletedStep" elevation="0" flat>
            <v-stepper-header>
              <template v-for="n in steps">
                <v-stepper-step
                  :key="n.value"
                  :complete="seletedStep > n.value"
                  :step="n.value"
                >
                  {{ n.name }}
                </v-stepper-step>

                <v-divider
                  v-if="n.value !== steps.length"
                  :key="'divider' + n.value"
                ></v-divider>
              </template>
            </v-stepper-header>

            <v-stepper-items>
              <!-- Step - 1 -->
              <v-stepper-content :step="1">
                <v-card>
                  <v-card-title>
                    <v-spacer></v-spacer>
                  </v-card-title>
                  <v-card-text class="px-15 pb-16">
                    <v-row>
                      <v-col cols="12" md="5">
                        <div class="order-details-title mt-5 mb-5">
                          {{ $t("checkout_selected_amount") }}
                        </div>
                        <v-card
                          rounded="lg"
                          class="gift-card"
                          color="primary-light-2"
                          height="200"
                        >
                          <div class="gift-card__body">
                            {{ selectedAmount + " " + currency }}
                          </div>
                        </v-card>
                      </v-col>
                      <v-col
                        cols="12"
                        md="2"
                        class="d-flex justify-center align-center"
                      >
                        <div
                          :class="[
                            'line--vertical text-center',
                            { 'd-none': $vuetify.breakpoint.smAndDown }
                          ]"
                          style="min-height: 500px;"
                        ></div>
                      </v-col>
                      <v-col cols="12" md="5">
                        <div
                          class="charge-box"
                          :style="{
                            borderImage: `url(${require('@/assets/images/border-staircase.svg')}) 30 space`
                          }"
                        >
                          <div class="charge-box__item">
                            <div class="charge-box__item-left">
                              {{ $t("charge_box_gift_card_amount") }}
                            </div>
                            <div class="charge-box__item-right">
                              {{
                                currencyService.toCurrency(selectedAmount)
                              }}
                            </div>
                          </div>
                          <div class="charge-box__item">
                            <div class="charge-box__item-left"></div>
                            <div class="charge-box__item-right"></div>
                          </div>

                          <div class="charge-box__item">
                            <div class="charge-box__item-left stroke">
                              {{ $t("booking_charge_box_total") }}
                            </div>
                            <div class="charge-box__item-right stroke">
                              {{
                                currencyService.toCurrency(totalAmount)
                              }}
                            </div>
                          </div>
                        </div>

                        <div class="d-flex align-center mt-15 mb-3">
                          <v-btn
                            depressed
                            class="px-10 white--text text-normal rounded-lg"
                            color="#EDB041"
                            @click="handleContinueBtnClick"
                          >
                            {{ $t("checkout_label_continue") }}
                          </v-btn>

                          <div class="or-text mx-5">
                            {{ $t("checkout_text_or") }}
                          </div>
                          <div>
                            <v-btn
                              color="primary-light-1"
                              text
                              @click="handleChangeAmountBtnClick"
                            >
                              {{ $t("checkout_label_change_amount") }}
                            </v-btn>
                          </div>
                        </div>
                        <div class="helper-text">
                          {{ $t("checkout_helper_text_not_charged_yet") }}
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-stepper-content>

              <!-- Step - 2 -->
              <v-stepper-content :step="2">
                <v-card>
                  <v-card-title>
                    <v-spacer></v-spacer>
                  </v-card-title>
                  <v-card-text class="px-15 pb-15">
                    <v-row>
                      <v-col cols="12" md="5">
                        <div class="card">
                          <div class="card__header">
                            <div class="card__title">
                              {{ $t("recipent_title") }}
                            </div>
                          </div>
                          <div class="card__body">
                            <v-text-field
                              v-model="recipentName"
                              dense
                              outlined
                              flat
                              :hint="$t('recipent_description')"
                            >
                            </v-text-field>
                          </div>
                        </div>
                        <div class="card mt-10">
                          <div class="card__header">
                            <div class="card__title">
                              {{ $t("checkout_personal_message_title") }}
                            </div>
                          </div>
                          <div class="card__body">
                            <v-textarea
                              v-model="message"
                              ref="messageBoxTextArea"
                              outlined
                              flat
                              :hint="
                                $t('checkout_personal_message_descritpiotn')
                              "
                            />
                          </div>
                        </div>
                      </v-col>
                      <v-col
                        cols="12"
                        md="2"
                        class="d-flex justify-center align-center d-sm-none d-md-flex"
                      >
                        <div class="line--vertical text-center"></div>
                      </v-col>
                      <v-col cols="12" md="5">
                        <div
                          class="charge-box"
                          :style="{
                            borderImage: `url(${require('@/assets/images/border-staircase.svg')}) 30 space`
                          }"
                        >
                          <div class="charge-box__item">
                            <div class="charge-box__item-left">
                              {{
                                $t("checkout_title_amount_of_the_certificate")
                              }}
                            </div>
                            <div class="charge-box__item-right">
                              {{
                                currencyService.toCurrency(selectedAmount)
                              }}
                            </div>
                          </div>
                          <div class="charge-box__item">
                            <div class="charge-box__item-left"></div>
                            <div class="charge-box__item-right"></div>
                          </div>

                          <div class="charge-box__item">
                            <div class="charge-box__item-left stroke">
                              {{ $t("booking_charge_box_total") }}
                            </div>
                            <div class="charge-box__item-right stroke">
                              {{
                                currencyService.toCurrency(totalAmount)
                              }}
                            </div>
                          </div>
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

                        <v-btn
                          @click="handleConfirmAndPayBtnClick"
                          class="px-10 white--text text-normal"
                          color="primary-light-1"
                        >
                          {{ $t("checkout_label_confirm_and_pay") }}
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-stepper-content>

              <!-- Step - 3 -->
              <v-stepper-content :step="3">
                <div class="gift-confirmation">
                  <div class="gift-confirmation__top">
                    Congratulations you have purchased a Gift Card for
                    :GiftCardReceiverFullName
                  </div>
                  <div class="gift-confirmation__middle">
                    <v-btn
                      :loading="isDownloading"
                      @click="printDownload"
                      color="#EDB041"
                      x-large
                      class="text-normal white--text font-weight-bold"
                    >
                      {{ $t("checkout_label_download_gift_card") }}
                    </v-btn>
                  </div>
                  <div class="gift-confirmation__bottom">
                    {{ $t("checkout_helper_text_mailed_attach") }}
                  </div>
                </div>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { currencyService, giftService } from "@/services";
import { endpoint } from "../../api";
import { pathData } from "@/data";

export default {
  components: {},
  data() {
    return {
      currencyService,
      selectedAmount: 0,
      totalAmount: 0,
      currency: "",
      seletedStep: 1,
      isDownloading: false,
      recipentName: "",
      message: "",
      steps: [
        {
          name: "Order details",
          key: "gift_checkout_first_step",
          value: 1
        },
        {
          name: "Confirm and pay",
          key: "gift_checkout_second_step",
          value: 2
        },
        {
          name: "Waiting for coach",
          key: "gift_checkout_third_step",
          value: 3
        }
      ],
      selectedPaymentMethod: null,
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
      ]
    };
  },

  watch: {},
  mounted() {
    const { amount, currency, status } = this.$route.query;
    this.selectedAmount = amount;
    this.totalAmount = amount;
    this.currency = currency;

    let gift = giftService.getGift();
    if (!gift) {
      gift = {
        step: 1
      };
      giftService.setGift(gift);
    }
    gift = giftService.getGift();
    this.seletedStep = gift.step;
    if (status == "success") {
      this.seletedStep = 3;
      gift = {
        step: 3
      };
      giftService.setGift(gift);
    }
  },

  methods: {
    handleChangeAmountBtnClick() {
      this.$router.push(this.localePath(pathData.pages.gift));
    },
    async printDownload() {
      // this.$refs.DownloadComp.generatePdf();
      const { id } = this.$route.query;
      this.isDownloading = true;
      try {
        const response = await this.$axios.get(
          endpoint.GIFT_CARDS_ID_DOWNLOAD_GET(id),
          {
            responseType: "blob"
          }
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "gift-card.pdf");
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        if (errro.response.data.error) {
          this.$toast.error(errro.response.data.error.message);
        }
      } finally {
        this.isDownloading = false;
      }
    },
    handleContinueBtnClick() {
      this.seletedStep = 2;
      let gift = giftService.getGift();
      if (gift) {
        gift = {
          step: 2
        };
        giftService.setGift(gift);
      }
    },
    async handleConfirmAndPayBtnClick() {
      try {
        const payload = {
          message: this.message,
          currency: this.currency,
          totalAmount: this.totalAmount,
          paymentMethod: this.selectedPaymentMethod,
          recipentName: this.recipentName
        };
        if (this.selectedPaymentMethod) {
          const { data } = await this.$axios.post(
            endpoint.GIFT_CARDS_PAY_POST,
            payload
          );
          if (data.data.link) {
            window.location.assign(data.data.link);
          }
        } else {
          this.$toast.error("Select a payment method");
        }
      } catch (error) {
        this.$toast.error(error.response.data.error.message);
      }
    },
    nextStep(n) {
      if (n === this.steps) {
        this.seletedStep = 1;
      } else {
        this.seletedStep = n + 1;
      }
    }
  }
};
</script>

<style lang="scss">
.gift-checkout {
  background: #f7fafc;
  height: 100%;
  .gift-confirmation {
    padding: 100px 0;
    background: #ecf2f7;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: space-between;
    border-radius: 12px;
    &__top {
      font-family: Open Sans;
      font-style: normal;
      font-weight: bold;
      font-size: 24px;
      line-height: 33px;
      text-align: center;

      color: #49556a;
    }
    &__middle {
      display: flex;
      justify-content: center;
      margin-top: 50px;
      margin-bottom: 50px;
    }
    &__bottom {
      font-family: $font-family;
      font-style: italic;
      font-weight: bold;
      font-size: 24px;
      line-height: 33px;
      text-align: center;
      color: #49556a;
    }
  }
  .or-text {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
    color: #6f8098;
  }
  .helper-text {
    font-family: $font-family;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    color: #6f8098;
  }
  .v-stepper {
    background: transparent !important;
  }
  .v-stepper__header {
    box-shadow: none !important;
  }

  .line--vertical {
    border: 1px solid #15577c;
    width: 1px;
    height: 80%;
  }
  .card {
    background: #ffffff;
    box-shadow: 0px 10px 20px rgba(159, 174, 194, 0.15);
    border-radius: 10px;
    width: 100%;
    &__header {
      padding-top: 13px;
      padding-bottom: 13px;
      border-bottom: 1px solid #e1e8f1;
      border-top: 5px solid #15577c;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
    &__title {
      font-family: $font-family;
      font-weight: bold;
      font-size: 18px;
      line-height: 25px;
      text-indent: 16px;
      color: $primary-light-1;
    }
    &__body {
      padding-top: 23px;
      padding-left: 23px;
      padding-right: 23px;
      padding-bottom: 10px;
      font-family: $font-family;
      font-style: italic;
      font-size: 14px;
      line-height: 19px;
      color: #6f8098;
    }
  }

  .charge-box {
    padding: 20px 10px 35px 10px;
    box-shadow: -1px 0px 0px 0px #6f8098, 1px 0px 0px 0px #6f8098;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    &__item {
      display: flex;
      justify-content: space-between;
      padding: 5px 0px;
      align-items: center;
      &-left {
        font-family: $font-family;
        font-size: 14px;
        line-height: 19px;
        color: #000000;
      }
      &-right {
        font-family: $font-family;
        font-size: 14px;
        line-height: 19px;
        color: #000000;
      }
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

    .promo {
      background: $body-bg;
      padding: 3px;
    }
  }

  .order-details-title {
    font-family: $font-family;
    font-weight: bold;
    font-size: 24px;
    line-height: 33px;
    text-align: center;
    color: #000000;
  }

  .gift-card {
    position: relative;
    width: 100%;
    &--border {
      border: 5px solid #cad5e1;
    }
    &__check {
      position: absolute;
      top: 14px;
      right: 14px;
    }
    &__body {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      font-family: $font-family;
      font-weight: bold;
      font-size: 24px;
      line-height: 33px;
      color: #f7fafc;
    }
  }
}
</style>
