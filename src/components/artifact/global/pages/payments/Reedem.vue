<template>
  <div class="reedem">
    <v-card class="bg-1" :flat="!$vuetify.breakpoint.mdAndUp">
      <v-card-title v-if="$vuetify.breakpoint.mdAndUp" class="px-5 pt-4 pb-2 hidden-sm-and-down">
        <v-btn icon @click="close">
          <v-icon class="font-color-1">
            mdi-close
          </v-icon>
        </v-btn>
      </v-card-title>
      <div class="hidden-md-and-up">
        <MobileTopNav :headerText="$t('payment_redeem_title')">
          <template v-slot:goBack>
            <v-btn icon @click="close">
              <v-icon class="common-top-back-icon">mdi-chevron-left</v-icon>
            </v-btn>
          </template>
        </MobileTopNav>
      </div>

      <v-card-text class="px-6.5" :class="!$vuetify.breakpoint.mdAndUp && 'pt-8.5'">
        <div v-if="$vuetify.breakpoint.mdAndUp" class="redeem-title font-color-1">
          {{ $t('payment_redeem_title') }}
        </div>
        <div class="field-label mt-4 mb-2 font-color-1">
          {{ $t("payment_redeem_code_title") }}
        </div>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="code"
            :rules="rules"
            outlined
            dense
            class="font-color-2"
            :placeholder="$t('payment_placeholder_insert_certificate')"
            hide-details
          ></v-text-field>
        </v-form>
      </v-card-text>

      <v-card-actions class="pb-6 px-6.5">
        <v-btn
          :loading="loading"
          color="primary-light-1"
          @click="handleAcceptBtnClick"
          depressed
          :block="!$vuetify.breakpoint.mdAndUp"
          class="text-normal white--text"
        >
          {{ $t("payment_redeem_btn_label_redeem_accept") }}
        </v-btn>
        <!-- <v-btn text class="text-normal" @click="$emit('close')">
           {{ $t("payment_redeem_btn_label_cancel") }}
        </v-btn> -->
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { endpoint } from "../../../../../api";
import MobileTopNav from "@/components/layout/global/MobileTopNav";
export default {
  components: {
    MobileTopNav,
  },
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
    },
    close(){
      if (this.$refs.form) {
        this.$refs.form.reset()
      }
      this.$emit('close')
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
  }

  .field-label {
    font-family: $font-family;
    font-weight: bold;
    font-size: 15px;
    line-height: 20px;
  }
  .px-6\.5 {
    padding-left: 26px;
    padding-right: 26px;
  }
  .px-5 {
    padding: 0 20px;
  }
  .pt-8\.5{
    padding-top: 34px;
  }
}
</style>
