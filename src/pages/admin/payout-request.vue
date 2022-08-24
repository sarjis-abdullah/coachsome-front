<template>
  <v-container fluid >
    <mobile-top-nav extraClass="body-bg-secondary" :headerText="$t('pwa_payout_menu')">
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
    <desktop-top-nav extraClass="body-bg-secondary" :headerText="$t('pwa_payout_menu')"></desktop-top-nav>

    <v-row :class="{'px-10' : $vuetify.breakpoint.mdAndUp}">
      <v-col cols="12" :class="{'pt-5' : $vuetify.breakpoint.xsOnly}">
        <div>
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
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-title>
            <v-data-table
              :headers="table.headers"
              :items="table.rows"
              :search="search"
            >
              <template v-slot:item.name="{ item }">
                <div class="name-btn">
                  {{ item.name }}
                </div>
              </template>

              <template v-slot:item.image="{ item }">
                <div class="name-btn" @click="changeUser(item.userId)">
                  <v-btn icon v-if="!item.image">
                    <v-icon size="50">mdi-account-box</v-icon>
                  </v-btn>
                  <div v-if="item.image">
                    <router-link to="#">
                      <v-img width="35" :src="item.image"></v-img>
                    </router-link>
                  </div>
                </div>
              </template>

              <template v-slot:item.actions="{ item }">
                <v-btn
                  :color="item.status == 'Paid' ? 'success' : 'yellow'"
                  depressed
                  small
                  @click.stop="handlePaidPayoutRequest(item)"
                >
                  {{ item.status == "Paid" ? "Paid" : "Pending" }}
                </v-btn>
              </template>
            </v-data-table>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { imageService } from "@/services";
import { adminPayoutRequestApi, adminImpersonateApi } from "@/api";
import { pathData } from "@/data";
import MobileTopNav from '@/components/layout/global/MobileTopNav';
import DesktopTopNav from '@/components/layout/global/DesktopTopNav.vue';

export default {
  layout: "admin",
  components: {MobileTopNav, DesktopTopNav},
  data() {
    return {
      search: "",
      activityStatusList: [],
      starStatusList: [],
      userEdit: {
        editedIndex: -1,
        dialog: false,
        reasonDialog: false,
        data: {
          id: "",
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
        headers: [
          {
            text: "Id",
            align: "start",
            filterable: false,
            value: "id"
          },
          { text: "Switch", value: "image" },
          { text: "Name", value: "name" },
          { text: "Email", value: "email" },
          { text: "Amount", value: "amount" },
          { text: "Currency", value: "currency" },
          { text: "Status", value: "status" },
          { text: "Request Time", value: "requestTime" },
          { text: "Actions", value: "actions" }
        ],
        rows: []
      }
    };
  },
  methods: {
    handleBack(){
      this.$router.push(this.localePath(pathData.admin.profileMenu));
    },
    async handlePaidPayoutRequest(item) {
      let payload = {
        payoutRequestId: item.id
      };

      // console.log(payload);
      try {
        let { data } = await adminPayoutRequestApi(this.$axios).paid(payload);

        if (data.payoutRequest) {
          item.status = data.payoutRequest.status;
        }
        if (data.message) {
          this.$toast.success(data.message);
        }
      } catch (error) {
        if (error.response.data.message) {
          this.$toast.error(error.response.data.message);
        }
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
  },
  created() {
    adminPayoutRequestApi(this.$axios)
      .get()
      .then(({ data }) => {
        if (data.payoutRequests) {
          data.payoutRequests.map(item => {
            let row = {};
            row.id = item.id;
            row.image = item.image;
            row.email = item.email;
            row.name = item.name;
            row.amount = item.amount;
            row.status = item.status;
            row.currency = item.currency;
            row.requestTime = item.requestTime;
            row.userId = item.userId;
            this.table.rows.push(row);
          });
        }
      })
      .catch(() => {});
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
