<template>
  <v-container fluid>
    <mobile-top-nav extraClass="body-bg-secondary" :headerText="$t('pwa_order_list')">
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

    <v-row class="d-none d-md-block">
      <v-col cols="12" class="pb-0">
        <div class="page-title">{{$t('pwa_order_list')}}</div>
      </v-col>
    </v-row>

    <v-row class="d-none d-md-block">
      <v-col cols="12">
        <div class="line"></div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <div>
          <v-card>
            <v-card-title>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="search"
                    prepend-inner-icon="search"
                    label="Search"
                    single-line
                    solo
                    clearable
                    hide-details
                  >
                    <!-- <template v-slot:append-outer>
                      <div>
                        <v-menu offset-y :close-on-content-click="false">
                          <template v-slot:activator="{ attrs, on }">
                            <v-btn small icon v-bind="attrs" v-on="on">
                              <v-icon small> fa-sort-down </v-icon>
                            </v-btn>
                          </template>

                          <v-card
                            :loading="loading"
                            class="mx-auto"
                            max-width="400"
                          >
                            <v-card-text>
                              <v-row>
                                <v-col>
                                  <v-text-field
                                    v-model="searchField.orderId"
                                    label="Order Id"
                                    required
                                    hide-details
                                  ></v-text-field>
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-col>
                                  <v-text-field
                                    v-model="searchField.coachName"
                                    label="Coach Name"
                                    required
                                    hide-details
                                  ></v-text-field>
                                </v-col>
                                <v-col>
                                  <v-text-field
                                    v-model="searchField.customerName"
                                    label="Customer Name"
                                    required
                                    hide-details
                                  ></v-text-field>
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-col>
                                  <v-text-field
                                    v-model="searchField.packageName"
                                    label="Package Name"
                                    required
                                    hide-details
                                  ></v-text-field>
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-col>
                                  <v-select
                                    v-model="searchField.status"
                                    :items="[
                                      'All',
                                      'Initial',
                                      'Pending',
                                      'Capture',
                                    ]"
                                    label="Status"
                                    required
                                  ></v-select>
                                </v-col>
                                <v-col>
                                  <v-menu
                                    v-model="menu2"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"
                                  >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-text-field
                                        v-model="searchField.bookingDate"
                                        label="Booking Date"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                      ></v-text-field>
                                    </template>
                                    <v-date-picker
                                      v-model="searchField.bookingDate"
                                      @input="menu2 = false"
                                    ></v-date-picker>
                                  </v-menu>
                                </v-col>
                              </v-row>
                            </v-card-text>

                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                depressed
                                color="primary-light-1"
                                @click="reserve"
                              >
                                Search
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-menu>
                      </div>
                    </template> -->
                  </v-text-field>
                </v-col>
              </v-row>
            </v-card-title>
            <v-data-table
              :headers="table.newHeaders"
              :items="table.rows"
              :search="search"
              :options.sync="table.options"
              :loading="table.loading"
              :footer-props="{
                itemsPerPageOptions: [10, 20, 30, -1]
              }"
            >
              <template v-slot:item.customerSwitch="{ item }">
                <div
                  class="name-btn"
                  @click="changeUser(item.packageBuyerUserId)"
                >
                  <v-btn icon v-if="!item.packageBuyerImage">
                    <v-icon size="50">mdi-account-box</v-icon>
                  </v-btn>
                  <div v-if="item.packageBuyerImage">
                    <router-link to="#">
                      <v-img width="35" :src="item.packageBuyerImage"></v-img>
                    </router-link>
                  </div>
                </div>
              </template>
              <template v-slot:item.coachSwitch="{ item }">
                <div
                  class="name-btn"
                  @click="changeUser(item.packageOwnerUserId)"
                >
                  <v-btn icon v-if="!item.packageOwnerImage">
                    <v-icon size="50">mdi-account-box</v-icon>
                  </v-btn>
                  <div v-if="item.packageOwnerImage">
                    <router-link to="#">
                      <v-img width="35" :src="item.packageOwnerImage"></v-img>
                    </router-link>
                  </div>
                </div>
              </template>
              <template v-slot:item.name="{ item }">
                <div class="name-btn">
                  <v-btn
                    @click.stop="
                      setUserDataToEdit(item);
                      userEdit.dialog = true;
                    "
                    text
                    >{{ item.name }}</v-btn
                  >
                </div>
              </template>
              <template v-slot:item.booking_info="{ item }">
                <div>
                  <v-tooltip v-model="show" top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn icon v-bind="attrs" v-on="on">
                        <v-icon color="grey lighten-1">
                          info
                        </v-icon>
                      </v-btn>
                    </template>
                    <span> {{ item.bookingInfo.orderKey }} </span>
                  </v-tooltip>
                </div>
              </template>
              <template v-slot:item.balance="{ item }">
                <div>
                  {{ item.currentBalance.amount }}
                </div>
              </template>
              <template v-slot:item.actions="{ item }">
                <div>
                  <v-btn
                    target="_blank"
                    color="primary-light-1"
                    x-small
                    outlined
                    :href="item.paymentUrl"
                    >Gateway</v-btn
                  >
                </div>
              </template>
            </v-data-table>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { adminOrderListApi, adminUserApi, adminImpersonateApi } from "@/api";
import { currencyService, imageService } from "@/services";
import "vue-phone-number-input/dist/vue-phone-number-input.css";
import { pathData } from "@/data";
import MobileTopNav from '@/components/layout/global/MobileTopNav'

export default {
  layout: "admin",
  components: {MobileTopNav},
  data() {
    return {
      currencyConfig: currencyService.selectedCurrency(),
      search: "",
      searchField: {
        orderId: "",
        coachName: "",
        customerName: "",
        packageName: "",
        status: "",
        bookingDate: new Date().toISOString().substr(0, 10)
      },
      activityStatusList: [],
      starStatusList: [],
      userEdit: {
        editedIndex: -1,
        dialog: false,
        reasonDialog: false,
        data: {
          id: null,
          name: "",
          email: "",
          phone: {
            code: "",
            number: ""
          },
          ranking: null,
          skillLevelSlider: {
            min: 0,
            max: 100,
            value: 40
          },
          starStatusId: null,
          activityStatusId: null,
          reason: null
        }
      },
      table: {
        page: 1,
        numberOfPages: 1,
        options: {
          itemsPerPage: 10
        },
        totalOrders: 10,
        loading: false,
        newHeaders: [
          {
            text: "Id",
            align: "start",
            filterable: false,
            value: "id"
          },
          { text: "Order Id", value: "orderId" },
          { text: "Customer name", value: "customerName" },
          { text: "Customer Switch", value: "customerSwitch" },
          { text: "Coach name", value: "coachName" },
          { text: "Coach switch", value: "coachSwitch" },
          { text: "Order Date", value: "orderDate" },
          { text: "Package Name", value: "packageName" },
          { text: "Status", value: "status" },
          { text: "Amount", value: "amount" },
          { text: "Session", value: "session" },
          { text: "Actioins", value: "actions" }
        ],
        headers: [
          {
            text: "Id",
            align: "start",
            filterable: false,
            value: "id"
          },
          { text: "Switch", value: "image" },
          { text: "Name", value: "name" },
          { text: "Type", value: "type" },
          { text: "Status", value: "status" },
          { text: "Rank", value: "rank" },
          { text: "Booking", value: "booking" },
          { text: "Declinded", value: "decline" },
          { text: "Packages", value: "package" },
          { text: "Media", value: "media" }
        ],
        rows: []
      }
    };
  },
  watch: {},
  created() {
    this.fetchOrderList();
    // adminUserApi
    //   .getUserList()
    //   .then(({ data }) => {
    //     if (data.activityStatusList) {
    //       this.activityStatusList = data.activityStatusList;
    //     }

    //     if (data.starStatusList) {
    //       this.starStatusList = data.starStatusList;
    //     }

    //     if (data.users) {
    //       this.makeUserTableRow(data.users);
    //     }
    //     this.hideLoading();
    //   })
    //   .catch(() => {
    //     this.hideLoading();
    //   });
  },
  methods: {
    handleBack(){
      this.$router.push(this.localePath(pathData.admin.profileMenu));
    },
    async fetchOrderList() {
      this.table.loading = true;
      try {
        const { page, itemsPerPage } = this.table.options;
        const { data } = await adminOrderListApi(this.$axios).get({
          page,
          per_page: itemsPerPage
        });
        this.table.rows = [];
        data.data.forEach(item => {
          // console.log(item);
          this.table.rows.push({
            id: item.bookingId,
            orderId: item.orderKey,
            customerName: item.packageBuyerName,
            packageOwnerImage: item.packageOwnerImage,
            packageBuyerImage: item.packageBuyerImage,
            coachName: item.packageOwnerName,
            orderDate: item.bookingDate,
            packageName: item.packageName,
            status: item.status,
            amount: item.amount,
            packageBuyerUserId: item.packageBuyerUserId,
            packageOwnerUserId: item.packageOwnerUserId,
            session: item.session,
            paymentUrl: item.paymentUrl
          });
        });
        if (data.pagination) {
          this.table.page = data.pagination.current_page;
          this.table.numberOfPages = data.pagination.total_pages;
          this.table.totalOrders = data.pagination.total;
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.table.loading = false;
      }
    },
    updateUser() {
      let payload = {};
      payload.id = this.userEdit.data.id;
      payload.email = this.userEdit.data.email;
      payload.phoneCode = this.userEdit.data.phone.code;
      payload.phoneNumber = this.userEdit.data.phone.number;
      payload.skillLevelValue = this.userEdit.data.skillLevelSlider.value;
      payload.starStatusId = this.userEdit.data.activityStatusId;
      payload.activityStatusId = this.userEdit.data.activityStatusId;
      payload.activityStatusReason = this.userEdit.data.reason;

      adminUserApi(this.$axios)
        .updateUser(payload)
        .then(({ data }) => {
          if (data.status == "success") {
            let rowIndex = this.table.rows.findIndex(
              item => item.id == data.user.id
            );
            this.table.rows[rowIndex].status = data.user.status;
            this.table.rows[rowIndex].phoneCode = data.user.phoneCode;
            this.table.rows[rowIndex].phoneNumber = data.user.phoneNumber;
            this.table.rows[rowIndex].activityStatusId =
              data.user.activityStatusId;
            this.table.rows[rowIndex].activityStatusReason =
              data.user.activityStatusReason;
            this.userEdit.dialog = false;
            this.$toast.success(data.message);
          }

          if (data.user) {
            const rowItem = this.table.rows.find(
              item => item.id == data.user.id
            );
            rowItem.id = data.user.id;
            rowItem.image = data.user.image;
            rowItem.email = data.user.email;
            rowItem.phoneCode = data.user.phoneCode;
            rowItem.phoneNumber = data.user.phoneNumber;
            rowItem.phoneText = data.user.phoneText;
            rowItem.name = data.user.fullName;
            rowItem.type = data.user.type;
            rowItem.status = data.user.status;
            rowItem.rank = data.user.rank;
            rowItem.booking = data.user.booking;
            rowItem.decline = data.user.declined;
            rowItem.package = data.user.packageCount;
            rowItem.media = data.user.mediaCount;
            rowItem.activityStatusReason = data.user.activityStatusReason;
            rowItem.activityStatusId = data.user.activityStatusId;
            rowItem.starStatusId = data.user.starStatusId;
          }
        })
        .catch(({ response }) => {
          if (response.data.status == "error") {
            this.$toast.error(response.data.message);
          }
        });
    },
    makeUserTableRow(users) {
      this.table.rows = [];
      this.table.rows = users.map(item => {
        return {
          id: item.id,
          image: item.image ? item.image : null,
          email: item.email,
          phoneCode: item.phoneCode,
          phoneNumber: item.phoneNumber,
          phoneText: item.phoneText,
          name: item.fullName,
          type: item.type,
          status: item.status,
          rank: item.rank,
          booking: item.booking,
          decline: item.declined,
          package: item.packageCount,
          media: item.mediaCount,
          activityStatusReason: item.activityStatusReason,
          activityStatusId: item.activityStatusId,
          starStatusId: item.starStatusId
        };
      });
    },
    setUserEditDataMobileInfo(item) {
      if (item.countryCode) {
        this.userEdit.data.phone.code = item.countryCode;
      }
      if (item.phoneNumber) {
        this.userEdit.data.phone.number = item.phoneNumber;
      }
    },
    setUserDataToEdit(selectedRow) {
      if (selectedRow) {
        this.userEdit.data.id = selectedRow.id;
        this.userEdit.data.name = selectedRow.name;
        this.userEdit.data.email = selectedRow.email;
        this.userEdit.data.phone.code = selectedRow.phoneCode;
        this.userEdit.data.phone.number = selectedRow.phoneNumber;
        this.userEdit.data.activityStatusId = selectedRow.activityStatusId;
        this.userEdit.data.starStatusId = selectedRow.starStatusId;
        this.userEdit.data.reason = selectedRow.activityStatusReason;
      }
    },
    async changeUser(userId) {
      if (!this.$auth.user.is_switched) {
        try {
          const { data } = await adminImpersonateApi(this.$axios).switched({
            id: userId
          });
          this.$auth.setUser(data.user);
          this.$auth.setUserToken(data.accessToken);
          if (this.$auth.hasRole(["coach"])) {
            this.$router.push(this.localePath(pathData.coach.editProfile));
          } else if (this.$auth.hasRole(["athlete"])) {
            this.$router.push(this.localePath(pathData.athlete.editProfile));
          } else {
            this.$router.push(this.localePath(pathData.admin.dashboard));
          }
        } catch (error) {
          this.$toast.error(error.response.data.message);
        }
      } else {
        this.$toast.error("You are now switched user.");
      }
    },
    getImageUrl(name) {
      return imageService.getImageByName(name);
    }
  }
};
</script>
<style lang="scss" scoped>
.name-btn {
  .v-btn {
    text-transform: none;
    color: $primary-light-1;
  }
  .v-btn:before {
    display: none;
  }
}
</style>
