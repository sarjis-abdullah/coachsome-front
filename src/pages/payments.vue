<template>
  <div class="payments">
    <v-container fluid class="page-container view-profile__wrapper">
      <v-row>
        <v-col cols="12" class="pb-0">
          <div class="page-title">
            {{ $t("page_title_payments") }}
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <div class="line"></div>
        </v-col>
      </v-row>

      <v-row class="mt-10">
        <v-col cols="12" md="4">
          <div class="section-title pb-2">
            {{ $t("payment_section_title_coachsome_gift_card") }}
          </div>
          <div class="section-description">
            {{ $t("payments_section_desc_gift_card_desc") }}
          </div>
        </v-col>
        <v-col cols="12" md="8">
          <div class="balance-title">
            {{ $t("payments_text_curr_credit_balance") }}
          </div>
          <div class="balance mt-2 mb-3">
            {{ currencyService.toCurrencyByBase(balance) }}
          </div>
          <v-btn
            class="text-normal"
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
    </v-container>
  </div>
</template>

<script>
import Reedem from "@/components/artifact/global/pages/payments/Reedem.vue";
import { currencyService } from "@/services";
import { endpoint } from "../api";

export default {
  components: {
    Reedem
  },
  middleware: ["auth"],
  data() {
    return {
      loading: false,
      currencyService,
      dialog: false,
      balance: 0.0
    };
  },
  mounted() {
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
    handleUpdatedBalance(amount) {
      this.dialog = false;
      this.balance = amount;
    }
  }
};
</script>

<style lang="scss" scoped>
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
