<template>
  <div>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4">
            <div class="section-title pb-2">{{ $t("text_title") }}</div>
            <div class="section-description">
              {{ $t("default_package_title_desc") }}
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              solo
              :error-messages="titleErrors"
              @input="$v.form.title.$touch()"
              v-model="form.title"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4">
            <div class="section-title pb-2">{{ $t("text_description") }}</div>
            <div class="section-description">
              {{ $t("default_package_desc_content") }}
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <v-textarea
              solo
              :counter="counter"
              v-model="form.description"
              :error-messages="descriptionErrors"
              @input="$v.form.description.$touch()"
            ></v-textarea>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4">
            <div class="section-title pb-2">{{ $t("text_session") }}</div>
            <div class="section-description">
              {{ $t("default_package_session_desc") }}
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <v-row>
              <v-col cols="8">
                <v-text-field
                  solo
                  v-model="form.session"
                  :error-messages="sessionErrors"
                  @input="$v.form.session.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="4" class="mt-3">
                <span class="input-ext mt-3 ml-2 primary-light-1--text">{{
                  $t("text_sessions")
                }}</span>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4">
            <div class="section-title pb-2">
              {{ $t("text_time_per_session") }}
            </div>
            <div class="section-description">
              {{ $t("time_per_session_desc") }}
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <v-row>
              <v-col cols="8">
                <v-text-field
                  solo
                  v-model="form.timePerSession"
                  :error-messages="timePerSessionErrors"
                  @input="$v.form.timePerSession.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="4" class="mt-3">
                <span class="ml-2 primary-light-1--text">{{
                  $t("text_minutes")
                }}</span>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4">
            <div class="section-title pb-2">{{ $t("text_discount") }}</div>
            <div class="section-description">
              {{ $t("default_package_discount_desc") }}
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <v-row>
              <v-col cols="8">
                <v-text-field
                  solo
                  v-model="form.discount"
                  :error-messages="discountErrors"
                  @input="$v.form.discount.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="4" class="mt-3">
                <span class="ml-2 primary-light-1--text">%</span>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4">
            <div class="section-title pb-2">{{ $t("text_price") }}</div>
            <div class="section-description">
              {{ $t("default_package_price_desc") }}
            </div>
          </v-col>
          <v-col cols="12" md="8">
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  solo
                  v-model="form.price"
                  ref="priceTextField"
                  :readonly="!form.isSpecialPrice"
                  :error-messages="priceErrors"
                  @input="$v.form.price.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4" class="mt-4">
                <span class="ml-2 primary-light-1--text">{{
                  $t("currency_denmark")
                }}</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-switch
                  color="primary-light-1"
                  :label="$t('package_label_special_price')"
                  v-model="form.isSpecialPrice"
                ></v-switch>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="1">
            <v-btn
              depressed
              block
              color="primary-light-1"
              dark
              @click="save()"
              >{{ $t("profile_save_btn") }}</v-btn
            >
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import {
  required,
  maxLength,
  numeric,
  decimal
} from "vuelidate/lib/validators";
import { coachPackageApi } from "@/api";
import { packageHelper, priceHelper } from "@/helper";

export default {
  props: ["rate"],

  data() {
    return {
      counter: 1000,
      form: {
        title: "",
        description: "",
        session: null,
        timePerSession: null,
        discount: null,
        transportFee: null,
        price: null,
        isSpecialPrice: false
      }
    };
  },
  validations: {
    form: {
      title: {
        required,
        maxLength: maxLength(50)
      },
      description: {
        required,
        maxLength: maxLength(1000)
      },
      session: {
        required,
        number: numeric
      },
      timePerSession: {
        required,
        number: numeric
      },
      discount: {
        decimal: decimal
      },
      transportFee: {
        decimal: decimal
      },
      price: {
        required,
        decimal: decimal
      }
    }
  },
  methods: {
    getPrice() {
      let price = 0.0;
      if (!this.form.isSpecialPrice) {
        price = priceHelper.calculatePackagePrice(
          this.form.session,
          this.form.timePerSession,
          this.rate
        );
      } else {
        price = this.rate;
      }
      return price;
    },
    save() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let paylod = {
          title: this.form.title,
          description: this.form.description,
          categoryId: packageHelper.getDefaultPackageId(),
          session: this.form.session,
          timePerSession: this.form.timePerSession,
          discount: this.form.discount,
          transportFee: this.form.transportFee,
          price: this.form.price,
          isSpecialPrice: this.form.isSpecialPrice
        };
        coachPackageApi(this.$axios)
          .savePackage(paylod)
          .then(response => {
            if (response.data.status == "success") {
              this.resetForm();
              this.$emit("package-created", response.data.package);
              this.setPackageProgress(response.data.progress);
              this.$toast.success(response.data.message);
            }
          })
          .catch(() => {
          });
      }
    },
    setPackageProgress(val) {
      this.$store.dispatch("pageProgress/setPackageProgress", val);
    },
    resetForm() {
      this.form.title = "";
      this.form.description = "";
      this.form.session = null;
      this.form.timePerSession = null;
      this.form.discount = null;
      this.form.transportFee = null;
      this.form.price = null;
      this.form.isSpecialPrice = null;
    }
  },
  computed: {
    titleErrors() {
      const errors = [];
      if (!this.$v.form.title.$dirty) return errors;
      !this.$v.form.title.required &&
        errors.push(this.$i18n.t("package_title_validation_required"));
      !this.$v.form.title.maxLength &&
        errors.push(this.$i18n.t("package_title_validation_max_char"));
      return errors;
    },
    descriptionErrors() {
      const errors = [];
      if (!this.$v.form.description.$dirty) return errors;
      !this.$v.form.description.required &&
        errors.push("Description is required.");
      !this.$v.form.description.maxLength &&
        errors.push("Maximum 1000 character is allowed.");

      return errors;
    },
    sessionErrors() {
      const errors = [];
      if (!this.$v.form.session.$dirty) return errors;
      !this.$v.form.session.required && errors.push("Session is required.");
      !this.$v.form.session.number &&
        errors.push("Only number value is allowed");
      return errors;
    },
    timePerSessionErrors() {
      const errors = [];
      if (!this.$v.form.timePerSession.$dirty) return errors;
      !this.$v.form.timePerSession.required &&
        errors.push("Time per sesion is required.");
      !this.$v.form.timePerSession.number &&
        errors.push("Only number value is allowed");
      return errors;
    },
    priceErrors() {
      const errors = [];
      if (!this.$v.form.price.$dirty) return errors;
      !this.$v.form.price.required &&
        errors.push(
          this.$i18n.t("package_validation_price_for_full_package_req")
        );
      !this.$v.form.price.decimal &&
        errors.push("Only number value is allowed");
      return errors;
    },
    discountErrors() {
      const errors = [];
      if (!this.$v.form.discount.$dirty) return errors;
      !this.$v.form.discount.decimal &&
        errors.push("Only numeric value is allowed");
      return errors;
    },
    transportFeeErrors() {
      const errors = [];
      if (!this.$v.form.transportFee.$dirty) return errors;
      !this.$v.form.transportFee.decimal &&
        errors.push("Only number value is allowed");
      return errors;
    }
  },
  created() {
    this.form.price = this.rate;
  },
  watch: {
    rate() {
      this.form.price = this.getPrice();
    },
    "form.session": function() {
      this.form.price = this.getPrice();
    },
    "form.timePerSession": function() {
      this.form.price = this.getPrice();
    },
    "form.isSpecialPrice": function(val) {
      if (!val) {
        this.form.price = this.getPrice();
      } else {
        const el = this.$refs.priceTextField;
        el.focus();
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
