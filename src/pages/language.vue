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
            <v-col cols="12" class="justify-center page-top-header-column px-0 mx-0">
                <v-list width="100%" color="transparent" class="py-0 my-0">
                    <v-list-item class="pl-0 ml-0">
                      <v-btn
                        icon
                        @click="handleBackBtnClick"
                      >
                        <v-icon x-large color="#15577C">mdi-chevron-left</v-icon>
                      </v-btn>
                      <v-list-item-content class="pl-1 py-0 my-0">
                        <v-list-item-title
                        class="language-title"
                          v-text="$t('topnav_label_txt_translation')"
                        ></v-list-item-title>
                      </v-list-item-content>
                      <!-- <v-list-item-action>
                        <router-link class="save-profile" to="" @click.native="saveProfile()">{{$t("btn_label_txt_save")}}</router-link>
                      </v-list-item-action> -->
                    </v-list-item>
                </v-list>
                <div class="line"></div>
            </v-col>
          </v-row>

        <v-row>
            <v-col cols="12">
            <v-list dense  class="body-bg">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="subtitle-2 text-uppercase">
                    {{ $t("topnav_label_txt_translation") }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item-group
                v-model="currentLocaleIndex"
                color="primary-light-1"
                dense
              >
                <template>
                  <nuxt-link
                    v-for="(locale, i) in availableLocales"
                    :key="locale.code"
                    :to="switchLocalePath(locale.code)"
                  >
                    <v-list-item :key="i" :value="i">
                      <v-list-item-avatar size="20" tile>
                        <flag :iso="locale.icon" v-bind:squared="false" />
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ $t(locale.tKey) }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </nuxt-link>
                </template>
              </v-list-item-group>
            </v-list>
            </v-col>
        </v-row>

      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Avatar from "@/components/artifact/global/Avatar";
import { pathData } from "@/data";
export default ({
    layout: "common",
    components: {
        avatar: Avatar,
    },
    data(){
        return {
        currentLocaleIndex: 0,
        searchBar: {
            selectedCategory: null,
            loading: false,
            categoryItems: []
        },
        navItems: {
            language: {
            key: "language",
            icon: "folder_open",
            t_key: "nav_item_language"
            },
        }
        }
    },
    computed:{

        availableLocales() {
        return this.$i18n.locales;
        },
        currentLocale() {
          return this.$i18n.locales.find(i => i.code == this.$i18n.locale);
        },
    },
    watch: {
        "$i18n.locale": {
          immediate: true,
          handler: function() {
              this.currentLocaleIndex = this.$i18n.locales.findIndex(
              i => i.code == this.$i18n.locale
              );
          }
        }
    },
    methods:{
      handleBackBtnClick(){
        if(this.$auth.hasRole(['superadmin', 'admin', 'staff'])){
          this.$router.push(this.localePath(pathData.admin.profileMenu));
        }else if(this.$auth.hasRole(["coach"])){
          this.$router.push(this.localePath(pathData.coach.profileMenu));
        }else if(this.$auth.hasRole(["athlete"])){
          this.$router.push(this.localePath(pathData.athlete.profileMenu));
        }
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

.language-title{
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
</style>
