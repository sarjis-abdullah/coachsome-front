<template>
  <v-container fluid class="pt-0 mt-0" :class="{'px-10' : $vuetify.breakpoint.mdAndUp}">

    <!-- Mobile Header Start -->
    <mobile-top-nav extraClass="body-bg-secondary" :headerText="'Wishlist'">
      <template v-slot:goBack>
        <v-btn
          icon
          @click="handleBack"
        >
          <v-icon class="common-top-back-icon">mdi-chevron-left</v-icon>
        </v-btn>
      </template>
    </mobile-top-nav>
    
    <!-- Desktop Header Start -->
    <v-row class="d-none d-md-block">
      <v-col cols="12" class="pb-0">
        <div class="page-title">{{ 'Wishlist' }}</div>
      </v-col>
      <v-col cols="12">
        <div class="line"></div>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-if="!progress && coaches && coaches.length" 
        cols="12" sm="6" md="3" v-for="(item, i) in coaches" 
        :key="i">
        <explore-card v-bind="item.coach"></explore-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { pathData } from "@/data";
import MobileTopNav from '@/components/layout/global/MobileTopNav'
import ExploreCard from "@/components/card/ExploreCard";

export default {
  layout: "athlete",
  components: {
    MobileTopNav,
    ExploreCard
  },
  data() {
    return {
      progress: false,
      coaches: []
    };
  },
  created () {
    this.getFavouriteCoaches();
  },
  methods: {
    handleBack(){
      if(this.$auth.hasRole(['superadmin', 'admin', 'staff'])){
        this.$router.push(this.localePath(pathData.admin.profileMenu));
      }else if(this.$auth.hasRole(["coach"])){
        this.$router.push(this.localePath(pathData.coach.profileMenu));
      }
    },
    getFavouriteCoaches(){
      this.progress = true
      this.$axios.get("favourite-coach?include=f.c").then(res=> {
        this.coaches = res?.data?.data.map(item=> {
          if(item.coach)
            item.coach.isFavourite = true
          return item
        })
        return res
      }).catch(err=> {
        return Promise.reject(err)
      }).finally(()=> {
        this.progress = false
      })
    }
  }
};
</script>