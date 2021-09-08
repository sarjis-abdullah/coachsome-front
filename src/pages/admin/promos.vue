<template>
  <v-container fluid class="px-10">
    <v-row class="mt-5">
      <v-col cols="12" class="pb-0 d-flex justify-space-between align-center">
        <div class="page-title">Promo Codes</div>
        <div>
          <v-btn dark color="primary-light-1" @click="handleNewBtnClick()">
            Create Promo Code
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-row>
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
          solo
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
          <v-dialog v-model="dialog" max-width="600">
            <v-card>
              <v-card-text>
                <v-container>
                  <v-row class="pt-5">
                    <v-col
                      class="text-center primary-light-1--text text-h6 text-uppercase"
                    >
                      {{ dialogTitle }}
                    </v-col>
                  </v-row>
                  <v-form ref="form" v-model="valid">
                    <!-- Promo name -->
                    <v-row>
                      <v-col cols="12">
                        <div class="subtitle-2">
                          Promo name (For tracking purpose)
                        </div>
                        <v-text-field
                          :rules="[v => !!v || 'Name is required']"
                          dense
                          v-model="defaultForm.name"
                          label="Enter a promo name"
                          solo
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <!-- Promo code -->
                    <v-row>
                      <v-col cols="12">
                        <div class="subtitle-2">
                          Promo code (the actual code)
                        </div>
                        <v-text-field
                          :rules="[v => !!v || 'Promo code is required']"
                          dense
                          v-model="defaultForm.code"
                          label="Enter a promo code name"
                          solo
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <!-- Promotion type -->
                    <v-row>
                      <v-col cols="12">
                        <div class="subtitle-2">Promotion type</div>
                        <div v-for="(item, i) in types" :key="i">
                          <v-checkbox
                            v-model="defaultForm.type"
                            :rules="[v => !!v || 'Promotion type is required']"
                            :label="item.name"
                            color="primary-light-1"
                            :value="item.id"
                            hide-details
                          ></v-checkbox>
                        </div>
                      </v-col>
                    </v-row>

                    <!-- currency & discount ammount -->
                    <v-row v-if="isFixed">
                      <v-col>
                        <div class="subtitle-2">Currency</div>
                        <v-select
                          v-model="defaultForm.currency"
                          :items="currencies"
                          item-text="displayText"
                          item-value="id"
                          solo
                          dense
                          :rules="[v => !!v || 'Currency is required']"
                        ></v-select>
                      </v-col>
                      <v-col>
                        <div class="subtitle-2">
                          Discount amount
                        </div>
                        <v-text-field
                          type="number"
                          dense
                          v-model="defaultForm.discount"
                          solo
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
                        <div class="subtitle-2">Percentage off</div>
                        <v-text-field
                          type="number"
                          :rules="[v => !!v || 'Percentage off is required']"
                          min="0"
                          max="100"
                          dense
                          v-model="defaultForm.percentageOff"
                          solo
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
                        <div class="subtitle-2">Duration</div>
                        <v-select
                          v-model="defaultForm.duration"
                          :rules="[v => !!v || 'Duration is required']"
                          dense
                          :items="durations"
                          item-text="name"
                          item-value="id"
                          label="Select duration"
                          solo
                        >
                        </v-select>
                      </v-col>
                    </v-row>
                  </v-form>
                  <v-row>
                    <v-col class="d-flex justify-center">
                      <v-btn depressed class="mr-5" @click="dialog = false">
                        Cancel
                      </v-btn>

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

export default {
  layout: "admin",
  components: {},
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
        type: "",
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
              discount: item.discount,
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
          });
      }
    },
    handleNewBtnClick() {
      this.editMode = false;
      this.dialog = true;
      this.$nextTick(() => {
        this.$refs.form.reset();
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
          });
      }
    },
    editItem(item) {
      this.editMode = true;
      this.dialog = true;
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
            this.$toast.error("Successfully deleted");
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
    }
  }
};
</script>
<style lang="scss" scoped></style>
