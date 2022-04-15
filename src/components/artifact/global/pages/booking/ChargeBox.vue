<template>
  <div
    class="charge-box"
    :style="{
      borderImage: `url(${require('@/assets/images/border-staircase.svg')}) 30 space`
    }"
  >
    <div class="charge-box__item">
      <div class="charge-box__item-left">
        {{ $t("charge_box_title") }}
      </div>
      <div class="charge-box__item-right">
        {{ currencyService.toCurrency(chargeInfo.priceForPackage) }}
      </div>
    </div>
    <div class="charge-box__item">
      <div class="charge-box__item-left">
        {{ $t("booking_charge_box_service_fee_txt") }}
        <v-tooltip right max-width="250">
          <template v-slot:activator="{ on }">
            <v-icon x-small color="#15577C" v-on="on">help_outline</v-icon>
          </template>
          <span>{{ $t("booking_charge_box_service_fee_help") }}</span>
        </v-tooltip>
      </div>
      <div class="charge-box__item-right">
        {{ currencyService.toCurrency(chargeInfo.serviceFee) }}
      </div>
    </div>

    <div class="charge-box__item promo" v-if="promoCode.valid">
      <div class="charge-box__item-left">
        <div class="promo-code">
          {{ promoCode.value }}
        </div>
      </div>
      <div class="charge-box__item-right promo-amount">
        - {{ currencyService.toCurrency(promoCode.amount) }}
      </div>
    </div>

    <!-- Gift Card -->
    <div class="charge-box__item gift-card-item pl-1 py-1"  v-if="chargeInfo.giftPayableAmount">
      <div class="charge-box__item-left white--text stroke">
        {{ $t("Gift balance") }}
      </div>
      <div class="charge-box__item-right stroke white--text pr-1">
        - {{ currencyService.toCurrency(chargeInfo.giftPayableAmount) }}
      </div>
    </div>

    <div class="charge-box__item" v-if="campPackage">
      <div class="charge-box__item-left">
        {{ $t("booking_charge_box_total_per_person_txt") }}
      </div>
      <div class="charge-box__item-right">
        {{ currencyService.toCurrency(chargeInfo.totalPerPerson) }}
      </div>
    </div>

    <!-- Total -->
    <div class="charge-box__item">
      <div class="charge-box__item-left stroke">
        {{ $t("booking_charge_box_total") }}
      </div>
      <div class="charge-box__item-right stroke">
        {{ currencyService.toCurrency(chargeInfo.total) }}
      </div>
    </div>
  </div>
</template>

<script>
import { currencyService } from "@/services";

export default {
  props: {
    campPackage: Boolean,
    chargeInfo: Object,
    promoCode: Object
  },
  data() {
    return {
      currencyService
    };
  }
};
</script>

<style lang="scss" scoped>
.charge-box {
  padding: 20px 10px 35px 10px;
  box-shadow: -1px 0px 0px 0px #6f8098, 1px 0px 0px 0px #6f8098;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  .gift-card-item{
    background: #FAA0A0;
  }
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
</style>
