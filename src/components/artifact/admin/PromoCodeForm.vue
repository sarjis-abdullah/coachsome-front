<template>
  <v-card :flat="!$vuetify.breakpoint.mdAndUp" class="bg-1">
    <v-card-text>
      <v-container>
        <v-row v-if="$vuetify.breakpoint.mdAndUp" class="pt-5">
          <v-col class="text-left font-color-1 text-h6 text-capitalize">
            <FormHeader @close="closePromoCodeDialog" :title="dialogTitle" />
          </v-col>
        </v-row>
        <mobile-top-nav extraClass="body-bg-secondary" :headerText="dialogTitle">
            <template v-slot:goBack>
                <v-btn
                icon
                @click="closePromoCodeDialog"
                >
                <v-icon class="common-top-back-icon">mdi-chevron-left</v-icon>
                </v-btn>
            </template>
            <template v-slot:action>
                <span></span>
            </template>
        </mobile-top-nav>
        <v-form ref="form" v-model="valid" :class="!$vuetify.breakpoint.mdAndUp && 'pt-7'">
          <!-- Promo name -->
          <v-row>
            <v-col cols="12">
              <div class="subtitle-2 pb-2">
                Promo name (For tracking purpose)
              </div>
              <v-text-field
                :rules="[v => !!v || 'Name is required']"
                dense
                v-model="defaultForm.name"
                label="Enter a promo name"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- Promo code -->
          <v-row>
            <v-col cols="12">
              <div class="subtitle-2 pb-2">
                Promo code (the actual code)
              </div>
              <v-text-field
                :rules="[v => !!v || 'Promo code is required']"
                dense
                v-model="defaultForm.code"
                label="Enter a promo code name"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- Promotion type -->
          <v-row>
            <v-col cols="12">
              <div class="subtitle-2">Promotion type</div>
              <v-radio-group v-model="defaultForm.type" hide-details>
                <v-radio
                  v-for="item in types"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  color="primary-light-1"
                  :rules="[v => !!v || 'Promotion type is required']"
                ></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <!-- currency & discount ammount -->
          <v-row v-if="isFixed">
            <v-col>
              <div class="subtitle-2 pb-2">Currency</div>
              <v-select
                v-model="defaultForm.currency"
                :items="currencies"
                item-text="displayText"
                item-value="id"
                outlined
                dense
                label="Select currency"
                :rules="[v => !!v || 'Currency is required']"
              ></v-select>
            </v-col>
            <v-col>
              <div class="subtitle-2 pb-2">
                Discount amount
              </div>
              <v-text-field
                type="number"
                dense
                v-model="defaultForm.discount"
                label="Select amount"
                outlined
                min="0"
                :rules="[v => !!v || 'Discount amount is required']"
              >
                <template v-slot:prepend-inner>
                  <div>
                    {{ defaultForm.symbol }}
                  </div>
                </template>
              </v-text-field>
            </v-col>
          </v-row>

          <!-- Percentage off -->
          <v-row v-if="!isFixed">
            <v-col cols="12">
              <div class="subtitle-2 pb-2">Percentage off</div>
              <v-text-field
                type="number"
                :rules="[v => !!v || 'Percentage off is required']"
                min="0"
                max="100"
                dense
                v-model="defaultForm.percentageOff"
                label="Select discount percentage"
                outlined
              >
                <template v-slot:append>
                  <div>
                    %
                  </div>
                </template>
              </v-text-field>
            </v-col>
          </v-row>

          <!-- Duration -->
          <v-row>
            <v-col cols="12">
              <div class="subtitle-2 pb-2">Duration</div>
              <v-select
                v-model="defaultForm.duration"
                :rules="[v => !!v || 'Duration is required']"
                dense
                :items="durations"
                item-text="name"
                item-value="id"
                label="Select duration"
                outlined
              >
              </v-select>
            </v-col>
          </v-row>
        </v-form>
        <v-row>
          <v-col>
            <v-btn
              :loading="isLoading"
              depressed
              color="primary-light-1"
              dark
              :block="!$vuetify.breakpoint.mdAndUp"
              @click="!editMode ? handleCreateBtnClick() : handleUpdateBtnClick()"
            >
              {{editMode ? 'Update' : 'Create'}}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import { adminPromoCodeApi } from "@/api";
import FormHeader from "@/components/layout/global/FormHeader";
import MobileTopNav from "@/components/layout/global/MobileTopNav";
const formItem = {
  id: null,
  name: "",
  code: "",
  type: 1,
  currency: null,
  symbol: null,
  discount: null,
  percentageOff: null,
  duration: null
};
export default {
  components: {
    FormHeader,
    MobileTopNav
  },
  props: {
    editMode: {
      type: Boolean,
      default: false
    },
    types: {
      type: Array,
      default: () => []
    },
    durations: {
      type: Array,
      default: () => []
    },
    currencies: {
      type: Array,
      default: () => []
    },
    editableFormData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      search: "",
      dialog: false,
      isLoading: false,
      valid: true,
      promoCodes: [],
      defaultForm: JSON.parse(JSON.stringify(formItem)),
      resetForm: JSON.parse(JSON.stringify(formItem))
    };
  },
  computed: {
    isFixed() {
      return this.defaultForm.type == 2;
    },
    dialogTitle() {
      return this.editMode ? "Edit Promo Code" : "Create Promo Code";
    }
  },
  watch: {
    "defaultForm.currency": function(val) {
      if (val) {
        this.defaultForm.symbol = this.currencies.find(
          item => item.id == val
        ).symbol;
      }
    },
    editableFormData: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        if (
          this.editableFormData &&
          Object.keys(this.editableFormData).length
        ) {
          this.defaultForm = JSON.parse(JSON.stringify(this.editableFormData));
        }
      }
    }
  },
  methods: {
    handleUpdateBtnClick() {
      if (this.$refs.form.validate()) {
        this.isLoading = true;
        adminPromoCodeApi(this.$axios)
          .update(this.defaultForm.id, { ...this.defaultForm })
          .then(({ data }) => {
            if (data.promoCode) {
              this.$emit("updatePromoInUpdateMode", data);
              this.$toast.success("Successfully updated");
            }
          })
          .catch(({ response }) => {
            if (response.data.message) {
              this.$toast.error(response.data.message);
            }
          })
          .finally(() => {
            this.isLoading = false;
            this.closePromoCodeDialog();
          });
      }
    },
    handleCreateBtnClick() {
      if (this.$refs.form.validate()) {
        this.isLoading = true;
        adminPromoCodeApi(this.$axios)
          .store({ ...this.defaultForm })
          .then(({ data }) => {
            this.$emit("updatePromoInCreateMode", data);

            this.$toast.success("Successfully created a new item");
          })
          .catch(({ response }) => {
            if (response.data.message) {
              this.$toast.error(response.data.message);
            }
          })
          .finally(() => {
            this.isLoading = false;
            this.closePromoCodeDialog();
          });
      }
    },
    closePromoCodeDialog() {
      this.defaultForm = JSON.parse(JSON.stringify(this.resetForm))
      if (this.$refs.form) {
        this.$refs.form.resetValidation();
      }
      this.$emit("closePromoCodeDialog");
    }
  }
};
</script>

<style lang="less" scoped></style>
