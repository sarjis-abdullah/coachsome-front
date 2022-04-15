<template>

<v-container fluid grid-list-md text-xs-center class="d-flex">
    <v-row
      justify="center"
    >
      <v-col
        cols="11"
        sm="8"
        md="6"
        lg="4"
        xs="11"
      >
        <v-row class="page-top-header-row">
            <v-col cols="12" class="justify-center py-0 my-0 page-top-header-column px-0 mx-0">
                <v-list width="100%" color="transparent">
                    <v-list-item class="pl-0 ml-0">
                      <v-btn
                        icon
                        @click="handleBackBtnClick"
                      >
                        <v-icon x-large color="#15577C">mdi-chevron-left</v-icon>
                      </v-btn>
                      <v-list-item-content class="pl-1 py-0 my-0">
                        <v-list-item-title
                        class="header-title"
                          v-text="$t('pwa_edit_profile_title')"
                        ></v-list-item-title>
                      </v-list-item-content>
                      <!-- <v-list-item-action>
                        save
                      </v-list-item-action> -->
                    </v-list-item>
                </v-list>
                <div class="line"></div>
            </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-list class="body-bg">
              <!-- Edit Profile -->
              <v-list-item link @click.stop="handleEditProfile">
                <v-list-item-icon>
                  <v-img :src="require('@/assets/img/svg-icons/user-icon.svg')" alt="edit" />
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title class="list-text">{{$t("pwa_profile_menu")}}</v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>
              <!-- Packages -->
               <v-list-item link @click.stop="handlePackagesBtn">
                <v-list-item-icon>
                  <v-img  :src="require('@/assets/img/svg-icons/gift.svg')" alt="packages" />
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title class="list-text">{{$t("pwa_package_menu")}}</v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>

              <!-- Gallery -->
               <v-list-item link @click.stop="handleGalleryBtn">
                <v-list-item-icon>
                  <v-img  :src="require('@/assets/img/svg-icons/gallery.svg')" alt="Gallery" />
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title class="list-text">{{$t("pwa_gallery_menu")}}</v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>
              
              <!-- Geography -->
              <v-list-item link  @click.stop="handleGeographyBtn">
                <v-list-item-icon>
                  <v-img :src="require('@/assets/img/svg-icons/location.svg')" alt="edit" />
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title class="list-text">{{$t("pwa_geography_menu")}}</v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>

              <!-- Subscription -->
              <!-- <v-list-item link >
                <v-list-item-icon>
                  <v-img :src="require('@/assets/img/svg-icons/subscription.svg')" alt="edit" />
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title class="list-text">Subscription</v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item> -->

              

              <!-- Availibility -->
               <v-list-item link @click.stop="handleAvailabilityBtn">
                <v-list-item-icon>
                  <v-img  :src="require('@/assets/img/svg-icons/calendar-time.svg')" alt="payment" />
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title class="list-text">{{$t("pwa_availability_menu")}}</v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>
              <!-- Reviews -->
               <v-list-item link @click.stop="handleReviewsBtn">
                <v-list-item-icon>
                  <v-img  :src="require('@/assets/img/svg-icons/star.svg')" alt="payment" />
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title class="list-text">{{$t("pwa_reviews_menu")}}</v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-list-item-icon>
              </v-list-item>


            </v-list>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { pathData } from "@/data";
export default ({
  layout: "coach",
  data(){
    return {
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
        if (this.authUser()) {
          return (
            this.authUser().first_name.substring(0, 1) +
            this.authUser().last_name.substring(0, 1)
          );
        } else {
          return "";
        }
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
      async logout(){
        await this.$auth.logout();
        this.$router.push(this.localePath(pathData.pages.home));
      },
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
      }
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

  /* Dusty blue */

  color: #15577C;

}

.list-text{
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;

  /* Dusty blue */

  color: #15577C;
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
