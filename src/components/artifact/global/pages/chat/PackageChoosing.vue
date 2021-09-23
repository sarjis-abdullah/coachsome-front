<template>
  <div class="purchased-package-box">
    <v-card>
      <v-card-text>
        <div
          v-if="hasPuchasedPackage || hasSoldPackage"
          class="package-list-box"
        >
          <div class="package-list-box__title">
            {{ $t("chat_purchased_package_box_title") }}
          </div>
          <div class="package-list-box__sub-title">
            {{ $t("chat_purchased_package_box_desc") }}
          </div>
          <div class="package-list pt-5 pb-5">
            <!-- Purchased package -->
            <div
              class="package-list--purchased"
              v-if="purchasedPackageList.length"
            >
              <div class="package-list__title">
                Purchased package
              </div>
              <v-select
                hide-details
                v-model="selectedPurchasedPackage"
                :items="purchasedPackageList"
                :label="$t('chat_package_box_select_package_placeholder')"
                solo
                @input="handleSelectedPackage"
              >
                <template v-slot:selection="{ item }">
                  <span>{{ item.packageTitle }}</span>
                </template>
                <template v-slot:item="{ item }">
                  <div
                    class="d-flex justify-space-between"
                    style="width: 100%;"
                  >
                    <span
                      >{{ item.packageTitle }} ( {{ item.remainingSession }} of
                      {{ item.totalSession }} remaining. )</span
                    >
                    <span>
                      <v-tooltip right max-width="400">
                        <template v-slot:activator="{ on }">
                          <v-icon small v-on="on" color="primary-light-1"
                            >mdi-information</v-icon
                          >
                        </template>
                        <span>
                          <table class="info-table">
                            <tbody>
                              <tr>
                                <td>Order Key</td>
                                <td class="text-right">
                                  {{ item.info.orderKey }}
                                </td>
                              </tr>
                              <tr>
                                <td>Booking Date</td>
                                <td class="text-right">
                                  {{ item.info.bookingDate }}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </span>
                      </v-tooltip>
                    </span>
                  </div>
                </template>
              </v-select>
            </div>

            <!-- Sold package -->
            <div class="package-list--sold" v-if="soldPackageList.length">
              <div class="package-list__title">
                Sold package
              </div>
              <v-select
                hide-details
                v-model="selectedSoldPackage"
                :items="soldPackageList"
                :label="$t('chat_package_box_select_package_placeholder')"
                solo
                @input="handleSelectedPackage"
              >
                <template v-slot:selection="{ item }">
                  <span>{{ item.packageTitle }}</span>
                </template>
                <template v-slot:item="{ item }">
                  <div
                    class="d-flex justify-space-between"
                    style="width: 100%;"
                  >
                    <span
                      >{{ item.packageTitle }} ( {{ item.remainingSession }} of
                      {{ item.totalSession }} remaining. )</span
                    >
                    <span>
                      <v-tooltip right max-width="400">
                        <template v-slot:activator="{ on }">
                          <v-icon small v-on="on" color="primary-light-1"
                            >mdi-information</v-icon
                          >
                        </template>
                        <span>
                          <table class="info-table">
                            <tbody>
                              <tr>
                                <td>Order Key</td>
                                <td class="text-right">
                                  {{ item.info.orderKey }}
                                </td>
                              </tr>
                              <tr>
                                <td>Booking Date</td>
                                <td class="text-right">
                                  {{ item.info.bookingDate }}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </span>
                      </v-tooltip>
                    </span>
                  </div>
                </template>
              </v-select>
            </div>
          </div>
        </div>
        <div
          v-if="!hasPuchasedPackage && !hasSoldPackage"
          class="d-flex justify-center title"
        >
          {{ $t("chat_purchased_package_no_package_text") }}
        </div>
        <div class="d-flex justify-center">
          <v-btn
            text
            color="#6F8098"
            small
            :style="{ fontWeight: 'bold' }"
            @click="anotherPakcageBtnHandle"
          >
            {{ $t("chat_purchased_box_another_package_text") }}
          </v-btn>
        </div>
        <div class="d-flex justify-center">
          <v-btn text color="#6F8098" small @click="cancelBtnClickHandle">
            {{ $t("chat_purchased_box_btn_label_cancel") }}
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { bookingApi } from "@/api";
import { pathData } from "@/data";

export default {
  props: ["isOpen", "userId"],
  data: () => ({
    userName: "",
    selectedSoldPackage: null,
    selectedPurchasedPackage: null,
    soldPackageList: [],
    purchasedPackageList: []
  }),
  watch: {
    isOpen: function(val) {
      if (val) {
        this.fetchPackageInformation();
      } else {
        this.reset();
      }
    }
  },
  computed: {
    hasPuchasedPackage() {
      return this.purchasedPackageList.length > 0 ? true : false;
    },
    hasSoldPackage() {
      return this.soldPackageList.length > 0 ? true : false;
    }
  },
  mounted() {
    this.fetchPackageInformation();
  },
  methods: {
    reset() {
      this.selectedSoldPackage = null;
      this.selectedPurchasedPackage = null;
      this.soldPackageList = [];
      this.purchasedPackageList = [];
    },
    handleSelectedPackage(item) {
      this.$emit("select-package", item);
    },
    anotherPakcageBtnHandle() {
      if (this.userName) {
        this.$router.push(
          this.localePath(pathData.pages.publicProfile(this.userName))
        );
      } else {
        this.$router.push(this.localePath(pathData.pages.marketplace));
      }
    },
    cancelBtnClickHandle() {
      this.$emit("cancel");
    },
    fetchPackageInformation() {
      bookingApi(this.$axios)
        .getPurchasedPackage({
          selectedUserId: this.userId,
          status: "Completed"
        })
        .then(({ data }) => {
          if (data.soldPackages) {
            this.soldPackageList = data.soldPackages.map(item => {
              return {
                packageOwnerUserId: item.packageOwnerUserId,
                packageBuyerUserId: item.packageBuyerUserId,
                bookingId: item.bookingId,
                orderId: item.orderId,
                packageTitle: item.packageInfo.details.title,
                session: item.packageInfo.details.time_per_session,
                isSold: item.isSold,
                info: item.info,
                totalSession: item.totalSession,
                remainingSession: item.remainingSession
              };
            });
          }

          if (data.purchasedPackages) {
            this.purchasedPackageList = data.purchasedPackages.map(item => {
              return {
                packageOwnerUserId: item.packageOwnerUserId,
                packageBuyerUserId: item.packageBuyerUserId,
                bookingId: item.bookingId,
                orderId: item.orderId,
                packageTitle: item.packageInfo.details.title,
                session: item.packageInfo.details.time_per_session,
                isSold: item.isSold,
                info: item.info,
                totalSession: item.totalSession,
                remainingSession: item.remainingSession
              };
            });
          }

          if (data.userName) {
            this.userName = data.userName;
          }
        })
        .catch(({ response }) => {
          response.data.message && this.$toast.error(response.data.message);
        });
    }
  }
};
</script>

<style lang="scss">
.purchased-package-box {
  .package-list-box {
    &__title {
      display: flex;
      justify-content: center;
      font-family: Roboto;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 21px;
      display: flex;
      align-items: center;
      text-align: center;
      text-transform: uppercase;
      color: #15577c;
    }
    &__sub-title {
      display: flex;
      justify-content: center;
      font-family: Roboto;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      display: flex;
      align-items: center;
      text-align: center;
      color: #2c3749;
    }
  }
  .info-table {
    tbody {
      tr {
        td {
          padding: 10px;
          border: 5px solid red;
        }
      }
    }
  }
}
</style>
