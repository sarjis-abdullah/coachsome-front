<template>
  <div>
    <v-card
      class="payment-card rounded-lg"
      max-width="300"
      color="#FCFDFE"
      elevation="3"
      v-if="paymentCard"
      flat
    >
      <v-card-title>
        <img
          v-if="paymentCard.brand == 'mastercard'"
          :src="require(`@/assets/images/booking/mastercard.svg`)"
          height="50px"
          width="50px"
        />
        <img
          v-if="paymentCard.brand == 'visa'"
          :src="require(`@/assets/images/booking/visa.svg`)"
          height="50px"
          width="50px"
        />
        <v-spacer></v-spacer>
        <slot name="top-right">
          <div></div>
        </slot>
      </v-card-title>

      <v-card-text class="text-h5 font-weight-bold"> </v-card-text>

      <v-card-actions>
        <div>
          <div class="payment-card__holder">
            {{ paymentCard.name }}
          </div>
          <div class="payment-card__code">
            **** **** **** {{ paymentCard.last4 }}
          </div>
        </div>
        <v-spacer></v-spacer>
        <div class="payment-card__year">
          {{ paymentCard.expYear }}
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    loadingRemoveBtn: {
      type: Boolean
    },
    paymentCard: {
      type: Object
    }
  }
};
</script>

<style lang="scss" scoped>
.payment-card {
  &__holder {
    font-family: $font-family;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    color: #15577c;
  }
  &__code {
    font-family: $font-family;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    color: #15577c;
  }
  &__year {
    font-family: $font-family;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    color: #15577c;
  }
}
</style>
