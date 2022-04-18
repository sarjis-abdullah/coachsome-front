<template>
  <div class="coach-package-page">
    <v-container fluid class="page-container page-package">

      <v-row class="page-top-header-row body-bg" v-if="$vuetify.breakpoint.smAndDown">
        <v-col cols="12" class="justify-center page-top-header-column px-0 mx-0">
            <v-list width="100%" color="transparent" class="py-0 my-0">
                <v-list-item class="pl-0 ml-0">
                  <v-btn
                    icon
                    @click="handleBackBtnClick"
                  >
                    <v-icon class="common-top-back-icon">mdi-chevron-left</v-icon>
                  </v-btn>
                  <v-list-item-content class="pl-1 py-0 my-0">
                    <v-list-item-title
                    class="common-top-page-title"
                      v-text="$t('coach_booking_package_active_package_titile')"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
            </v-list>
            <div class="line"></div>
        </v-col>
      </v-row>

      <v-row justify="space-between" align="center" v-else>
        <v-col cols="12" md="6" class="pb-0">
          <div class="page-title">{{ $t("text_hourly_rate") }}</div>
        </v-col>
        <v-col cols="12">
          <div class="line"></div>
        </v-col>
      </v-row>

      <v-row align="center" class="d-none d-md-block">
        <v-col cols="12" class="pb-0">
          <div class="section-title pb-2">{{ $t("text_rate") }}</div>
        </v-col>
        <v-col cols="12" md="4" class="pt-0">
          <div class="section-description">{{ $t("package_rate_desc") }}</div>
        </v-col>
        <v-col cols="12" md="2" class="mt-0 pt-0">
          <!-- Hourly Rate Dialog -->
          <v-dialog v-model="hourlyRate.dialog" persistent max-width="800px">
            <template v-slot:activator="{ on }">
              <v-text-field
                label
                solo
                v-on="on"
                v-model="hourlyRate.inputValue"
                readonly
              ></v-text-field>
            </template>
            <v-card>
              <v-card-title>
                <v-spacer></v-spacer>
                <v-btn small icon depressed @click="hourlyRate.dialog = false">
                  <v-icon small>mdi-close</v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text class="pa-5">
                <v-row>
                  <v-col cols="12" md="7">
                    <v-row>
                      <v-col cols="12" class="pb-0">
                        <div class="section-title pb-2">
                          {{ $t("text_rate") }}
                        </div>
                      </v-col>
                      <v-col cols="12" class="pt-0">
                        <div class="section-description">
                          {{ $t("package_dialog_hourly_rate_desc") }}
                        </div>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="8" md="3">
                    <v-text-field
                      :error-messages="hourlyRateErrors"
                      required
                      solo
                      v-model="hourlyRate.dialogInputVal"
                      @input="$v.hourlyRate.dialogInputVal.$touch()"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4" md="2" class="mb-md-7 pt-7">
                    <span class="primary-light-1--text">{{
                      currencyCode
                    }}</span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-btn
                      dark
                      depressed
                      color="primary-light-1"
                      @click="saveHourlyRate()"
                      >{{ $t("btn_label_save_and_continue") }}</v-btn
                    >
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-dialog>
          <!-- Hourly Rate Dialog -->
        </v-col>
        <v-col cols="12" md="1" class="mb-md-7 mt-0 pt-0" >
          <span class="primary-light-1--text">{{ currencyCode }}</span>
        </v-col>

        <!-- Quick booking -->
        <v-col cols="12" class="pb-0">
          <div class="section-title pb-2">
            {{ $t("package_section_title_quick_booking") }}
          </div>
        </v-col>
        <v-col cols="12" md="12" class="pt-0">
          <div class="section-description">
            <toggle-button
              :value="quickBooking.value"
              @input="handleQuickBooking"
              :color="{ checked: '#6EB5CB', unchecked: '#b5b5b5' }"
              :sync="true"
              switch-color="#15577C"
              :font-size="12"
              :labels="true"
            />
            <span>
              {{ $t("package_quick_booking_btn_label") }}
              <v-tooltip right max-width="350">
                <template v-slot:activator="{ on }">
                  <v-icon small color="#15577C" v-on="on">help_outline</v-icon>
                </template>
                <span>
                  {{ $t("package_quick_booking_btn_tooltip") }}
                </span>
              </v-tooltip>
            </span>
          </div>
        </v-col>
      </v-row>
      <v-row align="center" class="d-md-none">
        <v-col cols="12" class="pb-0">
          <div class="section-title pb-2">
            {{$t("text_hourly_rate")}} 
            <v-tooltip right max-width="350">
              <template v-slot:activator="{ on , attrs }">
                <v-icon small color="#15577C" v-on="on" v-bind="attrs">mdi-progress-question</v-icon>
              </template>
              <span>
                {{$t("package_dialog_hourly_rate_desc")}}
              </span>
            </v-tooltip>
          </div>
        </v-col>
        <v-col cols="12" class="pt-0">
          <div class="section-description">{{$t("pwa_package_rate_descriptiomn")}}</div>
        </v-col>
        <v-col cols="12">
          <v-text-field
            label
            filled
            rounded
            hide-details
            dense
            :suffix="currencyCode"
            :error-messages="hourlyRateErrors"
            required
            v-model="hourlyRate.dialogInputVal"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-btn
            dark
            depressed
            block
            :loading="hourlyRateSave"
            color="primary-light-1"
            @click="saveHourlyRate()"
            >{{ $t("btn_label_save_and_continue") }}</v-btn
          >
        </v-col>

        <v-col cols="12" class="pb-0">
          <div class="section-title pb-2">
            {{ $t("pwa_packages_quick_booking") }}
            <v-tooltip right max-width="350">
              <template v-slot:activator="{ on , attrs }">
                <v-icon small color="#15577C" v-on="on" v-bind="attrs">mdi-progress-question</v-icon>
              </template>
              <span>
                {{$t("pwa_packages_quick_booking_description")}}
              </span>
            </v-tooltip>
          </div>
        </v-col>
        <v-col cols="12" class="pt-0">
          <div class="section-description">
            <v-checkbox
              small
              hide-details
              color="primary-light-1"
              v-model="quickBooking.value"
              @change="handleQuickBooking"
            >
              <template v-slot:label>
                <span id="checkboxLabel">{{$t('package_quick_booking_btn_label')}}
                  <v-tooltip right max-width="350">
                  <template v-slot:activator="{ on }">
                    <v-icon small color="#15577C" v-on="on">mdi-progress-question</v-icon>
                  </template>
                  <span>
                    {{ $t("package_quick_booking_btn_tooltip") }}
                  </span>
                </v-tooltip>
                </span>
              </template>
            </v-checkbox>
          </div>
        </v-col>
      </v-row>

      <v-row justify="space-between" align="center">
        <v-col cols="12" md="6" class="pb-0">
          <div class="page-title d-none d-md-block">{{ $t("package_list_heading") }}</div>
          <div class="page-title d-md-none">{{ $t("pwa_subscription_preview") }}</div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <div class="line"></div>
        </v-col>
      </v-row>

      <!-- Package List -->
      <v-row class="mb-5">
        <v-col cols="12" md="10">
          <v-row class="d-none d-md-block">
            <v-col>
              <v-col cols="12" md="6">
                <div @click="handleAddBtnClick" class="add-btn">
                  <v-icon class="add-btn__icon" color="primary-light-1">
                    mdi-plus-circle-outline
                  </v-icon>
                  <div class="add-btn__text">
                    {{ $t("btn_label_add_package") }}
                  </div>
                </div>
              </v-col>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-none d-md-block">
              <draggable
                @end="updateOrderList"
                class="row"
                v-model="packageList"
                :sort="true"
              >
                <v-col
                  cols="12"
                  md="6"
                  v-for="item in packageList"
                  :key="item.id"
                >
                  <package-card
                    class="all-scroll"
                    v-bind="item"
                    @change-status="changeStatus(item, $event)"
                    @edit="
                      editDialog = true;
                      editPackage(item);
                    "
                    @remove="removePackage(item)"
                    :rate="hourlyRate.inputValue"
                    :max-chars="descriptionMaxChar"
                  >
                    <template v-slot:original-price="{ price, discount }">
                      <div v-if="discount && discount > 0">
                        {{ currencyService.toCurrencyByBase(price) }}
                      </div>
                      <div else></div>
                    </template>
                    <template v-slot:sale-price="{ price }">
                      <span>{{ currencyService.toCurrencyByBase(price) }}</span>
                    </template>
                  </package-card>
                </v-col>
              </draggable>
            </v-col>
            <v-col
              cols="12"
              v-for="item in packageList"
              :key="item.id"
              class="d-md-none"
            >
              <package-card
                class="all-scroll"
                v-bind="item"
                @change-status="changeStatus(item, $event)"
                @edit="
                  editDialog = true;
                  editPackage(item);
                "
                @remove="removePackage(item)"
                :rate="hourlyRate.inputValue"
                :max-chars="descriptionMaxChar"
              >
                <template v-slot:original-price="{ price, discount }">
                  <div v-if="discount && discount > 0">
                    {{ currencyService.toCurrencyByBase(price) }}
                  </div>
                  <div else></div>
                </template>
                <template v-slot:sale-price="{ price }">
                  <span>{{ currencyService.toCurrencyByBase(price) }}</span>
                </template>
              </package-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <!-- Edit Dialog -->
      <v-dialog v-model="editDialog" persistent scrollable max-width="1000">
        <v-card>
          <v-card-title class="grey lighten-2">
            {{ $t("package_edit_dialog_title_edit_package") }}
            <v-spacer></v-spacer>
            <v-btn
              icon
              @click="
                editDialog = false;
                editAblePackage = null;
              "
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <package-default-edit
              v-if="isShowDefaultPackage"
              :rate="hourlyRate.inputValue"
              v-bind="editAblePackage"
              @update="updateDefaultPackage"
            >
              <template v-slot:code="slotProps">
                <span>{{
                  currencyCode ? currencyCode : slotProps.currencyCode
                }}</span>
              </template>
            </package-default-edit>
            <package-camp-edit
              v-if="isShowCampPackage"
              :rate="hourlyRate.inputValue"
              v-bind="editAblePackage"
              @update="updateCampPackage"
            >
              <template v-slot:code="slotProps">
                <span>{{
                  currencyCode ? currencyCode : slotProps.currencyCode
                }}</span>
              </template>
            </package-camp-edit>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- Edit Dialog -->

      <!-- Package Create Dialog -->
      <PackageCreateDialog
        v-model="dialogPackageCreate"
        :rate="hourlyRate.inputValue"
        @close="dialogPackageCreate = false"
        @created="hideTabs"
      />

      <v-row class="d-sm-flex d-xs-flex d-lg-none" >
        <v-col cols="12" class="mx-0 px-0">
          <client-back-footer class="px-0 py-0 d-none d-md-block" />
          <v-btn
            fab
            dark
            fixed
            bottom
            right
            color="#FF633F"
            @click="handleAddBtnClick"
            class="d-md-none mb-15"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>

    </v-container>
  </div>
</template>

<script>
import PackageDefaultEdit from "@/components/artifact/coach/package/PackageDefaultEdit";
import PackageCampEdit from "@/components/artifact/coach/package/PackageCampEdit";
import PackageCreateDialog from "@/components/artifact/coach/package/PackageCreateDialog";
import PackageCard from "@/components/card/PackageCard";
import ClientBackFooter from "@/components/artifact/global/ClientBackFooter";

import { required, decimal } from "vuelidate/lib/validators";
import { coachPackageApi } from "@/api";
import { constantData, pathData } from "@/data";
import { currencyService } from "@/services";
import draggable from "vuedraggable";

export default {
  layout: "coach",
  components: {
    PackageCard,
    PackageCreateDialog,
    PackageDefaultEdit,
    PackageCampEdit,
    ClientBackFooter,
    draggable
  },

  data() {
    return {
      currencyService,
      dialogPackageCreate: false,
      quickBooking: {
        value: false
      },
      descriptionMaxChar: 500,
      editDialog: false,
      editAblePackage: null,
      packageCurrency: currencyService.defaultCurrency(),
      hourlyRate: {
        dialog: false,
        inputValue: null,
        dialogInputVal: null
      },
      showTabs: false,
      isEdit: false,
      tabs: ["default", "camp"],
      packageList: [],
      highestLimit: 8,
      drag: false
    };
  },
  validations: {
    hourlyRate: {
      dialogInputVal: {
        required,
        decimal
      }
    }
  },
  computed: {
    currencyCode() {
      return this.packageCurrency.code;
    },
    isShowDefaultPackage() {
      let show = false;
      if (this.editAblePackage) {
        show =
          this.editAblePackage.category.id == constantData.PACKAGE_DEFAULT_ID;
      }
      return show;
    },
    isShowCampPackage() {
      let show = false;
      if (this.editAblePackage) {
        show = this.editAblePackage.category.id == constantData.PACKAGE_CAMP_ID;
      }
      return show;
    },
    hasPermitToCreateNewPackage() {
      return this.highestLimit >= this.packageList.length + 1;
    },
    hourlyRateErrors() {
      const errors = [];
      if (!this.$v.hourlyRate.dialogInputVal.$dirty) return errors;
      !this.$v.hourlyRate.dialogInputVal.required &&
        errors.push("Hourly rate is required.");
      !this.$v.hourlyRate.dialogInputVal.decimal &&
        errors.push("Only number is allowed");
      return errors;
    }
  },

  methods: {
    handleBackBtnClick(){
      this.$router.push(this.localePath(pathData.coach.editMenu));
    },
    handleAddBtnClick() {
      this.dialogPackageCreate = true;
    },
    updateOrderList() {
      let payload = this.packageList.map(item => item.id);
      coachPackageApi(this.$axios)
        .updateOrder(payload)
        .then(({ data }) => {
        });
    },
    handleQuickBooking() {
      coachPackageApi(this.$axios)
        .quickBooking()
        .then(({ data }) => {
          this.quickBooking.value = data.changedValue == 1 ? true : false;
          if (data.message) {
            this.$toast.success(
              this.$i18n.t("package_quick_booking_success_toggle_mesg")
            );
          }
        })
        .catch(error => {
          this.$toast.error(error.response.data.message);
        });
    },
    refreshPageProgress() {
      this.$store.dispatch("pageProgress/refresh");
    },
    updateCampPackage(payload) {
      coachPackageApi(this.$axios)
        .updatePackage(payload)
        .then(response => {
          if (response.data.status == "success") {
            this.packageList.forEach((item, index) => {
              if (item.id == response.data.package.id) {
                this.packageList[index] = response.data.package;
              } else {
                this.packageList[index] = item;
              }
            });
            this.$toast.success(
              this.$i18n.t("package_success_msg_package_updated")
            );
            this.editDialog = false;
            this.editAblePackage = null;
          }
        })
        .catch(() => {});
    },
    updateDefaultPackage(item) {
      let payload = item;
      coachPackageApi(this.$axios)
        .updatePackage(payload)
        .then(response => {
          if (response.data.status == "success") {
            this.packageList.forEach((item, index) => {
              if (item.id == response.data.package.id) {
                this.packageList[index] = response.data.package;
              } else {
                this.packageList[index] = item;
              }
            });
            this.$toast.success(
              this.$i18n.t("package_success_msg_package_updated")
            );
            this.editDialog = false;
            this.editAblePackage = null;
          }
        })
        .catch(() => {});
    },
    editPackage(item) {
      item.price = item.originalPrice;
      this.editAblePackage = item;
    },
    removePackage(item) {
      if (confirm(this.$i18n.t("alert_confirm_short_text"))) {
        let payload = item;
        coachPackageApi(this.$axios)
          .removePackage(payload)
          .then(({ data }) => {
            if (data.status == "success") {
              let i = this.packageList
                .map(packageItem => packageItem.id)
                .indexOf(item.id);
              this.packageList.splice(i, 1);
              this.$toast.success(data.message);
            }
          })
          .catch(() => {});
      }
    },
    changeStatus(item, $event) {
      let payload = {
        id: item.id,
        changed_status: $event
      };
      coachPackageApi(this.$axios)
        .changePackageStatus(payload)
        .then(response => {
          if (response.data.status == "success") {
            this.$toast.success(response.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    hideTabs(newPackage) {
      this.packageList.push(newPackage);
      this.dialogPackageCreate = false;
      this.updateOrderList();
    },
    saveHourlyRate() {
      if (!this.$v.$invalid) {
        let payload = {
          hourly_rate: this.hourlyRate.dialogInputVal
        };
        coachPackageApi(this.$axios)
          .saveHourlyRate(payload)
          .then(response => {
            if (response.data.status == "success") {
              this.hourlyRate.inputValue = response.data.hourly_rate;
              this.refreshPageProgress();
              this.packageList = response.data.packages.data;
            }
            this.hourlyRate.dialog = false;
          })
          .catch(() => {});
      }
    }
  },
  watch: {
    "hourlyRate.inputValue": function(val) {
      this.hourlyRate.dialogInputVal = val;
    }
  },
  created() {
    coachPackageApi(this.$axios)
      .packageInfo()
      .then(response => {
        this.hourlyRate.inputValue = response.data.hourly_rate;
        this.quickBooking.value =
          response.data.quickBooking == 1 ? true : false;
        this.packageList = response.data.packages.data;
        if (!this.hourlyRate.inputValue) {
          this.hourlyRate.dialog = true;
        }
        if (response.data.currency_code) {
          this.packageCurrency = currencyService.getByCode(
            response.data.currency_code
          );
        }
      })
      .catch(() => {});
  },
  mounted() {}
};
</script>

<style lang="scss">
.coach-package-page {
  background: $body-bg;
  height: 100%;
  .page-package {
    .v-tab--active {
      background: $primary-light-1;
      color: white;
    }

    .add-btn {
      border-radius: 5px;
      background: white;
      border: 2px solid $primary-light-1;
      width: 100%;
      height: 200px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      &__text {
        font-family: $font-family;
        font-size: 18px;
        line-height: 28px;
        color: $primary-light-1;
      }
    }
  }
  .page-action {
    .v-input .v-input__slot {
      box-shadow: none;
      margin-bottom: 0px !important;
      .v-label {
        color: #49556a !important;
      }
    }
    .draggable:hover {
      cursor: grab;
    }
    .all-scroll:hover {
      cursor: all-scroll;
    }
  }
}
</style>
