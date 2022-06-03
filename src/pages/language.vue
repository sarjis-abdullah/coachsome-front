<template>

<v-container fluid>
    <mobile-top-nav extraClass="body-bg-secondary" :headerText="$t('topnav_label_txt_translation')">
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
            <v-list  nav class="body-bg">
              <!-- <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="subtitle-2 text-uppercase">
                    {{ $t("topnav_label_txt_translation") }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item> -->
              <v-list-item-group
                v-model="currentLocaleIndex"
                color="primary-light-1"
                
                class="py-0 my-0"
              >
                <span v-for="(locale, i) in availableLocales" :key="i + locale.code">
                  
                    <v-list-item :key="i" :value="i" class="py-0 my-0" @click.prevent.stop="aaaa(locale.code)">
                      <v-list-item-avatar size="20" tile>
                        <flag :iso="locale.icon" v-bind:squared="false" />
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ $t(locale.tKey) }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <!-- <v-divider></v-divider> -->
                      <div class="line"></div>
                </span>
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
import MobileTopNav from '@/components/layout/global/MobileTopNav'
import Cookies from 'universal-cookie';
export default ({
    layout: "common",
    components: {
        avatar: Avatar,
        MobileTopNav
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
      },
      aaaa(code){
        // this.$i18n.locale = code
        // this.$i18n.defaultLocale = code
        // this.$i18n.loadedLanguages = [code]
        // this.$i18n.setLocale(this.$i18n.locale)
        // 
        const cookies = new Cookies();
        cookies.set('i18n_redirected', code, { path: '/' });
        this.$router.go(-1)
        console.log(cookies.get('i18n_redirected'));
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
