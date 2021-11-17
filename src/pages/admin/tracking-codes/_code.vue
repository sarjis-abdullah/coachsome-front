<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" class="pb-0">
          <div class="page-title">Tracking Codes</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <div class="line"></div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="trackingCodes"
              :search="search"
            ></v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { adminPromoCodeApi } from "@/api";
import { currencyService } from "@/services";

export default {
  head() {
    return {
      title: "Tracking Codes"
    };
  },
  layout: "admin",
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Order Id",
          align: "start",
          filterable: false,
          value: "orderId"
        },
        { text: "Customer Name", value: "customerName" },
        { text: "Coach Name", value: "coachName" },
        { text: "Order Date", value: "orderDate" },
        { text: "Package Name", value: "packageName" },
        { text: "Status", value: "status" },
        { text: "amount", value: "amount" }
      ],
      trackingCodes: []
    };
  },
  created() {
    this.getTrackingCode();
  },
  methods: {
    getTrackingCode() {
      adminPromoCodeApi(this.$axios)
        .getTrackingCode(this.$route.params.code)
        .then(({ data }) => {
          if (data.data) {
            this.trackingCodes = data.data.map(item => {
              return {
                orderId: item.orderId,
                customerName: item.customerName,
                coachName: item.coachName,
                orderDate: item.orderDate,
                packageName: item.packageName,
                status: item.status,
                amount: item.amount
              };
            });
          }
          console.log(data);
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
