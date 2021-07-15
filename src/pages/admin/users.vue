<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="pb-0">
        <div class="page-title">User List</div>
      </v-col>
    </v-row>

    <v-row>
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
                  <v-btn @click.stop="setUserDataToEdit(item)" text>{{
                    item.name
                  }}</v-btn>
                </div>
              </template>
              <template v-slot:item.image="{ item }">
                <div class="name-btn" @click="changeUser(item)">
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
            </v-data-table>

            <!-- User Edit Dialog -->
            <v-dialog
              v-model="userEdit.dialog"
              persistent
              max-width="70%"
              scrollable
            >
              <!-- Reason Dialog -->
              <v-dialog v-model="userEdit.reasonDialog" max-width="290">
                <v-card>
                  <v-card-title class="headline">Reason</v-card-title>

                  <v-card-text>
                    <v-textarea
                      solo
                      counter="42"
                      maxlength="42"
                      v-model="userEdit.data.reason"
                      label="Enter the reason"
                    ></v-textarea>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                      color="primary-light-1"
                      text
                      @click="userEdit.reasonDialog = false"
                      >Cancel</v-btn
                    >

                    <v-btn
                      color="primary-light-1"
                      text
                      @click="userEdit.reasonDialog = false"
                      >Ok</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-card>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <span class="title black--text">User Profile</span>
                        <span class="ml-5 primary-light-1--text">{{
                          userEdit.data.name
                        }}</span>
                        <v-divider class></v-divider>
                      </v-col>
                    </v-row>
                    <!-- Email -->
                    <v-row>
                      <v-col cols="12" md="6">
                        <div class="section-title pb-2">EMAIL</div>
                        <div class="section-description">
                          Create a catchy title for your package
                        </div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="userEdit.data.email"
                          label="Email"
                          required
                          solo
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <!-- Mobile -->
                    <v-row>
                      <v-col cols="12" md="6">
                        <div class="section-title pb-2">MOBILE</div>
                        <div class="section-description">
                          This number will be used to notify you of changes in
                          you bookings or other time critical information
                        </div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <VuePhoneNumberInput
                          :default-country-code="userEdit.data.phone.code"
                          :only-countries="['DK', 'US']"
                          v-model="userEdit.data.phone.number"
                          @update="setUserEditDataMobileInfo"
                          :translations="{
                            countrySelectorLabel: $t(
                              'profile_section_mobile_label_country_code'
                            ),
                            phoneNumberLabel: $t(
                              'profile_section_mobile_input_label_phone_number'
                            ),
                            example: $t(
                              'profile_section_mobile_input_label_example'
                            )
                          }"
                        />
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12">
                        <span class="title black--text">Ranking</span>
                        <v-divider class></v-divider>
                      </v-col>
                    </v-row>
                    <!-- Ranking -->
                    <v-row>
                      <v-col cols="12" md="6">
                        <div class="section-title pb-2">RANKING</div>
                        <div class="section-description">
                          Internal ranking points to promote a coach. Calculated
                          from the system
                        </div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-slider
                          color="primary-light-1"
                          v-model="userEdit.data.ranking"
                          :max="100"
                          class="align-center"
                        >
                          <template v-slot:append>
                            <v-text-field
                              v-model="userEdit.data.ranking"
                              class="mt-0 pt-0"
                              type="number"
                              style="width: 60px"
                            ></v-text-field>
                          </template>
                        </v-slider>
                      </v-col>
                    </v-row>

                    <!-- Star Status -->
                    <v-row>
                      <v-col cols="12" md="6">
                        <div class="section-title pb-2">STAR STATUS</div>
                        <div class="section-description">
                          This status show a coachsome select status of a
                          specific user in relation to the world
                        </div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-select
                          solo
                          v-model="userEdit.data.starStatusId"
                          :items="starStatusList"
                          item-text="display_text"
                          item-value="id"
                          label="Select status"
                          persistent-hint
                          single-line
                        ></v-select>
                      </v-col>
                    </v-row>

                    <!-- Skill Level -->
                    <v-row>
                      <v-col cols="12" md="6">
                        <div class="section-title pb-2">SKILL LEVEL</div>
                        <div class="section-description">
                          This is a Coachsome chosen skill level on the coach
                          and it is an estimation from our limited experience
                        </div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <span>
                          <v-slider
                            v-model="userEdit.data.skillLevelSlider.value"
                            :min="userEdit.data.skillLevelSlider.min"
                            :max="userEdit.data.skillLevelSlider.max"
                          ></v-slider>
                        </span>
                      </v-col>
                    </v-row>

                    <!-- Coach badge -->
                    <v-row>
                      <v-col cols="12" md="6">
                        <div class="section-title pb-2">Coach badge</div>
                        <div class="section-description">
                          Select the badge the coach should have. There are four
                          levels total.
                        </div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-select
                          solo
                          v-model="userEdit.data.badgeId"
                          :items="badges"
                          item-text="name"
                          item-value="id"
                          label="Select badge"
                        ></v-select>
                      </v-col>
                    </v-row>

                    <!-- User Status -->
                    <v-row>
                      <v-col cols="12" md="6">
                        <div class="section-title pb-2">USER STATUS</div>
                        <div class="section-description">
                          This status show a coachsome select status of a
                          specific user in relation to the world
                        </div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-select
                          @change="userEdit.reasonDialog = true"
                          solo
                          v-model="userEdit.data.activityStatusId"
                          :items="activityStatusList"
                          item-text="display_text"
                          item-value="id"
                          label="Select status"
                        ></v-select>
                        <div v-if="userEdit.data.reason">
                          <div class="caption warning--text">Reason</div>
                          <div>{{ userEdit.data.reason }}</div>
                        </div>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary-light-1"
                    text
                    @click="userEdit.dialog = false"
                    >Close</v-btn
                  >
                  <v-btn color="primary-light-1" text @click="updateUser"
                    >Save</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { imageService } from "@/services";
import { adminUserApi, adminImpersonateApi } from "@/api";
import { pathData } from "@/data";
import VuePhoneNumberInput from "vue-phone-number-input";

export default {
  layout: "admin",
  components: {
    VuePhoneNumberInput
  },
  data() {
    return {
      search: "",
      badges: [],
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
          ranking: 0,
          skillLevelSlider: {
            min: 0,
            max: 100,
            value: 40
          },
          starStatusId: null,
          activityStatusId: null,
          reason: null,
          badgeId: null
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
          { text: "Type", value: "type" },
          { text: "Status", value: "status" },
          { text: "Ranking", value: "ranking" },
          { text: "Booking", value: "booking" },
          { text: "Declinded", value: "decline" },
          { text: "Packages", value: "package" },
          { text: "Media", value: "media" }
        ],
        rows: []
      }
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      adminUserApi(this.$axios)
        .getUserList()
        .then(({ data }) => {
          if (data.activityStatusList) {
            this.activityStatusList = data.activityStatusList;
          }

          if (data.badges) {
            this.badges = data.badges;
          }

          if (data.starStatusList) {
            this.starStatusList = data.starStatusList;
          }

          if (data.users) {
            this.makeUserTableRow(data.users);
          }
        })
        .catch(() => {});
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
      payload.ranking = this.userEdit.data.ranking;
      payload.badgeId = this.userEdit.data.badgeId;
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
            rowItem.ranking = data.user.ranking;
            rowItem.badgeId = data.user.badgeId;
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
    resetUserData() {
      this.userEdit.data.id = "";
      this.userEdit.data.email = "";
      this.userEdit.data.phone.code = "";
      this.userEdit.data.phone.number = "";
      this.userEdit.data.skillLevelSlider.value = "";
      this.userEdit.data.activityStatusId = "";
      this.userEdit.data.activityStatusId = "";
      this.userEdit.data.reason = "";
      this.userEdit.data.ranking = "";
      this.userEdit.data.badgeId = null;
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
          ranking: item.ranking,
          badgeId: item.badgeId,
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
      this.resetUserData();
      if (selectedRow) {
        this.userEdit.data.id = selectedRow.id;
        this.userEdit.data.name = selectedRow.name;
        this.userEdit.data.email = selectedRow.email;
        this.userEdit.data.phone.code = selectedRow.phoneCode;
        this.userEdit.data.phone.number = selectedRow.phoneNumber;
        this.userEdit.data.activityStatusId = selectedRow.activityStatusId;
        this.userEdit.data.starStatusId = selectedRow.starStatusId;
        this.userEdit.data.reason = selectedRow.activityStatusReason;
        this.userEdit.data.ranking = selectedRow.ranking;
        this.userEdit.data.badgeId = selectedRow.badgeId;
        this.userEdit.dialog = true;
      }
    },
    async changeUser(item) {
      if (!this.$auth.user.is_switched) {
        try {
          const { data } = await adminImpersonateApi(this.$axios).switched({
            id: item.id
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
