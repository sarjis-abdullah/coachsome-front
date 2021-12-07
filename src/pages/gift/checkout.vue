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
                  editable
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
                          Selected Gift Card Amount
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
                          class="line--vertical text-center"
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
                              {{ $t("Gift Card Amount") }}
                            </div>
                            <div class="charge-box__item-right">
                              {{
                                currencyService.toCurrencyByBase(selectedAmount)
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
                                currencyService.toCurrencyByBase(totalAmount)
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
                            >Continue</v-btn
                          >

                          <div class="or-text mx-5">
                            or
                          </div>
                          <div>
                            <v-btn color="primary-light-1" text>
                              CHANGE AMOUNT
                            </v-btn>
                          </div>
                        </div>
                        <div class="helper-text">
                          You will not be charged yet
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
                              Recipent name
                            </div>
                          </div>
                          <div class="card__body">
                            Please enter the name of the person that will
                            recieve the gift certificate. This will be added to
                            the PDF file you’ll recieve with the gift
                            certificate that you can send to the receiver.
                          </div>
                        </div>
                        <div class="card mt-10">
                          <div class="card__header">
                            <div class="card__title">
                              Personal message for the recipent
                            </div>
                          </div>
                          <div class="card__body">
                            <v-textarea
                              ref="messageBoxTextArea"
                              outlined
                              flat
                              :hint="
                                $t(
                                  'Write a personal message to the person that will get the gift certificate and maybe a suggestion to a coach that they might choose.'
                                )
                              "
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
                        <div
                          class="charge-box"
                          :style="{
                            borderImage: `url(${require('@/assets/images/border-staircase.svg')}) 30 space`
                          }"
                        >
                          <div class="charge-box__item">
                            <div class="charge-box__item-left">
                              {{ "Amount on the certificate" }}
                            </div>
                            <div class="charge-box__item-right">
                              {{
                                currencyService.toCurrencyByBase(selectedAmount)
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
                                currencyService.toCurrencyByBase(totalAmount)
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
                          >Confirm & Pay</v-btn
                        >
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
                      @click="printDownload"
                      color="#EDB041"
                      x-large
                      class="text-normal white--text font-weight-bold"
                    >
                      Download Gift Card
                    </v-btn>
                    <VueHtml2pdf
                      filename="gift-card"
                      :manual-pagination="true"
                      :enable-download="true"
                      ref="DownloadComp"
                    >
                      <section slot="pdf-content">
                        <DownloadableCard
                          code="fd2f1s2f1sd21fs1fs"
                          value="1000"
                          currency="DKK"
                          first-name="Hafijur"
                          last-name="Rahaman"
                        />
                      </section>
                    </VueHtml2pdf>
                  </div>
                  <div class="gift-confirmation__bottom">
                    The Gift Card have also been mailed to you attached to your
                    receipt.
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
import { currencyService } from "@/services";
import DownloadableCard from "@/components/artifact/global/pages/gift/checkout/DownloadableCard";
import { endpoint } from "../../api";

export default {
  components: { DownloadableCard },
  data() {
    return {
      currencyService,
      selectedAmount: 0,
      totalAmount: 0,
      currency: "",
      seletedStep: 1,
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
    const { amount, currency } = this.$route.query;
    this.selectedAmount = amount;
    this.totalAmount = amount;
    this.currency = currency;
  },

  methods: {
    printDownload() {
      this.$refs.DownloadComp.generatePdf();
    },
    handleContinueBtnClick() {
      this.seletedStep = 2;
    },
    async handleConfirmAndPayBtnClick() {
      try {
        const payload = {
          currency: this.currency,
          totalAmount: this.totalAmount,
          paymentMethod: this.selectedPaymentMethod
        };
        const { data } = await this.$axios.post(
          endpoint.GIFT_CARDS_PAY_POST,
          payload
        );
        if (data.data.link) {
          window.location.assign(data.data.link);
        }
      } catch (error) {
        console.log(error);
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
