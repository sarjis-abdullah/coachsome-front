<template>
  <v-container>
    <v-row class="page-top-header-row d-md-none" style="background: #ecf2f7">
      <v-col cols="12" class="justify-center page-top-header-column px-0 mx-0">
          <v-list width="100%" color="transparent" class="py-0 my-0">
              <v-list-item class="pl-0 ml-0">
                <v-btn
                  icon
                  @click="handleBack"
                >
                  <v-icon x-large color="#15577C">mdi-chevron-left</v-icon>
                </v-btn>
                <v-list-item-content class="pl-1 py-0 my-0">
                  <v-list-item-title class="common-top-page-title"
                    v-text="$t('pwa_payout_menu')"
                  ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
          </v-list>
          <div class="line"></div>
      </v-col>
    </v-row>
    <v-row class="d-none d-md-block">
      <v-col cols="12" class="pb-0">
        <div class="page-title">{{$t('pwa_payout_menu')}}</div>
      </v-col>
    </v-row>

    <v-row class="d-none d-md-block">
      <v-col cols="12">
        <div class="line"></div>
      </v-col>
    </v-row>

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

export default {
  layout: "admin",
  components: {},
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

      console.log(payload);
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
