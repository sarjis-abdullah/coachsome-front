<template>
  <div class="reedem">
    <v-card>
      <v-card-title class="">
        <v-spacer></v-spacer>
        <v-btn icon @click="$emit('close')">
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <div class="redeem-title">
          Redeem gift card
        </div>
        <div class="field-label mt-10 mb-2">
          Gift Card Code
        </div>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="code"
            :rules="rules"
            solo
            placeholder="Insert gift certificate code"
          ></v-text-field>
        </v-form>
      </v-card-text>

      <v-card-actions class="pb-5">
        <v-btn
          :loading="loading"
          color="primary-light-1"
          @click="handleAcceptBtnClick"
          depressed
          class="text-normal ml-2"
        >
          RedeemI accept
        </v-btn>
        <v-btn text class="text-normal" @click="$emit('close')">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { endpoint } from "../../../../../api";
export default {
  props: ["open"],
  data() {
    return {
      valid: true,
      loading: false,
      code: "",
      rules: [v => !!v || "Code is required"]
    };
  },
  watch: {},
  methods: {
    handleAcceptBtnClick() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.$axios
          .post(endpoint.GIFT_TRANSACTIONS_POST, { code: this.code })
          .then(({ data }) => {
            if (data.data.balance) {
              this.$emit("update:balance", data.data.balance);
            }
          })
          .catch(({ response }) => {
            if (response.data.error) {
              this.$toast.error(response.data.error.message);
            }
          })
          .finally(() => {
            this.loading = false;
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.reedem {
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
</style>
