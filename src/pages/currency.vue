<template>

<v-container fluid >
    <mobile-top-nav extraClass="body-bg-secondary" :headerText="$t('topnav_label_txt_currency')">
      <template v-slot:goBack>
        <v-btn
          icon
          @click="handleBackBtnClick"
        >
          <v-icon class="common-top-back-icon">mdi-chevron-left</v-icon>
        </v-btn>
      </template>
      <template v-slot:action>
        <span></span>
      </template>
    </mobile-top-nav>
    <v-row
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="6"
        lg="4"
        xs="12"
      >
        <v-row>
            <v-col cols="12">
              <v-list dense nav class="body-bg">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="subtitle-2 text-uppercase">
                      {{ $t("topnav_label_txt_currency") }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item-group
                  v-model="selectedCurrencyCode"
                  color="primary-light-1"
                >
                  <template v-for="(item, i) in currencyItems">
                    <v-list-item
                      :key="i"
                      :value="item.code"
                      @click="handleCurrencyChnage(item)"
                    >
                      <v-list-item-avatar size="20" tile>
                        <span>
                          {{ item.symbol }}
                        </span>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title v-text="item.code"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-list-item-group>
              </v-list>
            </v-col>
        </v-row>

      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { currencyService } from "@/services";
import { pathData } from "@/data";
import MobileTopNav from '@/components/layout/global/MobileTopNav'

export default ({
    layout: "common",
    components: {
      MobileTopNav
    },
    data(){
        return {
          currencyItems: currencyService.all(),
          selectedCurrencyCode: currencyService.currentCurrencyCode(),
        }
    },
    computed: {
        currencyBtnText() {
          const currency = currencyService.selectedCurrency();
          if (currency) {
            return currency.symbol + currency.code;
          } else {
            return "";
          }
        },
        colorOfTheTextBtn() {
          return this.theme === "light" ? "primary-light-1" : "white";
        },
    },
    methods: {
      handleCurrencyChnage(item) {
        currencyService.setCurrencyCode(item.code);
        this.$toast.success('Currency has been set successfully!')
        // this.$router.push(this.redirectLink);
        // location.reload();
      },
      handleBackBtnClick(){
        if(this.$auth.hasRole(['superadmin', 'admin', 'staff'])){
          this.$router.push(this.localePath(pathData.admin.profileMenu));
        }else if(this.$auth.hasRole(["coach"])){
          this.$router.push(this.localePath(pathData.coach.profileMenu));
        }else if(this.$auth.hasRole(["athlete"])){
          this.$router.push(this.localePath(pathData.athlete.profileMenu));
        }
      }
    }


})
</script>


<style scoped>

.v-application {
  line-height: 0!important;
}
.w-100{
  width: 100% !important;
}

.currency-title{
  font-family: Open Sans;
  font-style: normal;
  font-weight: 300;
  font-size: 36px;
  line-height: 49px;
  /* identical to box height */

  text-transform: uppercase;

  /* Dusty blue */

  color: #15577C;

}
</style>
