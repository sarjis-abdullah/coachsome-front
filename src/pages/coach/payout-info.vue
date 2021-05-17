<template>
  <div class="setting-page">
    <v-container>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col offset-md="2">
            <v-row>
              <v-col cols="12" class="pb-0">
                <div class="page-title">
                  {{ $t("payout_info_page_title") }}
                </div>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <div class="line"></div>
              </v-col>
            </v-row>

            <v-row class="invoice-identity">
              <v-col cols="12" md="4">
                <div class="section-title">
                  {{ $t("payout_info_section_title_invoice_identity") }}
                </div>
                <div class="section-description">
                  {{ $t("payout_info_section_desc_invoice_identity") }}
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <!-- Private person / Company -->
                <v-row>
                  <v-col cols="12" md="6">
                    <v-radio-group v-model="form.type">
                      <v-radio
                        dense
                        :label="$t('payout_info_input_label_private_person')"
                        value="personal"
                        color="primary-light-1"
                      ></v-radio>
                      <v-radio
                        dense
                        :label="$t('payout_info_radio_input_label_company')"
                        value="company"
                        color="primary-light-1"
                      ></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
                <span v-if="!isPersonal">
                  <v-row align="center">
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="form.vatNumber"
                        solo
                        dense
                        :label="$t('payout_info_input_label_vat_number')"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="d-flex align-center">
                      <v-switch
                        v-model="form.isVatRegistered"
                        class="pb-5"
                        dense
                        color="primary-light-1"
                        :label="$t('payout_info_input_label_is_vat_reg')"
                      ></v-switch>
                      <img
                        class="pb-4 pl-1"
                        :src="require('@/assets/images/icons/information.svg')"
                        alt="Help Icon"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="12">
                      <v-text-field
                        v-model="form.companyName"
                        solo
                        dense
                        :label="$t('setting_hint_company_name')"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="12">
                      <v-row>
                        <v-col cols="12">
                          <v-autocomplete
                            autocomplete="off"
                            v-model="form.cca2"
                            @change="handleCountryChange"
                            :items="form.countryList"
                            item-text="displayName"
                            item-value="code"
                            solo
                            dense
                            hide-no-data
                            hide-details
                            append-icon="expand_more"
                            :label="$t('setting_input_hint_country')"
                          ></v-autocomplete>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12">
                          <div v-show="!isTheCountryCodeDk">
                            <v-text-field
                              v-model="form.address"
                              solo
                              dense
                              :placeholder="$t('geography_placeholder_address')"
                            ></v-text-field>
                          </div>
                          <div
                            v-show="isTheCountryCodeDk"
                            class="autocomplete-container"
                          >
                            <v-text-field
                              v-model="form.address"
                              solo
                              dense
                              ref="input"
                              type="search"
                              :placeholder="$t('geography_placeholder_address')"
                              id="dawa-autocomplete-input"
                            ></v-text-field>
                          </div>
                        </v-col>
                      </v-row>
                      <v-row class="py-0">
                        <v-col cols="12" md="6">
                          <v-text-field
                            autocomplete="off"
                            v-model="form.zipCode"
                            dense
                            solo
                            :label="$t('setting_input_hint_zip_code')"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            autocomplete="off"
                            v-model="form.city"
                            dense
                            solo
                            :label="$t('setting_input_hint_city')"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </span>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="4">
                <div class="section-title pb-2">
                  {{ $t("payout_info_section_title_acc_for_payouts") }}
                </div>
                <div class="section-description">
                  {{ $t("payout_info_section_desc_acc_for_payouts") }}
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <v-row>
                  <v-col cols="12" md="12" class="pb-0">
                    <div class="input-title">
                      {{ $t("payout_info_input_title_acc_holder_name") }}
                    </div>
                    <v-text-field
                      v-model="form.accHolderName"
                      dense
                      solo
                      :label="$t('payout_info_input_lable_acc_holder_name')"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" class="pt-0">
                    <div class="input-title">
                      {{ $t("payout_info_input_title_bank") }}
                    </div>
                    <v-text-field
                      v-model="form.bankName"
                      dense
                      solo
                      :label="$t('payout_info_input_label_name_of_bank')"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="5">
                    <div class="input-title">
                      {{ $t("payout_info_input_title_reg") }}
                    </div>
                    <v-text-field
                      v-model="form.registration"
                      dense
                      solo
                      label="0000"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="7">
                    <div class="input-title">
                      {{ $t("payout_info_input_title_account") }}
                    </div>
                    <v-text-field
                      v-model="form.account"
                      dense
                      solo
                      label="000 000 0000"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" class="text-right">
                    <v-btn
                      @click.stop="handleSaveBtnClick"
                      color="primary-light-1"
                      dark
                    >
                      {{ $t("pyout_info_btn_label_save_info") }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import { countryApi, coachPayoutInformationApi } from "@/api";
export default {
  layout: "coach-no-drawer",
  components: {},
  data() {
    return {
      valid: false,
      form: {
        type: "",
        vatNumber: "",
        isVatRegistered: "",
        companyName: "",
        address: "",
        zipCode: "",
        city: "",
        lat: "",
        long: "",
        cca2: "",
        countryList: [],
        bankName: ""
      },
      rule: {
        vatNumber: [v => !!v || "Vat number is required"],
        companyName: [v => !!v || "Company name is required"],
        address: [v => !!v || "Address name is required"],
        zipCode: [v => !!v || "Address name is required"],
        city: [v => !!v || "City name is required"],
        cca2: [v => !!v || "Country is required"]
      }
    };
  },
  watch: {
    "form.cca2": function() {}
  },
  computed: {
    isTheCountryCodeDk() {
      return this.form.cca2 == "DK";
    },
    isPersonal() {
      return this.form.type == "personal";
    }
  },
  created() {
    this.fetchPayoutInfo();
    this.fetchCountryList();
  },
  mounted() {
    let dawaAutocomplete2 = require("dawa-autocomplete2");
    let inputElm = document.getElementById("dawa-autocomplete-input");

    dawaAutocomplete2.dawaAutocomplete(inputElm, {
      select: selected => {
        this.form.long = selected.data.x;
        this.form.lat = selected.data.y;
        this.form.zipCode = selected.data.postnr;
        this.form.city = selected.data.postnrnavn;
        this.form.address = selected.tekst;
      }
    });
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    handleCountryChange() {
      this.form.long = "";
      this.form.lat = "";
      this.form.zipCode = "";
      this.form.city = "";
      this.form.address = "";
    },
    async fetchPayoutInfo() {
      try {
        const { data } = await coachPayoutInformationApi(this.$axios).get();
        if (data.data) {
          this.form.type = data.data.isPersonal ? "personal" : "company";
          this.form.companyName = data.data.companyName;
          this.form.vatNumber = data.data.vatNumber;
          this.form.isVatRegistered = data.data.isVatRegistered;
          this.form.accHolderName = data.data.accHolderName;
          this.form.cca2 = data.data.cca2;
          this.form.address = data.data.address;
          this.form.zipCode = data.data.zipCode;
          this.form.city = data.data.city;
          this.form.bankName = data.data.bankName;
          this.form.registration = data.data.registration;
          this.form.account = data.data.account;
        }
      } catch (error) {
        this.$toast.error(error.response.data.errors[0]);
      } finally {
      }
    },
    async handleSaveBtnClick() {
      try {
        let payload = {
          isPersonal: this.form.type == "personal" ? 1 : 0,
          isCompany: this.form.type == "company" ? 1 : 0,
          companyName: this.form.companyName,
          vatNumber: this.form.vatNumber,
          isVatRegistered: this.form.isVatRegistered,
          accHolderName: this.form.accHolderName,
          cca2: this.form.cca2,
          address: this.form.address,
          zipCode: this.form.zipCode,
          city: this.form.city,
          bankName: this.form.bankName,
          registration: this.form.registration,
          account: this.form.account
        };
        const { data } = await coachPayoutInformationApi(this.$axios).save(
          payload
        );
        if (data.data) {
          this.$toast.success(this.$i18n.t("payout_info_success_msg_updated"));
        }
      } catch (error) {
        this.$toast.error(error.response.data.errors[0]);
      } finally {
      }
    },
    async fetchCountryList() {
      try {
        let { data } = await countryApi(this.$axios).get();
        if (data.data.length) {
          data.data.forEach(item => {
            this.form.countryList.push(item);
          });
        }
      } catch (error) {
        console.log(error);
        // this.$toast.error(error.response.data.errors[0]);
      }
    }
  }
};
</script>

<style lang="scss">
.setting-page {
  .input-title {
    color: #49556a;
  }
  .invoice-identity,
  .notification {
    .v-input .v-input__slot {
      box-shadow: none;
      margin-bottom: 0px !important;
      .v-label {
        color: #49556a !important;
      }
    }
  }

  .dawa-autocomplete-suggestions {
    margin: 0.3em 0 0 0;
    padding: 0;
    text-align: left;
    border-radius: 0.3125em;
    background: #fcfcfc;
    box-shadow: 0 0.0625em 0.15625em rgba(0, 0, 0, 0.15);
    position: absolute;
    left: 0;
    right: 0;
    z-index: 9999;
    overflow-y: auto;
    box-sizing: border-box;
  }

  .dawa-autocomplete-suggestions .dawa-autocomplete-suggestion {
    margin: 0;
    list-style: none;
    cursor: pointer;
    padding: 0.4em 0.6em;
    color: #333;
    border: 0.0625em solid #ddd;
    border-bottom-width: 0;
  }
  value
    .dawa-autocomplete-suggestions
    .dawa-autocomplete-suggestion:first-child {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
  }

  .dawa-autocomplete-suggestions .dawa-autocomplete-suggestion:last-child {
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
    border-bottom-width: 0.0625em;
  }

  .dawa-autocomplete-suggestions .dawa-autocomplete-suggestion.dawa-selected,
  .dawa-autocomplete-suggestions .dawa-autocomplete-suggestion:hover {
    background: #f0f0f0;
  }
}
</style>
