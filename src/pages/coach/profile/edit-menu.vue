<template>

<v-container fluid>
    <mobile-top-nav extraClass="body-bg-secondary" :headerText="$t('pwa_edit_profile_title')">
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
            <v-list class="body-bg">
              <!-- Edit Profile -->
              <v-list-item link @click.stop="handleEditProfile">
                <v-list-item-icon>
                  <v-img :src="require('@/assets/img/svg-icons/new/user-icon.svg')" alt="edit" />
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title class="list-text">{{$t("pwa_profile_menu")}}</v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon>
                  <v-icon class="common-top-back-icon">mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>
              <!-- Packages -->
               <v-list-item link @click.stop="handlePackagesBtn">
                <v-list-item-icon>
                  <v-img  :src="require('@/assets/img/svg-icons/new/gift.svg')" alt="packages" />
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title class="list-text">{{$t("pwa_package_menu")}}</v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon>
                  <v-icon class="common-top-back-icon">mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>

              <!-- Gallery -->
               <v-list-item link @click.stop="handleGalleryBtn">
                <v-list-item-icon>
                  <v-img  :src="require('@/assets/img/svg-icons/new/gallery.svg')" alt="Gallery" />
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title class="list-text">{{$t("pwa_gallery_menu")}}</v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon>
                  <v-icon class="common-top-back-icon">mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>
              
              <!-- Geography -->
              <v-list-item link  @click.stop="handleGeographyBtn">
                <v-list-item-icon>
                  <v-img :src="require('@/assets/img/svg-icons/new/location.svg')" alt="edit" />
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title class="list-text">{{$t("pwa_geography_menu")}}</v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon>
                  <v-icon class="common-top-back-icon">mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>

              <!-- Subscription -->
              <!-- <v-list-item link >
                <v-list-item-icon>
                  <v-img :src="require('@/assets/img/svg-icons/new/subscription.svg')" alt="edit" />
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title class="list-text">Subscription</v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon>
                  <v-icon class="common-top-back-icon">mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item> -->

              

              <!-- Availibility -->
               <v-list-item link @click.stop="handleAvailabilityBtn">
                <v-list-item-icon>
                  <v-img  :src="require('@/assets/img/svg-icons/new/calendar-time.svg')" alt="payment" />
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title class="list-text">{{$t("pwa_availability_menu")}}</v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon>
                  <v-icon class="common-top-back-icon">mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>
              <!-- Reviews -->
               <v-list-item link @click.stop="handleReviewsBtn">
                <v-list-item-icon>
                  <v-img  :src="require('@/assets/img/svg-icons/new/star.svg')" alt="payment" />
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title class="list-text">{{$t("pwa_reviews_menu")}}</v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon>
                  <v-icon class="common-top-back-icon">mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>


            </v-list>
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-col cols="11" class="pr-5 py-0">
            <div class="line"></div>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-list class="body-bg">
              <!-- Profile Status -->
              <v-list-item text>
              <v-list-item-content>
                <v-list-item-title>
                  <v-list-item-title class="list-text">{{$t('edit_profile_status')}}</v-list-item-title>
                </v-list-item-title>
              </v-list-item-content>
                <v-list-item-icon>
                  <client-only>
                    <toggle-button
                      :value="isActive"
                      @input="handleActivityStatus"
                      :color="{ checked: '#5CC866', unchecked: '#EFEFEF' }"
                      :sync="true"
                      :font-size="12"
                      :width="60"
                      :height="30"
                    />
                  </client-only>
                </v-list-item-icon>
            </v-list-item>
            </v-list>
            <!-- Dialog -->
            <v-dialog v-model="activityStatus.dialog" max-width="500">
              <v-card>
                <v-card-title class="headline">{{
                  $t("attention_headline_text")
                }}</v-card-title>
                <v-card-text v-html="$t('attention_content_list')"></v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn
                    color="primary-light-1"
                    text
                    @click="activityStatus.dialog = false"
                    >Ok</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { pathData } from "@/data";
import MobileTopNav from '@/components/layout/global/MobileTopNav'
import { clientBackDrawerApi } from "@/api";
import { avatarHelper } from "@/helper"

export default ({
  layout: "coach",
  components: {MobileTopNav},
  data(){
    return {
      activityStatus: { value: false, dialog: false, loading: false },
      editProfile: {
          name: "Edit Profile",
          path: pathData.coach.editProfile,
          key: "edit_profile",
          icon: "mdi-menu-down",
          t_key: "dropdown_edit_profile"
        },
        athleteEditProfile: {
          name: "Edit Profile",
          path: pathData.athlete.editProfile,
          key: "edit_profile",
          icon: "mdi-menu-down",
          t_key: "dropdown_edit_profile"
        },
    }
  },
  computed: {
      avatarImage() {
        if (this.authUser()) {
          return this.authUser().image;
        } else {
          return this.initialImageContent;
        }
      },
      initialImageContent() {
        // if (this.authUser() && this.authUser().first_name && this.authUser().last_name) {
        //   return (
        //     this.authUser().first_name.substring(0, 1) +
        //     this.authUser().last_name.substring(0, 1)
        //   );
        // } else {
        //   return "";
        // }
        return avatarHelper.getAvatarName(this.authUser());
      },
      isActive() {
        return this.$auth.user.is_active;
      },

    },
    watch:{
    "$vuetify.breakpoint.mdAndUp" : function(){
      this.$router.push(this.localePath(pathData.coach.editProfile));
    }
    },
    methods: {
      handleBackBtnClick(){
        this.$router.push(this.localePath(pathData.coach.profileMenu));
      },
      authUser() {
        return this.$auth.user;
      },
      // async logout() {
      //   this.$nuxt.$loading.start();
      //   await this.$auth.logout();
      //   this.$socket.emit("force_disconnect");
      //   this.$store.dispatch("setUser", null);
      //   if (!this.$auth.loggedIn) {
      //     this.$router.push(this.localePath(pathData.pages.home));
      //   }
      //   this.$nuxt.$loading.finish();
      // },
      handleEditProfile() {
        this.$router.push(this.localePath(pathData.coach.editProfile));
      },
      handleSetting(){
        this.$router.push(this.localePath(pathData.coach.settings));
      },
      handleGeographyBtn(){
        this.$router.push(this.localePath(pathData.coach.geography));
      },
      handlePackagesBtn(){
        this.$router.push(this.localePath(pathData.coach.packages));
      },
      handleAvailabilityBtn(){
        this.$router.push(this.localePath(pathData.coach.availability));
      },
      handleReviewsBtn(){
        this.$router.push(this.localePath(pathData.coach.reviews));
      },
      handleGalleryBtn(){
        this.$router.push(this.localePath(pathData.coach.imageAndVideo));
      },
      handleActivityStatus() {
        clientBackDrawerApi(this.$axios)
          .changeActiveStatus()
          .then(() => {
            this.refreshPageProgress();
          })
          .catch(error => {
            if (error.response.data.status == "error") {
              this.activityStatus.dialog = true;
            }
          });
      },
      refreshPageProgress() {
        this.$store.dispatch("pageProgress/refresh");
      },
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

.header-title{
  font-family: Open Sans;
  font-style: normal;
  font-weight: 300;
  font-size: 36px;
  line-height: 49px;
  /* identical to box height */

  text-transform: uppercase;
  color: #49556A;

}

.list-text{
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  color: #49556A;
}

.theme--light.v-icon{
  color: #000;
}
.btn-icon{
  margin-right: auto;
}

.btn-text{
  margin-right: auto;
}

.login-option-btn{
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 16px;
  text-align: center;
  letter-spacing: 1px;
  width: 100%;
  text-transform: none !important;
  color: #15577C;
  
}
.tm-login-logo {
  height: 100px;
}
.cs-forgot-password-sec{
  height: calc(100vh - 248px);
  position: relative;
  min-height: 280px;
}
.cs-forgot-password-middle {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.cs-forgot-password-footer {
  height: 100px;
}

.align-items-to-center{
  display: flex;
  justify-content: center;
  align-items: center;
}

.forgot-password-title{
    font-family: Open Sans;
    font-style: normal;
    font-weight: 800;
    font-size: 25px;
    line-height: 34px;
    display: flex;
    align-items: center;
    text-align: center;

    color: #15577C;
}

.forgot-password-validation-subtitle{
    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    display: flex;
    align-items: center;
    text-align: center;

    color: #15577C;
}

.forgot-password-footer-text{
    font-family: Open Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 14px;
    display: flex;
    align-items: center;
    text-align: center;

    color: #15577C;
}
</style>
