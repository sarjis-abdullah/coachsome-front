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
        <v-list class="pt-7" >  <!-- add 'flat' to remove the gray selection -->
          <template v-for="(item, i) in drawerItems">
            <v-list-item v-if="item.item && !item.hasSubItem && !item.line && !item.checker" :key="i" :to="localePath(item.url)" link>
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
                v-else-if="item.item && item.hasSubItem && !item.line && !item.checker"
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
                      @input="handleActivityStatus"
                      :color="{ checked: '#5CC866', unchecked: '#EFEFEF' }"
                      :sync="true"
                      :font-size="12"
                      :width="40"
                      :height="21"
                    />
                  </client-only>
                </v-list-item-icon>
            </v-list-item>
            <div v-else class="py-5" :key="i">
                <div class="line"></div>
            </div>
          </template>
        </v-list>
      </client-only>
      <!-- bottom Button  -->
      <template v-slot:append>
       <v-list > 
            <v-list-item @click="logOut" link>
                <v-list-item-icon>
                    <v-img class="list-image" :src="require('@/assets/img/svg-icons/new/send-out.svg')" alt="log-out" />
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title class="list-text">{{ $t("dropdown_item_log_out") }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { pathData } from "@/data";

export default {
  components: {},
    props: {
        drawerItems: {
            type: Object,
            default: [],
        },
        isActive: {
            type: Boolean,
            default: false,
        },
        
  },
  data: () => ({
    drawer: null,

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
    handleActivityStatus() {
        // this.isActive
       this.$emit("toggleActiveStatus", !this.isActive)
    },
    logOut(){
        this.$emit("logOut")
    }
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
