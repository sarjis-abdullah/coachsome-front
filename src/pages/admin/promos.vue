<template>
  <v-container fluid>
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
        <v-btn
          icon
          @click.stop="handleNewBtnClick"
        >
          <v-icon style="font-size: 25px!important;" class="common-top-add-icon">
            mdi-plus-circle-outline
          </v-icon>
        </v-btn>
      </template>
    </mobile-top-nav>

    <desktop-top-nav extraClass="body-bg-secondary" :headerText="$t('pwa_promo_codes')"></desktop-top-nav>

    <v-row :class="{'px-10' : $vuetify.breakpoint.mdAndUp}">
      <v-col cols="12">
        <v-card>

            <v-card-title>
              <v-row align="center" justify="space-between">
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="search"
                    prepend-inner-icon="search"
                    label="Search"
                    single-line
                    solo
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col class="d-flex justify-end" v-if="$vuetify.breakpoint.mdAndUp">
                  <v-btn @click="handleNewBtnClick" :block="$vuetify.breakpoint.smAndDown" class="white--text" depressed color="#15577C">
                    {{$t("chat_create_group_label_create")}} {{$t("package_booking_promo_code_title")}}
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-title>



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
          <template v-if="dialog">
            <div v-if="$vuetify.breakpoint.mdAndUp">
              <v-dialog v-model="dialog" max-width="600" @click:outside="closePromoCodeDialog">
                <PromoCodeForm 
                :types="types" 
                :currencies="currencies" 
                :durations="durations" 
                :editMode="editMode" 
                :editableFormData="defaultForm" 
                @updatePromoInUpdateMode="updatePromoInUpdateMode"
                @updatePromoInCreateMode="updatePromoInCreateMode"
                @closePromoCodeDialog="closePromoCodeDialog"/>
              </v-dialog>
            </div>
            <v-card v-else class="fullscreen bg-1">
              <PromoCodeForm 
              :types="types" 
              :currencies="currencies" 
              :durations="durations" 
              :editMode="editMode" 
              :editableFormData="defaultForm" 
              @updatePromoInUpdateMode="updatePromoInUpdateMode"
              @updatePromoInCreateMode="updatePromoInCreateMode"
              @closePromoCodeDialog="closePromoCodeDialog"/>
            </v-card>
          </template>
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
import PromoCodeForm from '@/components/artifact/admin/PromoCodeForm';
import DesktopTopNav from '@/components/layout/global/DesktopTopNav.vue';

export default {
  name: "AdminPromos",
  layout: "admin",
  components: {MobileTopNav, PromoCodeForm, DesktopTopNav},
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
    dialog: function(val) {}
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
    
    handleNewBtnClick() {
      this.editMode = false;
      this.dialog = true;
      this.openPromoCodeDialog()
      this.$nextTick(() => {
        // this.$refs.form.reset();
      });
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
      this.defaultForm = {}
      this.$router.push({query:{}})
    },
    openPromoCodeDialog(){
      const query = {
        ...this.$route.query,
        promoCodeDialog: true
      }
      this.$router.push({query})
    },
    updatePromoInCreateMode(data){
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
    },
    updatePromoInUpdateMode(data){
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
    },
  }
};
</script>
<style lang="scss" scoped>
.fullscreen {
    border-radius: 0;
    margin: 0;
    height: 100%;
    position: fixed;
    overflow-y: auto;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
  }
</style>
