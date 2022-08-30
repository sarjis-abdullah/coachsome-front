<template>
  <div class="balance-earnings-page">
    <v-container fluid >
      <mobile-top-nav extraClass="body-bg-secondary" :headerText="$t('balance_earning_page_title')">
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
      <desktop-top-nav extraClass="body-bg-secondary" :headerText="$t('balance_earning_page_title')"></desktop-top-nav>
      <div :class="{'px-8' : $vuetify.breakpoint.mdAndUp}">
        <!-- <span class="d-none d-md-block"> 
          <v-row align="center pb-2 mb-2" >
            <v-col cols="12" md="6" class="pb-0">
              <div class="page-title">{{ $t("balance_earning_page_title") }}</div>
            </v-col>
            <v-col cols="12" md="6" class="text-right pb-0">
             
            </v-col>
          </v-row>
        </span> -->
<!-- 
        <v-row class="d-none d-md-block">
          <v-col cols="12">
            <div class="line"></div>
          </v-col>
        </v-row> -->

        <span class="d-none d-md-block">
          <v-row>
            <v-col cols="12" md="4" class="text-left">
              <div class="balance-card-filter d-flex align-center">
                <div class="filter-text">Filter</div>
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
            <v-col cols="12" md="4" class="d-flex justify-center">
              <div class="filter-content ml-2">Curves ({{ curve }})</div>
              <div class="filter-content">
                <v-menu
                  v-model="curveMenue"
                  bottom
                  offset-y
                  :close-on-content-click="false"
                  allow-overflow
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      text
                      x-small
                      class="primary-light-1--text"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon dark>keyboard_arrow_down</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(item, index) in curves"
                      :key="index"
                      @click="curve = item"
                    >
                      <v-list-item-title>{{ item }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </v-col>
            <v-col cols="12" md="4" class="text-right">
              <div>
                  <v-btn
                    :loading="payoutRequest.loading"
                    dark
                    depressed
                    color="#EDB041"
                    @click="handlePayoutRequest"
                  >
                    {{ $t("balance_earning_btn_title_request_payout") }}

                    <template v-slot:loader>
                      <span class="custom-loader">
                        <v-icon light>cached</v-icon>
                      </span>
                    </template>
                  </v-btn>
                  <div v-if="payoutRequest.lastRequestTime" class="last-request">
                    {{ $t("balance_earning_date_hint_last_req") }}
                    {{ moment(payoutRequest.lastRequestTime).format("DD/MM/YYYY") }}
                  </div>
                </div>
            </v-col>
          </v-row>
        </span>

        <v-row class="d-flex justify-center px-0 mx-0 pt-5 d-md-none">
          <v-col cols="12" class="d-flex justify-end" style="background: #cad5e1; border-radius: 8px;">
            <div class="filter-content ml-2">Curves ({{ curve }})</div>
            <div class="filter-content">
              <v-menu
                v-model="curveMenue"
                bottom
                offset-y
                :close-on-content-click="false"
                allow-overflow
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    text
                    x-small
                    class="primary-light-1--text"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon dark>keyboard_arrow_down</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in curves"
                    :key="index"
                    @click="curve = item"
                  >
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4">
            <div class="balance-card mt-5">
              <div class="balance-card__row">
                <div class="balance-card__col-1 first-row-first-col">
                  {{ dashboardInfo.newCustomers }}
                </div>
                <div class="balance-card__col-2">
                  {{ $t("balance_earning_info_customer") }}
                </div>
                <div class="balance-card__col-3 first-row-last-col">
                  <img
                    :src="require(`@/assets/images/icons/new-customer.svg`)"
                    alt=""
                  />
                </div>
              </div>
              <div class="balance-card__row">
                <div class="balance-card__col-1">
                  {{
                    currencyService.toCurrency(
                      dashboardInfo.totalIncome,
                      currencyConfig
                    )
                  }}
                </div>
                <div class="balance-card__col-2">
                  {{ $t("balance_earning_info_total_income") }}
                  {{ dashboardInfo.currency }}
                </div>
                <div class="balance-card__col-3">
                  <img
                    :src="require(`@/assets/images/icons/total-earning.svg`)"
                    alt=""
                  />
                </div>
              </div>
              <div class="balance-card__row">
                <div class="balance-card__col-1">
                  {{
                    currencyService.toCurrency(
                      dashboardInfo.averageRevenuePerCustomer,
                      currencyConfig
                    )
                  }}
                </div>
                <div class="balance-card__col-2">
                  {{ $t("balance_earning_av_revenue_per_customer") }}
                </div>
                <div class="balance-card__col-3">
                  <img
                    :src="require(`@/assets/images/icons/average-revenue.svg`)"
                    alt=""
                  />
                </div>
              </div>
              <div class="balance-card__row">
                <div class="balance-card__col-1">
                  {{ dashboardInfo.totalPackageSold }}
                </div>
                <div class="balance-card__col-2">
                  {{ $t("balance_earning_info_total_package_sold") }}
                </div>
                <div class="balance-card__col-3 d-flex justify-end">
                  <div class="package--circle"></div>
                </div>
              </div>
              <div class="balance-card__row">
                <div class="balance-card__col-1 last-row-first-col">
                  {{ dashboardInfo.totalSessionCompleted }}
                </div>
                <div class="balance-card__col-2">
                  {{ $t("balance_earning_info_total_sessions_completed") }}
                </div>
                <div
                  class="balance-card__col-3 last-row-last-col d-flex justify-end"
                >
                  <div class="session--circle"></div>
                </div>
              </div>
            </div>
          </v-col>

          <!-- Chart -->
          <v-col cols="12" md="4">
            <client-only>
              <line-chart
                v-if="curve == 'line'"
                :chart-data="datacollection"
              ></line-chart>
              <radar-chart
                v-if="curve == 'radar'"
                :chart-data="datacollection"
              ></radar-chart>
            </client-only>
            <!-- <line-chart
              ref="chart"
              v-if="loaded"
              :chartdata="chartdata"
              :options="options"
            /> -->
          </v-col>

          <v-col cols="12" md="4" class="text-center">
            <div class="payout-info-card mt-5">
              <div class="payout-info-card__title">
                {{ $t("balance_earning_payout_title_ready_to") }}
              </div>
              <div class="payout-info-card__sub-title">
                {{ $t("balance_earning_subtitile_payout") }}
              </div>
              <div class="payout-info-card-description">
                <div class="payout-info-card-description__amount">
                  {{
                    currencyService.toCurrency(
                      readyToPayout.amount,
                      currencyConfig
                    )
                  }}
                </div>
                <div class="payout-info-card-description__currency">
                  {{ readyToPayout.currency }}
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
        <!-- payout button -->
        <v-row class="d-flex justify-center d-md-none">
          <v-col cols="12" class="text-center pb-0">
            <div>
              <v-btn
                :loading="payoutRequest.loading"
                dark
                block
                :disabled="available"
                depressed
                color="#EDB041"
                @click="handlePayoutRequest"
                style="border-radius: 8px"
              >
                {{ $t("balance_earning_btn_title_request_payout") }}

                <template v-slot:loader>
                  <span class="custom-loader">
                    <v-icon light>cached</v-icon>
                  </span>
                </template>
              </v-btn>
              <div v-if="payoutRequest.lastRequestTime" class="last-request">
                {{ $t("balance_earning_date_hint_last_req") }}
                {{ moment(payoutRequest.lastRequestTime).format("DD/MM/YYYY") }}
              </div>
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" class="pb-0">
            <div class="page-title">
              {{ $t("balance_earning_sec_overview_balance_earning") }}
            </div>
          </v-col>
           <v-col cols="12" class="pb-2">
             <div class="line"></div>
           </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12" class="pb-15">
            <v-card>
              <v-card-title>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="search"
                    prepend-inner-icon="search"
                    label="Search"
                    outlined
                    dense
                    class="default-text-field"
                    color="#9FAEC2"
                    clearable
                    hide-details
                  >
                  </v-text-field>
                </v-col>
                <!-- <v-col cols="12" md="8" class="d-flex" style="justify-content:right">
                  <ExportCSV fileName="balance-earnings-data" :rows="items" :headers="headers" />
                </v-col> -->
              </v-row>
            </v-card-title>

              <client-only>
                <v-data-table
                  :headers="headers"
                  hide-default-header
                  :items="items"
                  item-key="name"
                  :search="search"
                  :options.sync="table.options"
                  :loading="table.loading"
                  :header-props="{ sortIcon: 'mdi-chevron-down' }"
                  :footer-props="{
                    itemsPerPageOptions: [10, 20, 30, -1]
                  }"
                  :mobile-breakpoint="0"
                >
                  <template v-slot:header="{ props: {} }">
                    <thead>
                      <tr>
                        <!-- Date -->
                        <th class="balance-table--header text-center">
                          <span class="th-col-text">
                            {{ $t("balance_earning_overview_tbl_col_date") }}
                          </span>
                          <!-- <v-icon small color="#49556A">mdi-chevron-down</v-icon> -->
                          <v-tooltip top max-width="250">
                            <template v-slot:activator="{ on }">
                              <v-icon x-small color="#49556A" v-on="on"
                                >help_outline</v-icon
                              >
                            </template>
                            <span>
                              {{ $t("balance_earning_table_col_date") }}
                            </span>
                          </v-tooltip>
                        </th>

                        <!-- Description -->
                        <th class="balance-table--header text-center">
                          <span class="th-col-text">
                            {{ $t("balance_earning_overview_tbl_description") }}
                          </span>
                          <v-tooltip top max-width="250">
                            <template v-slot:activator="{ on }">
                              <v-icon x-small color="#49556A" v-on="on"
                                >help_outline</v-icon
                              >
                            </template>
                            <span>
                              {{ $t("balance_earning_table_col_description") }}
                            </span>
                          </v-tooltip>
                        </th>

                        <!-- Customer -->
                        <th class="balance-table--header text-center">
                          <span class="th-col-text">
                            {{ $t("balance_earing_overview_tbl_col_customer") }}
                          </span>
                          <v-tooltip top max-width="250">
                            <template v-slot:activator="{ on }">
                              <v-icon x-small color="#49556A" v-on="on"
                                >help_outline</v-icon
                              >
                            </template>
                            <span>
                              {{ $t("balance_earning_table_col_customer") }}
                            </span>
                          </v-tooltip>
                        </th>

                        <!-- Amount -->
                        <th class="balance-table--header text-center">
                          <span class="th-col-text">
                            {{ $t("blance_earning_overview_tble_col_amount") }}
                          </span>
                          <v-tooltip top max-width="250">
                            <template v-slot:activator="{ on }">
                              <v-icon x-small color="#49556A" v-on="on"
                                >help_outline</v-icon
                              >
                            </template>
                            <span>
                              {{ $t("balance_earning_table_col_amount") }}
                            </span>
                          </v-tooltip>
                        </th>

                        <!-- Fee -->
                        <th class="balance-table--header text-center">
                          <span class="th-col-text">
                            {{ $t("balance_earning_overview_tbl_col_fee") }}
                          </span>
                          <v-tooltip top max-width="250">
                            <template v-slot:activator="{ on }">
                              <v-icon x-small color="#49556A" v-on="on"
                                >help_outline</v-icon
                              >
                            </template>
                            <span>
                              {{ $t("balance_earning_table_col_fee") }}
                            </span>
                          </v-tooltip>
                        </th>

                        <!-- Income -->
                        <th class="balance-table--header text-center">
                          <span class="th-col-text">
                            {{ $t("balance_earning_overview_tbl_col_income") }}
                          </span>
                          <v-tooltip top max-width="250">
                            <template v-slot:activator="{ on }">
                              <v-icon x-small color="#49556A" v-on="on"
                                >help_outline</v-icon
                              >
                            </template>
                            <span>
                              {{ $t("balance_earning_table_col_income") }}
                            </span>
                          </v-tooltip>
                        </th>

                        <!-- Savings -->
                        <th class="balance-table--header text-center border-left--dotted">
                          <div class="d-flex justify-center align-center">
                            <span class="th-col-text">
                              {{ $t("balance_earning_overview_tbl_col_savings") }}
                            </span>
                            <v-tooltip top max-width="250">
                              <template v-slot:activator="{ on }">
                                <v-icon x-small color="#49556A" v-on="on"
                                  >help_outline</v-icon
                                >
                              </template>
                              <span>
                                {{ $t("blance_earning_overview_tbl_col_saving_help_text") }}
                              </span>
                            </v-tooltip>
                          </div>
                        </th>

                        <!-- Saving to balance -->
                        <th class="balance-table--header text-center"></th>

                        <th class="balance-table--header text-center"></th>

                        <th class="balance-table--header text-center"></th>

                        <!-- Balance -->
                        <th class="balance-table--header text-center">
                          <div class="d-flex justify-center align-center">
                            <span class="th-col-text">
                              {{ $t("balance_earning_overview_table_col_balance") }}
                            </span>
                            <v-tooltip top max-width="250">
                              <template v-slot:activator="{ on }">
                                <v-icon x-small color="#49556A" v-on="on"
                                  >help_outline</v-icon
                                >
                              </template>
                              <span>
                                {{ $t("balance_earning_overview_tbl_col_balance_help_txt") }}
                              </span>
                            </v-tooltip>
                          </div>
                        </th>

                        <!-- Balance to paid -->
                        <th class="balance-table--header text-center"></th>

                        <th class="balance-table--header text-center"></th>

                        <th class="balance-table--header text-center"></th>

                        <!-- Paid -->
                        <th class="balance-table--header text-center">
                          <div class="d-flex justify-center align-center">
                            <span class="th-col-text">
                              {{ $t("balance_earning_overview_table_col_paid") }}
                            </span>
                            <span class="text-center ml-2">
                              <div class="currency-code">
                                {{ currencyConfig.code }}
                              </div>
                            </span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                  </template>

                  <template v-slot:body="{ items }">
                    <tbody>
                      <tr v-for="item in items" :key="item.id">
                        <td class="text-center" style="white-space: nowrap">
                          {{ item.date }}
                        </td>
                        <td>{{ item.description }}</td>
                        <td>{{ item.customerName }}</td>
                        <td class="text-right">
                          <span v-if="item.amount">
                            {{
                              currencyService.toCurrency(
                                item.amount,
                                currencyConfig
                              )
                            }}
                          </span>
                        </td>
                        <td class="text-right">
                          <span v-if="item.fee">
                            -
                            {{
                              currencyService.toCurrency(item.fee, currencyConfig)
                            }}
                          </span>
                        </td>
                        <td class="text-right">
                          <span v-if="item.income">
                            {{
                              currencyService.toCurrency(
                                item.income,
                                currencyConfig
                              )
                            }}
                          </span>
                        </td>
                        <td class="text-right border-left--dotted">
                          {{
                            currencyService.toCurrency(item.savings, currencyConfig)
                          }}
                        </td>
                        <td class="text-right" style="color: #6f8098">
                          <span v-if="item.savingsToBalanceTransferredAmount">
                            >
                          </span>
                        </td>
                        <td class="text-center" style="color: #6f8098">
                          <v-tooltip
                            bottom
                            max-width="250"
                            v-if="item.savingsToBalanceTransferredAmount"
                          >
                            <template v-slot:activator="{ on }">
                              <span
                                v-on="on"
                                class="border-bottom--dotted"
                                style="font-size: 11px"
                              >
                                {{
                                  currencyService.toCurrency(
                                    item.savingsToBalanceTransferredAmount,
                                    currencyConfig
                                  )
                                }}
                              </span>
                            </template>
                            <span>
                              {{
                                $t(
                                  "balance_earning_tooltip_txt_transferred_to_balance"
                                )
                              }}
                            </span>
                          </v-tooltip>
                        </td>
                        <td class="text-left" style="color: #6f8098">
                          <span v-if="item.savingsToBalanceTransferredAmount">
                            >
                          </span>
                        </td>

                        <!-- Balance -->
                        <td class="text-right">
                          <span v-if="item.balance">
                            {{
                              currencyService.toCurrency(
                                item.balance,
                                currencyConfig
                              )
                            }}
                          </span>
                        </td>

                        <!-- Balance to paid -->
                        <td class="text-right" style="color: #6f8098">
                          <span v-if="item.balanceToPaidTransferredAmount">
                            >
                          </span>
                        </td>
                        <td class="text-center" style="color: #6f8098">
                          <v-tooltip
                            bottom
                            max-width="250"
                            v-if="item.balanceToPaidTransferredAmount"
                          >
                            <template v-slot:activator="{ on }">
                              <span
                                v-on="on"
                                class="border-bottom--dotted"
                                style="font-size: 11px"
                              >
                                {{
                                  currencyService.toCurrency(
                                    item.balanceToPaidTransferredAmount,
                                    currencyConfig
                                  )
                                }}
                              </span>
                            </template>
                            <span>
                              {{
                                $t("balance_earning_tooltip_transferred_to_paid")
                              }}
                            </span>
                          </v-tooltip>
                        </td>
                        <td class="text-left" style="color: #6f8098">
                          <span v-if="item.balanceToPaidTransferredAmount">
                            >
                          </span>
                        </td>

                        <!-- Paid -->
                        <td class="text-right">
                          <span v-if="item.paid">
                            {{
                              currencyService.toCurrency(item.paid, currencyConfig)
                            }}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-data-table>
              </client-only>
            </v-card>
            <!-- <div class="mt-5">
                <v-btn small outlined color="primary-light-2">{{
                  $t("btn_label_show_more")
                }}</v-btn>
              </div> -->
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import { coachBalanceEarningApi, coachPayoutRequestApi, coachPayoutInformationApi } from "@/api";
import { currencyService } from "@/services";
import { pathData } from "@/data";
import moment from "moment";
import LineChart from "@/components/charts/LineChart";
import RadarChart from "@/components/charts/RadarChart";
import MobileTopNav from '@/components/layout/global/MobileTopNav';
import DesktopTopNav from '@/components/layout/global/DesktopTopNav.vue';
import ExportCSV from '@/components/artifact/global/ExportCSV.vue';

export default {
  layout: "coach",
  components: {
    LineChart,
    RadarChart,
    MobileTopNav,
    DesktopTopNav,
    ExportCSV
  },
  data() {
    return {
      isEmptyPayoutDetails: false,
      currencyService,
      datacollection: {},
      options: {
        events: ["click"]
      },
      chartdata: {
        xaxis: [],
        yaxis: {
          newCustomers: [],
          totalIncome: []
        }
      },
      dashboardInfo: {
        newCustomers: 0.0,
        totalIncome: 0.0,
        totalPackageSold: 0,
        averageRevenuePerCustomer: 0,
        totalSessionCompleted: 0,
        currency: ""
      },
      startDate: moment(),
      endDate: moment(),
      filterStartDate: moment(),
      filterEndDate: moment(),
      filterMenue: false,
      curveMenue: false,
      curves: ["line", "radar"],
      curve: "line",
      payoutRequest: {
        loading: false,
        lastRequestTime: ""
      },
      readyToPayout: {
        amount: 0.0,
        currency: "DKK"
      },
      search: "",
      items: [],
      table: {
        page: 1,
        numberOfPages: 1,
        options: {
          itemsPerPage: 10
        },
        loading: false,
      },
      headers: [
        // { text: "#ID", value: "id" },
        { text: "Date", class: "balance-table--header", value: "date"},
        { text: "Description", class: "balance-table--header", value: "description" },
        { text: "Customer", class: "balance-table--header", value: "customerName" },
        { text: "Amount", class: "balance-table--header", value: "amount" },
        { text: "Fee", class: "balance-table--header", value: "fee" },
        { text: "Income", class: "balance-table--header", value: "income" },
        { text: "Savings", class: "balance-table--header", value: "savings" },
        { text: "Balance", class: "balance-table--header", value: "balance" },
        {
          text: "Saving to balance amount",
          class: "balance-table--header", value: "savingsToBalanceTransferredAmount"
        },
        {
          text: "Balance to paid amount",
          class: "balance-table--header", value: "balanceToPaidTransferredAmount"
        },
        { text: "Paid", class: "balance-table--header", value: "balance" }
      ],
      currencyConfig: currencyService.getCurrentCurrencyWithoutSymbol()
    };
  },
  watch: {
    startDate(val) {
      this.filterStartDate = val;
    },
    endDate(val) {
      this.filterEndDate = val;
    }
  },
  computed: {
    available(){
      return this.readyToPayout.amount > 0 ? false : true;
    },
    newSeries() {
      return this.series;
    },
    newXAxis() {
      return this.options.xaxis;
    }
  },
  created() {
    this.fetchData();
    this.fetchPayoutInfo();
  },
  mounted() {
    this.fillData();
  },
  methods: {
    moment,
    handleChangeFilterStartDate(value) {
      this.filterStartDate = value;
    },
    handleChangeFilterEndDate(value) {
      this.filterEndDate = value;
    },
    /**
     * Chart data load
     */
    fillData() {
      this.datacollection = {
        labels: [...this.chartdata.xaxis],
        datasets: [
          {
            label: "Customer",
            backgroundColor: "#FF633F",
            borderColor: "#FF633F",
            data: [...this.chartdata.yaxis.newCustomers]
          },
          {
            label: "Income",
            backgroundColor: "#6EB5CB",
            borderColor: "#6EB5CB",
            data: [...this.chartdata.yaxis.totalIncome]
          }
        ]
      };
    },
    /**
     * Filter menu handle
     */
    async handleFilterMenuClick() {
      this.filterMenue = false;

      try {
        let params = {
          startDate: this.filterStartDate.format("YYYY-MM-DD"),
          endDate: this.filterEndDate.format("YYYY-MM-DD")
        };
        let { data } = await coachBalanceEarningApi(this.$axios).get(params);

        if (data.balanceEarnings) {
          this.items = [];
          data.balanceEarnings.forEach(item => {
            this.items.push({
              id: item.id,
              date: item.date,
              description: item.description,
              customerName: item.customerName,
              amount: item.amount,
              fee: item.fee,
              income: item.income,
              savings: item.savings,
              savingsToBalanceTransferredAmount:
                item.savingsToBalanceTransferredAmount,
              balanceToPaidTransferredAmount:
                item.balanceToPaidTransferredAmount,
              balance: item.balance,
              paid: item.paid
            });
          });
        }

        if (data.dashboardInfo) {
          this.startDate = this.moment(data.dashboardInfo.startDate);
          this.endDate = this.moment(data.dashboardInfo.endDate);
          this.dashboardInfo.newCustomers = data.dashboardInfo.newCustomers;
          this.dashboardInfo.totalIncome = data.dashboardInfo.totalIncome;
          this.dashboardInfo.totalPackageSold =
            data.dashboardInfo.totalPackageSold;
          this.dashboardInfo.totalSessionCompleted =
            data.dashboardInfo.totalSessionCompleted;
          this.dashboardInfo.currency = data.dashboardInfo.currency;
        }

        if (data.timeLine) {
          this.chartdata.xaxis = [];
          this.chartdata.yaxis.newCustomers = [];
          this.chartdata.yaxis.totalIncome = [];
          data.timeLine.forEach(item => {
            this.chartdata.xaxis.push(item.month);
            this.chartdata.yaxis.newCustomers.push(item.customer);
            this.chartdata.yaxis.totalIncome.push(item.income);
          });
          this.fillData();
        }
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },
    async handlePayoutRequest() {
      if(!this.isEmptyPayoutDetails){
        try {
          this.payoutRequest.loading = true;
          let { data } = await coachPayoutRequestApi(this.$axios).doRequest({});
          this.payoutRequest.loading = false;
          if (data.requestTime) {
            this.payoutRequest.lastRequestTime = data.requestTime;
            this.$toast.success(
              this.$t("balance_earning_payout_request_success_message")
            );
          }
        } catch (error) {
          this.payoutRequest.loading = false;
          this.$toast.error(error.response.data.message);
        }
      }else{
        this.$toast.error(this.$i18n.t("payout_alert_text"));
        this.$router.push(this.localePath(pathData.coach.payoutInformation));
        // setTimeout( () => this.localePath(pathData.coach.payoutInformation)), 5000);
      }
    },
    async fetchData() {
      try {
        let { data } = await coachBalanceEarningApi(this.$axios).get({});
        if (data.balanceEarnings) {
          data.balanceEarnings.forEach(item => {
            this.items.push({
              id: item.id,
              date: item.date,
              description: item.description,
              customerName: item.customerName,
              amount: item.amount,
              fee: item.fee,
              income: item.income,
              savings: item.savings,
              savingsToBalanceTransferredAmount:
                item.savingsToBalanceTransferredAmount,
              balanceToPaidTransferredAmount:
                item.balanceToPaidTransferredAmount,
              balance: item.balance,
              paid: item.paid
            });
          });
        }

        if (data.currentBalance) {
          this.readyToPayout.amount = data.currentBalance.amount;
          this.readyToPayout.currency = data.currentBalance.currency;
        }

        if (data.payoutRequest.last) {
          this.payoutRequest.lastRequestTime = data.payoutRequest.last.date;
        }
        if (data.dashboardInfo) {
          this.startDate = this.moment(data.dashboardInfo.startDate);
          this.endDate = this.moment(data.dashboardInfo.endDate);
          this.dashboardInfo.newCustomers = data.dashboardInfo.newCustomers;
          this.dashboardInfo.totalIncome = data.dashboardInfo.totalIncome;
          this.dashboardInfo.averageRevenuePerCustomer =
            data.dashboardInfo.averageRevenuePerCustomer;
          this.dashboardInfo.totalPackageSold =
            data.dashboardInfo.totalPackageSold;
          this.dashboardInfo.totalSessionCompleted =
            data.dashboardInfo.totalSessionCompleted;
          this.dashboardInfo.currency = data.dashboardInfo.currency;
        }

        if (data.timeLine) {
          this.chartdata.xaxis = [];
          this.chartdata.yaxis.newCustomers = [];
          this.chartdata.yaxis.totalIncome = [];
          data.timeLine.forEach(item => {
            this.chartdata.xaxis.push(item.month);
            this.chartdata.yaxis.newCustomers.push(item.customer);
            this.chartdata.yaxis.totalIncome.push(item.income);
          });
          this.fillData();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async fetchPayoutInfo() {
      try {
        const { data } = await coachPayoutInformationApi(this.$axios).get();
        if(data.data && data.data.accHolderName == null){
          this.isEmptyPayoutDetails = true;
        }else{
          this.isEmptyPayoutDetails = false;
        }
      } catch (error) {
        this.$toast.error(error.response.data.errors[0]);
      } finally {
      }
    },
    handleBack(){
      this.$router.push(this.localePath(pathData.coach.profileMenu));
    }
  }
};
</script>

<style lang="scss">
.balance-table{
  &--header{
    font-family: 'Open Sans'!important;
    font-style: normal!important;
    font-weight: 600!important;
    font-size: 12px!important;
    line-height: 16px!important;
    letter-spacing: 0.05em!important;
    text-transform: uppercase!important;
    color: #49556A!important;
    background-color: #F7FAFC!important;
  }
}

.profile-title{
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
.bottom-text{
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  /* identical to box height */

  display: flex;
  align-items: center;
  text-align: center;

  /* Dusty blue */

  color: #15577C;
}
.theme--dark.v-btn.v-btn--disabled.v-btn--has-bg {
    background-color: rgb(202 213 225) !important;
    /* color: white; */
}
.balance-earnings-page {
  background: $body-bg;
  height: 100%;
  .filter-content {
    font-family: $font-family;
    font-size: 14px;
    line-height: 19px;
    color: $primary-light-1;
  }
  .filter-text {
    font-family: $font-family;
    font-size: 11px;
    line-height: 15px;
    text-transform: uppercase;
    color: #6f8098;
  }
  .balance-card {
    width: 100%;
    /* Shadow-2 */
    box-shadow: 0px 2px 4px rgba(73, 85, 106, 0.15);
    .first-row-first-col {
      border-radius: 10px 0px 0px 0px;
    }
    .last-row-first-col {
      border-radius: 0px 0px 0px 10px;
    }
    &__row {
      width: 100%;
      display: flex;
      border-bottom: 1px solid $body-bg;
    }
    &__col-1 {
      text-align: right;
      padding-top: 15px;
      padding-bottom: 15px;
      height: auto;
      background: #cad5e1;
      width: 35%;

      font-family: $font-family;
      font-size: 14px;
      padding-right: 10px;
      color: $primary-light-1;
    }
    &__col-2 {
      padding-left: 10px;
      padding-top: 15px;
      padding-bottom: 15px;
      width: 55%;
      font-family: $font-family;
      font-size: 14px;
      background: #fcfdfe;
      color: #9faec2;
    }
    &__col-3 {
      background: #fcfdfe;
      text-align: right;
      padding-right: 8px;
      padding-top: 15px;
      padding-bottom: 14px;
      width: 10%;
    }
    .last-row-last-col {
      border-radius: 0px 0px 10px 0px;
    }
    .first-row-last-col {
      border-radius: 0px 10px 0px 0px;
    }
  }
  thead {
    tr {
      th {
        white-space: nowrap;
        height: 70px;
        .th-col-text {
          // font-family: $font-family;
          // font-weight: normal;
          // color: $primary-light-1;
          // font-size: 16px;
          font-family: 'Open Sans'!important;
          font-style: normal!important;
          font-weight: 600!important;
          font-size: 12px!important;
          line-height: 16px!important;
          letter-spacing: 0.05em!important;
          text-transform: uppercase!important;
          color: $grey-700!important;
        }

        .th-col-icon {
          height: 13px;
          color: $grey-700!important;
        }
        .currency-code {
          font-family: $font-family;
          font-size: 8px;
         color: $grey-700!important;
        }
      }
    }
  }
  .border-bottom--dotted {
    border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
  }
  .border-left--dotted {
    border-left: 1px dotted #9faec2;
  }
  /* Tooltip container */
  .tooltip {
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted black; /* If you want dots under the hoverable text */

    .tooltip-text {
      visibility: hidden;
      width: 120px;
      background-color: black;
      color: #fff;
      text-align: center;
      padding: 5px 0;
      border-radius: 6px;
      position: absolute;
      z-index: 1;
      top: -5px;
      left: 105%;
    }
  }
  .tooltip:hover .tooltip-text {
    visibility: visible;
    transition: opacity 0.6s;
  }

  .payout-info-card {
    // max-width: 250px;
    background: rgba(110, 181, 203, 0.4);
    /* Shadow-2 */

    box-shadow: 0px 2px 4px rgba(73, 85, 106, 0.15);
    border-radius: 8px;
    border-radius: 10px;
    padding-top: 15px;
    padding-bottom: 15px;
    &__title {
      font-family: $font-family;
      font-size: 14px;
      line-height: 19px;
      text-align: center;
      color: #6f8098;
    }
    &__sub-title {
      font-family: $font-family;
      font-size: 14px;
      line-height: 19px;

      text-align: center;
      color: #15577c;
    }
    .payout-info-card-description {
      padding-top: 10px;
      display: flex;
      justify-content: center;
      &__amount {
        font-family: Open Sans;
        font-style: normal;
        font-weight: bold;
        font-size: 36px;
        line-height: 49px;
        text-align: right;
        color: #49556a;
      }
      &__currency {
        font-family: Open Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        color: #6f8098;
        margin-top: 20px;
        margin-left: 10px;
      }
    }
  }

  .last-request {
    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 19px;
    color: #6f8098;
  }

  .package--circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #72a56a;
  }
  .session--circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #d0c02e;
  }

  /* Custome Loader */
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  /* Custome Loader */
}
</style>
