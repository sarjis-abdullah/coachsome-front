<template>
  <div class="payments">
    <v-container fluid >
      <mobile-top-nav extraClass="body-bg-secondary" :headerText="$t('page_title_payments')">
        <template v-slot:goBack>
          <v-btn
            icon
            @click="handleBack"
          >
            <v-icon class="common-top-back-icon">mdi-chevron-left</v-icon>
          </v-btn>
        </template>
        <template v-slot:action>
          <span></span>
        </template>
      </mobile-top-nav>
      <span class=" view-profile__wrapper" :class="{'page-container' : !$vuetify.breakpoint.xsOnly}">
        <v-row class="d-none d-md-block"> 
          <v-col cols="12" class="pb-0">
            <div class="page-title">
              {{ $t("page_title_payments") }}
            </div>
          </v-col>
        </v-row>

        <v-row class="d-none d-md-block">
          <v-col cols="12">
            <div class="line"></div>
          </v-col>
        </v-row>

        <v-row class="mt-10">
          <v-col cols="12" md="4">
            <div class="section-title pb-2 d-none d-md-block">
              {{ $t("payment_section_title_payment_methods") }}
            </div>
            <div class="section-description d-none d-md-block">
              {{ $t("payment_section_payment_method_desc") }}
            </div>
            <div class="section-title payment-section-title pb-2 d-flex justify-space-between d-md-none">
              {{ $t("payment_section_title_payment_methods") }}
              <v-btn
                v-if="!paymentCard"
                class="text-normal"
                text
                small
                :loading="loadingPaymentCard"
                @click="handlePaymentCardAddBtnClick"
              >
                {{ $t("profile_add_more_btn_label") }}
              </v-btn>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div v-if="loaderInitial">
              <v-skeleton-loader
                type="list-item-three-line, card-heading"
              ></v-skeleton-loader>
            </div>
            <div v-else>
              <payment-card v-if="paymentCard" :payment-card="paymentCard">
                <template v-slot:top-right>
                  <div>
                    <v-btn
                      :loading="loadingPaymentCardRemove"
                      text
                      color="#C7311D"
                      class="px-0 py-0"
                      height="0"
                      small
                      @click="handleRemoveBtnClick"
                    >
                      {{ $t("payment_label_remove_card") }}
                    </v-btn>
                  </div>
                </template>
              </payment-card>
              <div v-else>
                <v-alert
                  icon="mdi-shield-lock-outline"
                  prominent
                  text
                  type="info"
                >
                  {{ $t("payment_alert_not_add_card") }}
                </v-alert>
              </div>

              <v-btn
                v-if="!paymentCard"
                class="text-normal mt-5 d-none d-md-block"
                x-large
                color="primary-light-1"
                depressed
                :loading="loadingPaymentCard"
                @click="handlePaymentCardAddBtnClick"
              >
                <v-icon class="mr-3">mdi-plus-circle</v-icon>
                {{ $t("payment_label_add_payment_method") }}
              </v-btn>
            </div>
          </v-col>
        </v-row>

        <v-row class="mt-10">
          <v-col cols="12" md="4">
            <div class="section-title pb-2 d-none d-md-block">
              {{ $t("payment_section_title_coachsome_gift_card") }}
            </div>
            <div class="section-description d-none d-md-block">
              {{ $t("payments_section_desc_gift_card_desc") }}
            </div>
            <div class="section-title payment-section-title pb-2 d-md-none">
              {{ $t("payment_section_title_coachsome_gift_card") }}
              <v-btn class="text-normal" color="primary" dark text small @click="dialog = true">
                {{ $t("profile_add_more_btn_label") }}
              </v-btn>
            </div>
          </v-col>
          <v-col cols="12" md="8" :class="{'text-center' : $vuetify.breakpoint.xsOnly}">
            <div class="balance-title">
              {{ $t("payments_text_curr_credit_balance") }}
            </div>
            <div class="balance mt-2 mb-3 text-uppercase">
              {{ currencyService.toCurrencyByBase(balance) }}
            </div>
            <v-btn
              class="text-normal d-none d-md-block"
              x-large
              color="primary-light-1"
              :loading="loading"
              depressed
              @click="dialog = true"
            >
              <v-icon class="mr-3">mdi-plus-circle</v-icon>
              {{ $t("payments_btn_label_add_gift_card") }}
            </v-btn>
          </v-col>
        </v-row>
        <v-dialog v-model="dialog" width="500">
          <Reedem
            @close="dialog = false"
            @update:balance="handleUpdatedBalance"
          />
        </v-dialog>
      </span>
    </v-container>
  </div>
</template>

<script>
import Reedem from "@/components/artifact/global/pages/payments/Reedem.vue";
import { currencyService } from "@/services";
import { endpoint } from "../api";
import { pathData } from "@/data";
import PaymentCard from "@/components/card/PaymentCard.vue";
import MobileTopNav from '@/components/layout/global/MobileTopNav'

export default {
  layout: "common",
  components: {
    Reedem,
    PaymentCard,
    MobileTopNav
  },
  middleware: ["auth"],
  data() {
    return {
      loadingPaymentCardRemove: false,
      loaderInitial: true,
      loadingPaymentCard: false,
      paymentCard: null,
      loading: false,
      currencyService,
      dialog: false,
      balance: 0.0
    };
  },
  mounted() {
    this.$axios
      .get(endpoint.PAYMENT_CARDS_GET)
      .then(({ data }) => {
        if (data.data) {
          this.paymentCard = {
            name: this.$auth.user.first_name + " " + this.$auth.user.last_name,
            last4: data.data.metadata.last4,
            brand: data.data.metadata.brand,
            expYear: data.data.metadata.exp_year
          };
        }

        // console.log(data);
      })
      .finally(() => {
        this.loaderInitial = false;
      });
    this.loading = true;
    this.$axios
      .get(endpoint.GIFT_BALANCES_GET)
      .then(({ data }) => {
        if (data.data.balance) {
          this.balance = data.data.balance;
        }
      })
      .finally(() => {
        this.loading = false;
      });
  },
  methods: {
    async handleRemoveBtnClick() {
      try {
        this.loadingPaymentCardRemove = true;
        const { data } = await this.$axios.post(
          endpoint.PAYMENT_CARDS_CANCEL_POST
        );
        this.paymentCard = null;
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingPaymentCardRemove = false;
      }
    },
    handleUpdatedBalance(amount) {
      this.dialog = false;
      this.balance = amount;
    },
    async handlePaymentCardAddBtnClick() {
      try {
        this.loadingPaymentCard = true;
        const payload = {
          continueUrl: window.location.href,
          cancelUrl: window.location.href
        };
        const { data } = await this.$axios.post(endpoint.PAYMENT_CARDS_POST, {
          ...payload
        });
        location.href = data.data;
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingPaymentCard = false;
      }
    },
    handleBack(){
      if(this.$auth.hasRole(["coach"])){
        this.$router.push(this.localePath(pathData.coach.profileMenu));
      }else if(this.$auth.hasRole(["athlete"])){
        this.$router.push(this.localePath(pathData.athlete.profileMenu));
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.payments-title{
  font-family: Open Sans;
  font-style: normal;
  font-weight: 300;
  font-size: 36px;
  line-height: 49px;
  /* identical to box height */

  text-transform: uppercase;

  /* Dusty blue */

  color: #15577C;

}
.payment-section-title{
  display: flex;
  justify-content: space-between;
  text-transform: uppercase;
}
.payments {
  background: $body-bg;
  height: 100%;

  .reedem-dialog {
    .redeem-title {
      font-family: $font-family;
      font-weight: bold;
      font-size: 25px;
      line-height: 34px;
      color: #6e7491;
    }

    .field-label {
      font-family: $font-family;
      font-weight: bold;
      font-size: 15px;
      line-height: 20px;
      color: #6e7491;
    }
  }

  .balance-title {
    font-family: $font-family;
    font-weight: normal;
    font-size: 18px;
    line-height: 25px;
    color: #000000;
  }
  .balance {
    font-family: $font-family;
    font-size: 36px;
    line-height: 49px;
    font-weight: bold;
    color: $primary-light-1;
  }
}
</style>
