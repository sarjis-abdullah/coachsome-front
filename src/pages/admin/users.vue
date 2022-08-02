<template>
  <v-container fluid :class="{'px-10' : $vuetify.breakpoint.mdAndUp}">
    <mobile-top-nav extraClass="body-bg-secondary" :headerText="$t('pwa_user_list')">
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
          @click.stop="userCreate.dialog = true"
        >
          <v-icon style="font-size: 25px!important;" class="common-top-add-icon">
            mdi-plus-circle-outline
          </v-icon>
        </v-btn>
      </template>
    </mobile-top-nav>


    <v-row class="d-none d-md-block">
      <v-col cols="12" class="pb-0">
        <div class="page-title">{{$t('pwa_user_list')}}</div>
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
                  <!-- <AddButton @add="userCreate.dialog = true" title="Add new user"/> -->
                  <v-btn @click="userCreate.dialog = true" :block="$vuetify.breakpoint.smAndDown" class="white--text" depressed color="#15577C">
                    {{$t("add_new_user")}}
                  </v-btn>
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

            <!-- User Edit Dialog -->
            <v-dialog
              v-model="userEdit.dialog"
              persistent
              max-width="70%"
              scrollable
            >
              <v-card>
                <v-card-title>
                  <span class="title black--text">User Profile</span>
                  <span class="ml-5 primary-light-1--text">{{
                    userEdit.data.name
                  }}</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-container>
                    <!-- General Group -->
                    <v-row>
                      <v-col cols="12">
                        <span class="subtitle-2">General</span>
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

                    <!-- Role -->
                    <v-row>
                      <v-col cols="12" md="6">
                        <div class="section-title pb-2">Role</div>
                        <div class="section-description">
                          Role is the part of the system.
                        </div>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-select
                          solo
                          v-model="userEdit.data.roleId"
                          :items="roleList"
                          item-text="name"
                          item-value="id"
                          label="Select badge"
                        ></v-select>
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

                    <!-- Ranking Group -->
                    <v-row>
                      <v-col cols="12">
                        <span class="subtitle-2">Ranking</span>
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
                  </v-container>
                </v-card-text>
                <v-divider></v-divider>
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

            <!-- User Create Dialog -->
            <template>
              <v-row justify="center">
                <v-dialog
                  v-model="userCreate.dialog"
                  persistent
                  max-width="600px"
                >
                  <v-card  class="body-bg">
                    <v-card-title class="pl-8 pt-8">
                      <FormHeader title="Add new user" @close="userCreate.dialog = false" />
                    </v-card-title>
                    
                    <v-card-text>
                      <v-container>
                        <v-form
                          ref="form"
                          v-model="userCreate.valid"
                          lazy-validation
                        >
                          <v-row>
                            <v-col cols="12" sm="12">
                              <header class="d-flex">
                                <div class="custom-label">First name</div>
                                <div class="pl-1 red--text">*</div>
                              </header>
                              <v-text-field
                                outlined
                                dense
                                background-color="white"
                                placeholder="Enter first name"
                                v-model="userCreate.initialValue.firstName"
                                :rules="[v => !!v || 'First name is required']"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12">
                              <header class="d-flex">
                                <div class="custom-label">Last name</div>
                                <div class="pl-1 red--text">*</div>
                              </header>
                              <v-text-field
                                outlined
                                dense
                                background-color="white"
                                placeholder="Enter last name"
                                v-model="userCreate.initialValue.lastName"
                                :rules="[v => !!v || 'Last name is required']"
                                persistent-hint
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12">
                              <header class="d-flex">
                                <div class="custom-label">Email</div>
                                <div class="pl-1 red--text">*</div>
                              </header>
                              <v-text-field
                                outlined
                                dense
                                background-color="white"
                                placeholder="Enter email address"
                                v-model="userCreate.initialValue.email"
                                :rules="[
                                  v => !!v || 'E-mail is required',
                                  v =>
                                    /.+@.+\..+/.test(v) ||
                                    'E-mail must be valid'
                                ]"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12">
                              <header class="d-flex">
                                <div class="custom-label">Role</div>
                                <div class="pl-1 red--text">*</div>
                              </header>
                              <v-select
                                outlined
                                dense
                                background-color="white"
                                :items="roleList"
                                v-model="userCreate.initialValue.role"
                                item-text="displayName"
                                item-value="id"
                                :rules="[v => !!v || 'Role is required']"
                                placeholder="Select role"
                                required
                              ></v-select>
                            </v-col>
                            <v-col cols="12">
                              <header class="d-flex">
                                <div class="custom-label">Password</div>
                                <div class="pl-1 red--text">*</div>
                              </header>
                              <v-text-field
                                outlined
                                dense
                                background-color="white"
                                v-model="userCreate.initialValue.password"
                                placeholder="Enter password"
                                :rules="[
                                  v => !!v || 'Password is required',
                                  v =>
                                    /^(?=.*[A-Z]).*$/.test(v) ||
                                    'At least one upper case letter',
                                  v =>
                                    (v && v.length >= 6) ||
                                    'Min 6 character needed'
                                ]"
                                type="password"
                                required
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-form>
                      </v-container>
                    </v-card-text>
                    <v-card-actions class="pl-9 pb-8">
                      <v-btn
                        color="primary-light-1"
                        elevation="2"
                        @click="handleUserCreateSaveBtn"
                      >
                        Create new user
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
            </template>
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
import MobileTopNav from '@/components/layout/global/MobileTopNav'
import AddButton from '@/components/layout/global/AddButton'
import FormHeader from '@/components/layout/global/FormHeader'

export default {
  layout: "admin",
  components: {
    VuePhoneNumberInput,
    MobileTopNav,
    AddButton,
    FormHeader
  },
  data() {
    return {
      search: "",
      badges: [],
      activityStatusList: [],
      starStatusList: [],
      roleList: [],
      userCreate: {
        dialog: false,
        valid: true,
        initialValue: {
          firstName: "",
          lastName: "",
          email: "",
          role: null,
          password: ""
        }
      },
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
          badgeId: null,
          roleId: null
        }
      },
      table: {
        headers: [
          {
            text: "id",
            align: "start",
            filterable: false,
            value: "id"
          },
          { text: "switch", value: "image" },
          { text: "name", value: "name" },
          { text: "Email", value: "email" },
          { text: "type", value: "type" },
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
  watch: {
    "userCreate.dialog": function() {
      this.userCreate.initialValue.firstName = "";
      this.userCreate.initialValue.lastName = "";
      this.userCreate.initialValue.email = "";
      this.userCreate.initialValue.role = null;
      this.userCreate.initialValue.password = "";
    }
  },
  created() {
    this.getUser();
  },
  methods: {
    handleBack(){
      this.$router.push(this.localePath(pathData.admin.profileMenu));
    },
    handleUserCreateSaveBtn() {
      if (this.$refs.form.validate()) {
        adminUserApi(this.$axios)
          .storeUser(this.userCreate.initialValue)
          .then(({ data }) => {
            if (data.user) {
              let formattedRowList = this.formatUserRow([{ ...data.user }]);
              this.table.rows.unshift(formattedRowList[0]);
              this.$toast.success("The user is created successfully.");
              this.userCreate.dialog = false;
            }
            console.log(data);
          })
          .catch(({ response }) => {
            const { data } = response;
            if (data.message) {
              this.$toast.error(data.message);
            }
          });
      }
    },
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
          if (data.roles) {
            this.roleList = data.roles;
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
      payload.roleId = this.userEdit.data.roleId;
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
            const index = this.table.rows.findIndex(
              item => item.id == data.user.id
            );
            Object.assign(
              this.table.rows[index],
              this.formatUserItem(data.user)
            );
            // console.log(this.table.rows[index]);
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
      this.userEdit.data.roleId = null;
    },
    makeUserTableRow(users) {
      this.table.rows = [];
      this.table.rows = this.formatUserRow(users);
    },
    formatUserRow(users) {
      return users.map(item => {
        return this.formatUserItem(item);
      });
    },
    formatUserItem(item) {
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
        roleId: item.roles.length ? item.roles[0].id : null,
        booking: item.booking,
        decline: item.declined,
        package: item.packageCount,
        media: item.mediaCount,
        activityStatusReason: item.activityStatusReason,
        activityStatusId: item.activityStatusId,
        starStatusId: item.starStatusId
      };
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
        // console.log(selectedRow);
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
        this.userEdit.data.roleId = selectedRow.roleId;
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
          this.$store.dispatch("putToken", data.accessToken);
          if (this.$store.getters.isAuthenticated) {
            this.$store.dispatch("setUser", data.user);
          }
          this.$store.dispatch("activeBottomNav", 0);
          if (this.$auth.hasRole(["coach"])) {
            this.$router.push(this.localePath(pathData.coach.home));
          } else if (this.$auth.hasRole(["athlete"])) {
            this.$router.push(this.localePath(pathData.athlete.home));
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
.custom-label {
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #49556A;
  padding-bottom: 8px;
}
</style>
