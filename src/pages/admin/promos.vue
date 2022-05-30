<template>
  <v-container fluid :class="{'px-10' : $vuetify.breakpoint.mdAndUp}">
    <mobile-top-nav extraClass="body-bg-secondary" :headerText="$t('pwa_promo_codes')">
      <template v-slot:goBack>
        <v-btn
          icon
          @click="handleBack"
        >
          <v-icon class="common-top-back-icon">mdi-chevron-left</v-icon>
        </v-btn>
      </template>
      <template v-slot:action>
        <span></span>
      </template>
    </mobile-top-nav>

    <v-row>
      <v-col cols="12" class="pb-0 d-flex justify-space-between align-center d-md-none">
        <v-btn block dark color="primary-light-1" @click="handleNewBtnClick()">
          {{$t("chat_create_group_label_create")}} {{$t("package_booking_promo_code_title")}}
        </v-btn>
      </v-col>
    </v-row>



    <v-row class="d-none d-md-block">
      <v-col cols="12" class="pb-0 d-flex justify-space-between align-center">
        <div class="page-title">{{$t('pwa_promo_codes')}}</div>
        <div>
          <v-btn dark color="primary-light-1" @click="handleNewBtnClick()">
          {{$t("chat_create_group_label_create")}} {{$t("package_booking_promo_code_title")}}
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-row class="d-none d-md-block">
      <v-col cols="12">
        <div class="line"></div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          outlined
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-data-table :headers="headers" :items="promoCodes" :search="search">
            <template v-slot:item.type="{ item }">
              <div>
                {{ types.find(type => type.id == item.type).code }}
              </div>
            </template>
            <template v-slot:item.duration="{ item }">
              <div>
                {{
                  durations.find(duration => duration.id == item.duration).code
                }}
              </div>
            </template>
            <template v-slot:item.used="{ item }">
              <div>
                <v-btn text @click="handleTotalUsedClick(item.code)">
                  {{ item.used }}
                </v-btn>
              </div>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>

          <!-- Create Dialog -->
          <v-dialog v-model="dialog" max-width="600" @click:outside="closePromoCodeDialog">
            <v-card>
              <v-card-text>
                <v-container>
                  <v-row class="pt-5">
                    <v-col
                      class="text-left font-color-1 text-h6 text-capitalize"
                    >
                      <FormHeader @close="closePromoCodeDialog" :title="dialogTitle"/>
                    </v-col>
                  </v-row>
                  <v-form ref="form" v-model="valid">
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
                        v-if="!editMode"
                        :loading="isLoading"
                        depressed
                        color="primary-light-1"
                        dark
                        @click="handleCreateBtnClick"
                      >
                        Create
                      </v-btn>
                      <v-btn
                        v-if="editMode"
                        :loading="isLoading"
                        depressed
                        color="primary-light-1"
                        dark
                        @click="handleUpdateBtnClick"
                      >
                        Update
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
          <!-- Create Dialog -->
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { adminPromoCodeApi } from "@/api";
import { currencyService } from "@/services";
import { pathData } from "@/data";
import MobileTopNav from '@/components/layout/global/MobileTopNav'
import FormHeader from '@/components/layout/global/FormHeader'

export default {
  layout: "admin",
  components: {MobileTopNav, FormHeader},
  data() {
    return {
      search: "",
      dialog: false,
      isLoading: false,
      valid: true,
      editMode: false,
      promoCodes: [],
      defaultForm: {
        id: null,
        name: "",
        code: "",
        type: 1,
        currency: null,
        symbol: null,
        discount: null,
        percentageOff: null,
        duration: null
      },
      currencies: [],
      types: [],
      durations: [],
      headers: [
        {
          text: "ID",
          align: "center",
          filterable: false,
          value: "id"
        },
        {
          text: "Promo name",
          align: "start",
          filterable: false,
          value: "name"
        },
        { text: "Promo Code", value: "code" },
        { text: "Discount", value: "discount" },
        { text: "Duration", value: "duration" },
        { text: "Percentage Off", value: "percentageOff" },
        { text: "Total Used", value: "used" },
        { text: "Promo Type", value: "type" },
        { text: "Actions", value: "actions" }
      ]
    };
  },
  watch: {
    '$route': {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        if (this.$route?.query?.promoCodeDialog) {
          this.dialog = true
        }else{
          this.dialog = false
        }
      }
    },
    "defaultForm.currency": function(val) {
      if (val) {
        this.defaultForm.symbol = this.currencies.find(
          item => item.id == val
        ).symbol;
      }
    },
    dialog: function(val) {}
  },
  computed: {
    isFixed() {
      return this.defaultForm.type == 2;
    },
    dialogTitle() {
      return this.editMode ? "Edit Promo Code" : "Create Promo Code";
    }
  },
  created() {
    adminPromoCodeApi(this.$axios)
      .get()
      .then(({ data }) => {
        if (data.currencies.length) {
          this.currencies = data.currencies.map(item => {
            return {
              ...item,
              displayText: item.symbol + " - " + item.name
            };
          });
        }
        if (data.types.length) {
          this.types = data.types.map(item => {
            return {
              id: item.id,
              name: item.name,
              code: item.code
            };
          });
        }
        if (data.durations.length) {
          this.durations = data.durations.map(item => {
            return {
              id: item.id,
              name: item.name,
              code: item.code
            };
          });
        }
        if (data.promoCodes.length) {
          this.promoCodes = data.promoCodes.map(item => {
            return {
              id: item.id,
              name: item.name,
              code: item.code,
              discount: item.discount
                ? currencyService.toCurrency(
                    item.discount,
                    currencyService.getByCode(item.currency)
                  )
                : null,
              currency: item.currency,
              duration: item.duration,
              used: item.totalUsed,
              percentageOff: item.percentageOff,
              type: item.type
            };
          });
        }
        console.log(this.currencies);
      });
  },
  methods: {
    handleBack(){
      this.$router.push(this.localePath(pathData.admin.profileMenu));
    },
    handleTotalUsedClick(code) {
      window.open(
        this.localePath(pathData.admin.trackingCodes(code)),
        "_blank"
      );
    },
    handleUpdateBtnClick() {
      if (this.$refs.form.validate()) {
        this.isLoading = true;
        adminPromoCodeApi(this.$axios)
          .update(this.defaultForm.id, { ...this.defaultForm })
          .then(({ data }) => {
            if (data.promoCode) {
              let index = this.promoCodes.findIndex(
                promoCode => promoCode.id == data.promoCode.id
              );
              if (index != undefined) {
                this.promoCodes.splice(index, 1, {
                  id: data.promoCode.id,
                  name: data.promoCode.name,
                  code: data.promoCode.code,
                  discount: data.promoCode.discount,
                  currency: data.promoCode.currency,
                  duration: data.promoCode.duration,
                  used: data.promoCode.totalUsed,
                  percentageOff: data.promoCode.percentageOff,
                  type: data.promoCode.type
                });
              }
              this.dialog = false;
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
            this.closePromoCodeDialog()
          });
      }
    },
    handleNewBtnClick() {
      this.editMode = false;
      this.dialog = true;
      this.openPromoCodeDialog()
      this.$nextTick(() => {
        // this.$refs.form.reset();
      });
    },
    handleCreateBtnClick() {
      if (this.$refs.form.validate()) {
        this.isLoading = true;
        adminPromoCodeApi(this.$axios)
          .store({ ...this.defaultForm })
          .then(({ data }) => {
            let index = this.promoCodes.findIndex(
              promoCode => promoCode.id == data.promoCode.id
            );
            if (index != undefined) {
              this.promoCodes.splice(0, 0, {
                id: data.promoCode.id,
                name: data.promoCode.name,
                code: data.promoCode.code,
                discount: data.promoCode.discount,
                currency: data.promoCode.currency,
                duration: data.promoCode.duration,
                used: data.promoCode.totalUsed,
                percentageOff: data.promoCode.percentageOff,
                type: data.promoCode.type
              });
            }
            this.dialog = false;
            this.$toast.success("Successfully created a new item");
          })
          .catch(({ response }) => {
            if (response.data.message) {
              this.$toast.error(response.data.message);
            }
          })
          .finally(() => {
            this.isLoading = false;
            this.closePromoCodeDialog()
          });
      }
    },
    editItem(item) {
      this.editMode = true;
      this.dialog = true;
      this.openPromoCodeDialog()
      Object.assign(this.defaultForm, item);
    },
    deleteItem(item) {
      if (confirm("Are you sure?")) {
        this.isLoading = true;
        adminPromoCodeApi(this.$axios)
          .destroy(item.id)
          .then(({ data }) => {
            let index = this.promoCodes.findIndex(
              promoCode => promoCode.id == item.id
            );
            if (index != undefined) {
              this.promoCodes.splice(index, 1);
            }
            this.dialog = false;
            this.$toast.success("Successfully deleted");
          })
          .catch(({ response }) => {
            if (response.data.message) {
              this.$toast.error(response.data.message);
            }
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    },
    closePromoCodeDialog(){
      this.$router.push({query:{}})
    },
    openPromoCodeDialog(){
      const query = {
        ...this.$route.query,
        promoCodeDialog: true
      }
      this.$router.push({query})
    },
  }
};
</script>
<style lang="scss" scoped></style>
