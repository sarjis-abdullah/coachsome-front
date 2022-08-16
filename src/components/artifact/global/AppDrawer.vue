<template>
  <div class="global-drawer">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.mdAndUp"
      app
      color="#F7FAFC"
      fixed
    >
      <client-only>
        <v-list>
          <template v-for="(item, i) in drawerItems">
            <v-list-item v-if="item.item && !item.hasSubItem && !line && !checker" :key="i" :to="localePath(item.url)" link>
                <v-list-item-icon>
                    <v-img class="list-image" :src="item.icon" alt="edit" />
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title class="list-text">{{ $t(item.t_key) }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-group
                :value="false"
                :key="i"
                v-else-if="item.item && item.hasSubItem && !line && !checker"
            >
                <template v-slot:activator >
                    <v-list-item-icon>
                        <v-img class="list-image" :src="item.icon" alt="edit" />
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="list-text">{{ $t(item.t_key) }}</v-list-item-title>
                    </v-list-item-content>
                </template>

                 <v-list-item v-for="(subItem, i) in item.subItems" :key="i" :to="localePath(subItem.url)" link>
                    <v-list-item-icon></v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="list-sub-text">{{ $t(subItem.t_key) }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                

            </v-list-group>
            <v-list-item v-else-if="!item.item && !item.hasSubItem && !item.line && item.checker" text :key="i">
              <v-list-item-content>
                <v-list-item-title>
                  <v-list-item-title class="list-text">{{$t('edit_profile_status')}}</v-list-item-title>
                </v-list-item-title>
              </v-list-item-content>
                <v-list-item-icon>
                  <client-only>
                    <toggle-button
                      :value="isActive"
                      :color="{ checked: '#5CC866', unchecked: '#EFEFEF' }"
                      :sync="true"
                      :font-size="12"
                      :width="40"
                      :height="21"
                    />
                  </client-only>
                </v-list-item-icon>
            </v-list-item>
            <div v-else class="line" :key="i"></div>
          </template>
        </v-list>
      </client-only>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { pathData } from "@/data";

export default {
  components: {},
  data: () => ({
    drawer: null,
    isActive: false,
    drawerItems: [
    {
        key: "home",
        t_key: "pwa_home",
        icon: require('@/assets/img/svg-icons/new/home.svg'),
        text: "home",
        url: pathData.athlete.home,
        hasSubItem: false,
        line: false,
        checker:false,
        item: true
    },
    {
        key: "package",
        t_key: "pwa_edit_profile",
        icon: require('@/assets/img/svg-icons/new/edit.svg'),
        text: "Packages",
        url: null,
        hasSubItem: true,
        item: true,
        line: false,
        checker:false,
        subItems: [
            {
                key: "home",
                t_key: "profile_info",
                text: "home",
                url: pathData.athlete.editProfile,
                hasSubItem: false,
                line: false,
                checker:false,
                item: true
            },
            {
                key: "packages",
                t_key: "packages",
                text: "packages",
                url: null,
                hasSubItem: false,
                line: false,
                checker:false,
                item: true
            },
            {
                key: "gallery",
                t_key: "gallery",
                text: "gallery",
                url: null,
                hasSubItem: false,
                line: false,
                checker:false,
                item: true
            },
            {
                key: "geography",
                t_key: "geography",
                text: "geography",
                url: null,
                hasSubItem: false,
                line: false,
                checker:false,
                item: true
            },
            {
                key: "calendar",
                t_key: "calendar",
                text: "calendar",
                url: null,
                hasSubItem: false,
                line: false,
                checker:false,
                item: true
            },
            {
                key: "reviews",
                t_key: "reviews",
                text: "reviews",
                url: null,
                hasSubItem: false,
                line: false,
                checker:false,
                item: true
            }
        ],
    },
    {
        key: "profile_status",
        t_key: "profile_status",
        url: pathData.coach.imageAndVideo,
        hasSubItem: false,
        line: false,
        checker:true,
        item: false
    },
    {
        key: "bookings",
        t_key: "bookings",
        icon: require('@/assets/img/svg-icons/new/calendar-alt.svg'),
        text: "bookings",
        url: pathData.coach.imageAndVideo,
        hasSubItem: false,
        line: false,
        checker:false,
        item: true
    },
    {
        key: "line",
        t_key: "line",
        text: "line",
        hasSubItem: false,
        line: true,
        checker:false,
        item: false
    },
    {
        key: "settings",
        t_key: "settings",
        icon: require('@/assets/img/svg-icons/new/setting.svg'),
        text: "settings",
        url: null,
        hasSubItem: true,
        item: true,
        line: false,
        checker:false,
        subItems: [
            {
                key: "home",
                t_key: "profile_info",
                text: "home",
                url: pathData.athlete.editProfile,
                hasSubItem: false,
                line: false,
                checker:false,
                item: true
            },
            {
                key: "packages",
                t_key: "packages",
                text: "packages",
                url: null,
                hasSubItem: false,
                line: false,
                checker:false,
                item: true
            },
            {
                key: "gallery",
                t_key: "gallery",
                text: "gallery",
                url: null,
                hasSubItem: false,
                line: false,
                checker:false,
                item: true
            },
        ],
    },
    ],
  }),
  computed: {

  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    currentPath() {
      return this.$route.path;
    },
  }
};
</script>

<style lang="scss" >
.global-drawer {
    
    .v-list-item--active {
        border-left: 8px solid #67b16a !important;
        font-family: $font-family!important;
    }
    .v-list-item:not(.v-list-item--active):not(.v-list-item--disabled){
        border-left: 8px solid #F7FAFC !important;
        font-family: $font-family!important;
    }
    .v-list-group{
        &__header{
        border-left: 8px solid #F7FAFC !important;
        font-family: $font-family!important;
        }
    }
    .list-text{
        font-family: $font-family!important;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 19px;
        color: #49556A;
    }
    .list-sub-text{
        font-family: $font-family!important;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 19px;
        color: #49556A;
    }
    // .list-image{
    //     height: 14px!important;
    //     width: 14px!important;
    // }
    .switch-option-btn{
        font-family: $font-family!important;
        font-style: normal;
        font-weight: 600;
        font-size: 15px;
        line-height: 16px;
        text-align: center;
        letter-spacing: 1px;
        width: 100%;
        text-transform: none !important;
        color: white;
  
    }
}
</style>
