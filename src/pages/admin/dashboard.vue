<template>
  <v-container fluid >
    <mobile-top-nav extraClass="body-bg-secondary" actionClass="d-none" :headerText="$t('text_dashboard')">
      <template v-slot:goBack>
        <span></span>
      </template>
      <template v-slot:action>
        <span></span>
      </template>
    </mobile-top-nav>

    <span class="page-container admin-dashboard">
      <v-row :class="{'pt-5' : $vuetify.breakpoint.xsOnly}">
        <v-col cols="12">
          <div class="balance-card-filter d-flex align-center">
            <div class="filter-text">{{$t("text_show")}}</div>
            <div class="filter-content ml-2">
              <span v-if="startDate">
                {{ startDate.format("ll") }} - {{ endDate.format("ll") }}
              </span>
            </div>
            <div class="filter-content">
              <v-menu
                v-model="filterMenue"
                bottom
                offset-y
                :close-on-content-click="false"
                allow-overflow
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    text
                    x-small
                    v-bind="attrs"
                    v-on="on"
                    class="primary-light-1--text"
                  >
                    <v-icon dark>keyboard_arrow_down</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-text>
                    <div class="d-flex">
                      <div>
                        <div class="caption">Start Date</div>
                        <a-date-picker
                          format="DD-MM-YYYY"
                          :value="filterStartDate"
                          @change="handleChangeFilterStartDate"
                          placeholder="Start date"
                        />
                      </div>
                      <div>
                        <div class="caption">End Date</div>
                        <a-date-picker
                          format="DD-MM-YYYY"
                          :value="filterEndDate"
                          @change="handleChangeFilterEndDate"
                          placeholder="End date"
                        />
                      </div>
                    </div>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="primary-light-1"
                      small
                      @click="handleFilterMenuClick"
                      >Apply</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-menu>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="8">
          <v-row>
            <v-col cols="12" md="4" v-for="(item, i) in box" :key="i">
              <div class="box" tabindex="-1" @click="boxClickHandle(item)">
                <div class="box__title">{{ $t('text_'+item.key) }}</div>
                <div class="box__description">
                  <span v-if="item.amountType == 'money'">
                    {{ currencyService.toCurrencyByBase(item.amount, true) }}
                    <span class="currency">
                      {{ selectedCurrency }}
                    </span>
                  </span>
                  <span v-else>
                    {{ item.amount }}
                  </span>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="mt-3" flat :loading="loading">
            <v-card-title>
              {{ $t('text_'+selectedBox.key) }}
            </v-card-title>
            <v-divider></v-divider>

            <v-card-text>
              <line-chart :chart-data="datacollection"></line-chart>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <dialog-loading :show="loading"></dialog-loading>
    </span>
  </v-container>
</template>

<script>
import LineChart from "@/components/charts/LineChart";
import { currencyService } from "@/services";
import moment from "moment";
import DialogLoading from "@/components/loading/DialogLoading";
import { adminDashboardApi } from "@/api";
import MobileTopNav from '@/components/layout/global/MobileTopNav'

export default {
  layout:"admin",
  components: {
    LineChart,
    DialogLoading,
    MobileTopNav
  },
    head() {
    return {
      title: "Dashboard",   
    };
  },
  data() {
    return {
      currencyService,
      loading: true,
      filterMenue: false,
      startDate: moment().subtract(5, "month"),
      endDate: moment(),
      filterStartDate: moment().subtract(5, "month"),
      filterEndDate: moment(),
      datacollection: {
        labels: [],
        datasets: [
          {
            label: "",
            backgroundColor: "transparent",
            borderColor: "#15577C",
            data: []
          }
        ]
      },
      box: {
        user: { key: "user", text: "Users", amount: 0, amountType: "person" },
        packageSold: {
          key: "package_sold",
          text: "Packages sold",
          amount: 25000,
          amountType: "thing"
        },
        sessionCompleted: {
          key: "session_completed",
          text: "Sessions completed",
          amount: 534,
          amountType: "things"
        },
        avgPrice: {
          key: "avg_price",
          text: "Average price per package",
          amount: 534,
          amountType: "money"
        },
        totalSale: {
          key: "total_sale",
          text: "Total sales",
          amount: 534,
          amountType: "money"
        },
        totalProfit: {
          key: "total_profit",
          text: "Total profit",
          amount: 534,
          amountType: "money"
        }
      },
      selectedCurrency: "DKK",
      selectedBox: {
        key: "user",
        text: "Users",
        amount: 534,
        amountType: "money"
      }
    };
  },
  watch: {},
  created() {
    this.fetchData({
      startDate: this.startDate.format("YYYY-MM-DD"),
      endDate: this.endDate.format("YYYY-MM-DD")
    });
  },
  methods: {
    handleChangeFilterStartDate(value) {
      this.filterStartDate = value;
    },
    handleChangeFilterEndDate(value) {
      this.filterEndDate = value;
    },
    boxClickHandle(box) {
      this.selectedBox = box;
      this.fetchData({
        startDate: this.filterStartDate.format("YYYY-MM-DD"),
        endDate: this.filterEndDate.format("YYYY-MM-DD")
      });
    },
    handleFilterMenuClick() {
      this.fetchData({
        startDate: this.filterStartDate.format("YYYY-MM-DD"),
        endDate: this.filterEndDate.format("YYYY-MM-DD")
      });
    },
    fetchData(params) {
      this.loading = true;
      adminDashboardApi(this.$axios)
        .get(params)
        .then(({ data }) => {
          if (data.data) {
            this.startDate = this.filterStartDate;
            this.endDate = this.filterEndDate;
            this.box.user.amount = data.data.users;
            this.box.packageSold.amount = data.data.packageSold;
            this.box.sessionCompleted.amount = data.data.sessionCompleted;
            this.box.avgPrice.amount = data.data.avgPricePerPackage;
            this.box.totalSale.amount = data.data.totalSales;
            this.box.totalProfit.amount = data.data.totalProfit;
            this.selectedCurrency = data.data.currency;

            if (this.selectedBox.key == this.box.user.key) {
              this.fillData(
                data.data.chart.users.xaxis,
                data.data.chart.users.yaxis
              );
            }

            if (this.selectedBox.key == this.box.packageSold.key) {
              this.fillData(
                data.data.chart.packageSold.xaxis,
                data.data.chart.packageSold.yaxis
              );
            }

            if (this.selectedBox.key == this.box.sessionCompleted.key) {
              this.fillData(
                data.data.chart.sessionCompleted.xaxis,
                data.data.chart.sessionCompleted.yaxis
              );
            }

            if (this.selectedBox.key == this.box.avgPrice.key) {
              this.fillData(
                data.data.chart.avgPricePerPackage.xaxis,
                data.data.chart.avgPricePerPackage.yaxis
              );
            }

            if (this.selectedBox.key == this.box.totalSale.key) {
              this.fillData(
                data.data.chart.totalSale.xaxis,
                data.data.chart.totalSale.yaxis
              );
            }

            if (this.selectedBox.key == this.box.totalProfit.key) {
              this.fillData(
                data.data.chart.totalProfit.xaxis,
                data.data.chart.totalProfit.yaxis
              );
            }
          }
        })
        .catch(error => {
          this.$toast.error(error.response.data.message);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    /**
     * Chart data load
     */
    fillData(x, y) {
      this.datacollection = {
        labels: [...x],
        datasets: [
          {
            label: "",
            backgroundColor: "transparent",
            borderColor: "#15577C",
            data: [...y]
          }
        ]
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.admin-dashboard {
  .currency {
    font-family: $font-family;
    font-size: 10px;
    letter-spacing: 1px;
    color: #1a202d;
  }

  .box {
    border: 1px solid transparent;
    cursor: pointer;
    background: #ffffff;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 200px;
    &__title {
      font-family: $font-family;
      font-weight: bold;
      font-size: 15px;
      line-height: 20px;
      text-align: center;
      letter-spacing: 0.4px;

      color: #9faec2;
    }
    &__description {
      font-family: $font-family;
      font-weight: bold;
      font-size: 40px;
      line-height: 54px;
      text-align: center;
      letter-spacing: 1px;
      color: #252733;
    }
  }

  .box:focus {
    border: 1px solid $primary-light-1;
  }
}
</style>
