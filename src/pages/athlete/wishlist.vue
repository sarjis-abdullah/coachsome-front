<template>
  <v-container fluid class="pt-0 mt-0" :class="{'px-10' : $vuetify.breakpoint.mdAndUp}">

    <!-- Mobile Header Start -->
    <mobile-top-nav extraClass="body-bg-secondary" :headerText="$t('wishlist_page_title')">
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
        <div class="page-title">{{ $t('wishlist_page_title') }}</div>
      </v-col>
      <v-col cols="12">
        <div class="line"></div>
      </v-col>
    </v-row>
    <v-row class="pt-md-0 pt-4" v-if="!progress && coaches && coaches.length">
      <v-col 
        cols="12" sm="6" md="3" v-for="(item, i) in coaches" 
        :key="i">
        <explore-card v-bind="item.coach"></explore-card>
      </v-col>
    </v-row>
    <div class="pt-md-0 pt-4">
      <div class="text-center centered">
        <v-progress-circular
        indeterminate
        color="#6EB5CB"
        v-if="progress"
      ></v-progress-circular>
      </div>
      <article v-if="!progress && coaches && !coaches.length" cols="12" sm="12" class="centered">
        <header>
          <h3 class="wishlist--title">
            {{$t('wishlist_title')}}
          </h3>
        </header>
        <div class="wishlist--text">
          {{$t('wishlist_description')}} 
        </div>
        <div class="text-center mt-5">
          <v-btn @click="gotoFindCoaches" class="white--text" depressed color="#15577C">
            {{$t("wishlist_explore_coaches_btn")}}
          </v-btn>
        </div>
      </article>
    </div>
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
    gotoFindCoaches(){
      this.$router.push(this.localePath(pathData.pages.marketplace.name));
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
<style scoped>
.wishlist--title {
  font-weight: 700;
  font-size: 35px;
  line-height: 48px;
  text-align: center;
  color: #49556A;
}

.wishlist--text {
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;
  text-align: center;
  color: #9FAEC2;
}
.centered {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%)
}
</style>