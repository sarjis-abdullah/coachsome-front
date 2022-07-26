<template>
  <div class="gift-page">
    <div>
      <img
        class="gift-hero-image"
        :src="require(`@/assets/images/gift/hero.png`)"
        alt="hero image"
      />
      <div class="d-flex justify-center">
        <div
          :class="[
            'certificate',
            {
              'certificate--mdAndUp': $vuetify.breakpoint.mdAndUp,
              'certificate--smAndDown': $vuetify.breakpoint.smAndDown
            }
          ]"
        >
          <div class="certificate__title">
            {{ $t("gift_title_gift_certificate") }}
          </div>
          <div class="certificate__description">
            {{ $t("gift_description_top") }}
          </div>
        </div>
      </div>
    </div>
    <v-container class="mt-15 mb-15">
      <v-row justify="center">
        <v-col cols="12" md="10" class="text-center">
          <div class="gift-card-title">
            {{ $t("gift_amount_title") }}
          </div>
        </v-col>
        <v-col cols="12" md="10">
          <v-item-group
            v-model="selectedAmount"
            @change="handleGiftAmmountSelect"
          >
            <v-container>
              <v-row>
                <v-col
                  v-for="(amountItem, i) in amountItems"
                  :key="i"
                  cols="12"
                  md="4"
                >
                  <v-item v-slot="{ active, toggle }">
                    <v-card
                      rounded="lg"
                      :class="['gift-card', { 'gift-card--border': !active }]"
                      :color="active ? 'primary-light-2' : ''"
                      height="200"
                      @click="toggle"
                    >
                      <div class="gift-card__check" v-if="active">
                        <v-icon color="white">mdi-check-circle-outline</v-icon>
                      </div>
                      <div
                        :class="[
                          'gift-card__body',
                          { 'primary--text': !active }
                        ]"
                      >
                        {{ currencyService.toCurrency(amountItem.value) }}
                      </div>
                    </v-card>
                  </v-item>
                </v-col>
              </v-row>
            </v-container>
          </v-item-group>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="12" class="text-center">
          <div class="or-text">
            {{ $t("gift_text_or") }}
          </div>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="12" md="4" class="text-center">
          <v-text-field
            v-model="customAmmount"
            class="text-field--gift-card"
            solo
            type="number"
            :label="$t('gift_placeholder_enter_amount')"
            hide-details
            flat
            @click="handleInputClick"
          >
            <template v-slot:append>
              <div>
                {{ ammountCurrency }}
              </div>
            </template>
          </v-text-field>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="12" md="2" class="text-center">
          <v-btn
            class="px-15"
            block
            color="#EDB041"
            v-if="!isCoach"
            @click="handleBuyNowBtnClick"
          >
            {{ $t("gift_label_buy_now") }}
          </v-btn>

          <v-tooltip top v-else>
            <template v-slot:activator="{ on }">
              <div v-on="on">
                <v-btn disabled class="px-15" block color="#EDB041">
                  {{ $t("gift_label_buy_now") }}
                </v-btn>
              </div>
            </template>
            <span>{{ $t("switch_to_athlete_tooltip") }}</span>
          </v-tooltip>



        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { pathData } from "@/data";
import { giftService } from "@/services";
import { currencyService } from "@/services";

export default {
  data() {
    return {
      currencyService,
      selectedAmount: null,
      customAmmount: null,
      ammountCurrency: "",
      amountItems: [
        {
          id: 1,
          value: 100,
          currency: "DKK"
        },
        {
          id: 2,
          value: 500,
          currency: "DKK"
        },
        {
          id: 3,
          value: 1000,
          currency: "DKK"
        }
      ]
    };
  },
  mounted() {
    this.ammountCurrency = this.currencyService.currentCurrencyCode()
    giftService.destroyGift();
  },
  computed:{
    isCoach() {
      return this.hasRole(["coach"]);
    },
  },
  methods: {
    hasRole(roles = []) {
      return this.$auth.hasRole(roles);
    },
    handleGiftAmmountSelect() {
      this.customAmmount = null;
    },
    handleInputClick() {
      this.selectedAmount = null;
    },
    handleBuyNowBtnClick() {
      if (this.selectedAmount != null) {
        const { value } = this.amountItems[this.selectedAmount];
        this.$router.push(
          this.localePath(
            pathData.pages.giftCheckout +
              "?amount=" +
              value +
              "&currency=" +
              this.ammountCurrency
          )
        );
        // console.log("selectedAmount");
      }
      if (this.customAmmount) {
        this.$router.push(
          this.localePath(
            pathData.pages.giftCheckout +
              "?amount=" +
              this.customAmmount +
              "&currency=" +
              this.ammountCurrency
          )
        );
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.gift-page {
  background: $body-bg;
  height: 100%;
  .certificate {
    background: #f7fafc;
    opacity: 0.95;
    margin-top: -150px;
    &--mdAndUp {
      padding: 100px 80px;
      max-width: 70%;
    }
    &--smAndDown {
      padding: 5px;
    }
    box-shadow: 0px 10px 20px rgba(159, 174, 194, 0.15);
    border-radius: 24px;
    &__title {
      font-family: $font-family;
      font-weight: bold;
      font-size: 48px;
      line-height: 65px;
      text-align: center;
      color: $primary-light-1;
    }
    &__description {
      font-family: $font-family;
      font-weight: bold;
      font-size: 25px;
      line-height: 34px;
      text-align: center;
      color: $primary-light-2;
    }
  }
  .gift-hero-image {
    width: 100%;
  }
  .or-text {
    font-family: $font-family;
    font-weight: bold;
    font-size: 24px;
    line-height: 33px;
    color: #6f8098;
  }
  .text-field--gift-card {
    border: 5px solid #cad5e1;
    box-sizing: border-box;
    border-radius: 12px;
  }
  .gift-card-title {
    font-family: $font-family;
    font-weight: bold;
    font-size: 24px;
    line-height: 33px;
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
