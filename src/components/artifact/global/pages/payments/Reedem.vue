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
          {{ $t('payment_redeem_title') }}
        </div>
        <div class="field-label mt-10 mb-2">
          {{ $t("payment_redeem_code_title") }}
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
          {{ $t("payment_redeem_btn_label_redeem_accept") }}
        </v-btn>
        <v-btn text class="text-normal" @click="$emit('close')">
           {{ $t("payment_redeem_btn_label_cancel") }}
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
      rules: []
    };
  },
  watch: {},
  mounted() {
    this.rules= [
      v => !!v || this.$i18n.t("payment_redeem_validation_code_is_required")
    ]
  },
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
