<template>
  <div class="marketplace-content">
    <v-container
      class="py-0 body-bg"
      style="height: 96vh;"
      fluid
      @click.stop="clickedOnContainerSpace"
    >
      <v-row>
        <v-col class="py-0" cols="12" md="9" :class="{'mt-1' : $vuetify.breakpoint.smAndDown, 'mt-12' : !$vuetify.breakpoint.smAndDown}">
          <v-card
            class="overflow-y"
            :height="100"
            color="transparent"
            flat
          >
            <!-- <v-card-text class="px-0 pt-md-15"> -->
            <v-card-text class="px-0">
              <!-- Filter Box -->
              <div
                :class="{ 'fixed-box py-1': isFilterBoxFixed }"
                v-if="!$vuetify.breakpoint.smAndDown"
              >
                <CoachFilter
                  :categories="categoryFilter.categories"
                  :selected-categories.sync="categoryFilter.selectedCategories"
                  :radius-slider.sync="radiusFilter.slider"
                  :radius-slider-min.sync="radiusFilter.min"
                  :radius-slider-max.sync="radiusFilter.max"
                  :price-slider-range="hourlyPriceFilter.range"
                  @update:price-slider-range="handleUpdatedPriceRange"
                  :price-slider-min="hourlyPriceFilter.min"
                  :price-slider-max="hourlyPriceFilter.max"
                  :currency-code="hourlyPriceFilter.currencyCode"
                  :countries="countryFilter.countryList"
                  :selected-country.sync="countryFilter.selectedCountryCode"
                  @update:location="handleGoogleLocation"
                />
              </div>

              <!-- Field Block -->
            <div class="fields-block" v-else>
              <v-row>
                <!-- <v-col cols-12>
                  <span class="header-text">{{$t('pwa_coach_title')}}</span>
                </v-col> -->
                <v-col cols="12">
                  <v-row>
                    <!-- Category -->
                    <v-col
                      cols="12"
                      class="mt-4"
                      style="padding-bottom: 0;"
                      v-if="filter.item.category.isActive"
                    >
                    <v-app-bar
                      color="#F7FAFC"
                      elevation="0"
                      fixed
                      dense
                      class="coach-filter-sm"
                    >

                      <v-autocomplete
                        v-model="categoryFilter.selectedCategories"
                        :items="categoryFilter.categories"
                        @input="changeCategoryFilter"
                        :menu-props="{ closeOnContentClick: true}"
                        chips
                        dense
                        hide-details
                        clearable
                        color="white"
                        item-text="name"
                        item-value="id"
                        filled
                        :search-input.sync="categoryFilter.search"
                        multiple
                        solo
                        append-icon
                        autocomplete="off"
                      >
                        <template v-slot:label >
                          <v-icon small style="vertical-align: middle" color="#6F8098">mdi-magnify</v-icon>
                          {{$t('pwa_search_sport')}}
                          </template>
                        <template v-slot:selection="data">
                          <v-chip
                            dark
                            small
                            color="primary-light-2"
                            v-bind="data.attrs"
                            :input-value="data.selected"
                            close
                            @click="data.select"
                            @click:close="remove(data.item)"
                            >{{ $t(data.item.t_key) }}</v-chip
                          >
                        </template>
                        <template v-slot:item="data">
                          <template>
                            <v-list-item-content>{{
                              $t(data.item.t_key)
                            }}</v-list-item-content>
                          </template>
                        </template>
                      </v-autocomplete>

                    </v-app-bar>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </div>

              <!-- Filter Dialog -->
              <v-dialog v-model="filterDialog">
                <v-card>
                  <v-card-title class="title">
                    {{ $t("marketplace_sm_body_filter_title_txt") }}
                    <v-spacer></v-spacer>

                    <v-btn small icon @click="handleCloseFilterBtnClick">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-card-title>
                  <v-card-text>
                    <CoachFilter
                      mobile
                      :categories="categoryFilter.categories"
                      :selected-categories.sync="
                        categoryFilter.selectedCategories
                      "
                      :radius-slider.sync="radiusFilter.slider"
                      :radius-slider-min.sync="radiusFilter.min"
                      :radius-slider-max.sync="radiusFilter.max"
                      :price-slider-range="hourlyPriceFilter.range"
                      @update:price-slider-range="handleUpdatedPriceRange"
                      :price-slider-min="hourlyPriceFilter.min"
                      :price-slider-max="hourlyPriceFilter.max"
                      :currency-code="hourlyPriceFilter.currencyCode"
                      :countries="countryFilter.countryList"
                      :selected-country.sync="countryFilter.selectedCountryCode"
                      @update:location="handleGoogleLocation"
                    />
                  </v-card-text>
                  <v-divider></v-divider>
                </v-card>
              </v-dialog>

              <!-- coach-list -->
              <v-row class="card-container pt-2">
                <v-col cols="12" sm="6" md="4" v-for="(item, i) in coaches" :key="i">
                  <explore-card v-bind="item"></explore-card>
                </v-col>
                <v-col cols="12">
                  <client-only>
                    <infinite-loading
                      :identifier="infiniteId"
                      @infinite="infiniteHandler"
                    >
                      <div slot="no-more"></div>
                      <div slot="no-results">
                        {{ $t("marketplace_infiniity_loader_no_result") }}
                        <br />
                        <i18n path="marketplace_search_did_not_give_result">
                          <template v-slot:country>
                            <span>{{ searchedCountryName }}</span>
                          </template>
                        </i18n>
                        <br />
                        <span v-for="(item, i) in coachInCountries" :key="i">
                          <v-btn
                            text
                            x-small
                            @click.stop="handleFlagBtnClick(item)"
                          >
                            <country-flag
                              :country="item.cca2.toLowerCase()"
                              size="normal"
                            />
                          </v-btn>
                        </span>
                      </div>
                    </infinite-loading>
                  </client-only>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Map -->
        <v-col>
          <div
            id="map"
            class="map pt-0 pl-0 d-none d-md-flex"
            ref="mapRef"
          ></div>
        </v-col>
        <!-- ./Map -->
      </v-row>

    
      <!-- Footer -->
      <client-only v-if="footer.toggleButton && $vuetify.breakpoint.mdAndUp">
        <v-row>
          <v-col>
            <slide-x-left-transition>
              <div class="footer-btn-wrapper" @click.stop="footerBtnClicked">
                <button class="footer-btn--menu">
                  <v-icon>menu</v-icon>
                </button>
                <button class="footer-btn--crop"></button>
              </div>
            </slide-x-left-transition>
          </v-col>
          <v-col>
            <slide-y-down-transition>
              <front-footer v-if="footer.value" fixed></front-footer>
            </slide-y-down-transition>
          </v-col>
        </v-row>
      </client-only>
    </v-container>
  </div>
</template>

<script>
import { constantData, profileData, pathData } from "@/data";
import { marketPlaceApi } from "@/api";

import ExploreCard from "@/components/card/ExploreCard";
import FrontFooter from "@/components/layout/global/FrontFooter";
import GooglePlaceSearch from "@/components/geography/GooglePlaceSearch";
import CoachFilter from "@/components/artifact/global/pages/marketplace/CoachFilter";
import { currencyService } from "@/services";

import "css-star-rating/css/star-rating.css";
import { v4 as uuidv4 } from "uuid";

export default {
  components: {
    ExploreCard,
    FrontFooter,
    GooglePlaceSearch,
    CoachFilter
  },
  data() {
    return {
      currentCca2: "",
      filterDialog: false,
      isFilterBoxFixed: false,
      footer: {
        value: false,
        toggleButton: false
      },
      queryParams: {
        categoryId: [],
        categoryName: "",
        originLat: null,
        originLong: null,
        originLocation: null,
        distance: "",
        hourlyPriceMinRange: "",
        hourlyPriceMaxRange: "",
        date: "",
        cityName: "",
        cityId: "",
        page: "",
        countryCode: ""
      },
      page: 1,
      map: null,
      mapCircle: null,
      mapLocations: [],
      mapMarkers: [],
      marker: null,
      coaches: [],
      searchedCountryName: "",
      coachInCountries: [],
      infiniteId: +new Date(),
      filter: {
        item: {
          category: {
            id: 1,
            text: "Sport",
            t_key: "marketplace_filter_chooser_text_sport",
            isActive: true,
            isDisabled: true
          },
          location: {
            id: 2,
            text: "Location",
            t_key: "marketplace_filter_chooser_text_location",
            isActive: true,
            isDisabled: false
          },
          radius: {
            id: 3,
            text: "Radius",
            t_key: "marketplace_filter_chooser_text_radius",
            isActive: true,
            isDisabled: false
          },
          hourlyPrice: {
            id: 4,
            text: "Hourly Price",
            t_key: "marketplace_filter_chooser_text_hourly_price",
            isActive: true,
            isDisabled: false
          },
          date: {
            id: 5,
            text: "Date",
            t_key: "marketplace_filter_chooser_text_hourly_date",
            isActive: false,
            isDisabled: false
          },
          country: {
            id: 6,
            text: "Country",
            t_key: "filter_item_text_country",
            isActive: false,
            isDisabled: false
          }
        }
      },
      radiusFilter: {
        min: 0,
        max: 100,
        slider: 100
      },
      hourlyPriceFilter: {
        currencyCode: constantData.CURRENCY_DKK_CODE,
        min: 0,
        max: 99999999,
        range: [0, 99999999]
      },
      cityFilter: {
        name: null
      },
      categoryFilter: {
        search: null,
        selectedCategories: [],
        categories: []
      },
      locationFilter: {
        location: "",
        long: null,
        lat: null
      },
      dateFilter: {
        date: new Date().toISOString().substr(0, 10),
        menu: false
      },
      countryFilter: {
        selectedCountryCode: null,
        countryList: []
      },
      markerCardElements: [],
      markerCardIndex: 1
    };
  },
  computed: {
    isShowingFilterDialog() {
      return this.$store.getters["marketplace/filterDialog"];
    },
    formttedDate() {
      return this.formatDate(this.dateFilter.date);
    },
    hourlyRateRangeText() {
      return (
        this.hourlyPriceFilter.range[0] +
        " - " +
        this.hourlyPriceFilter.range[1]
      );
    },
    computedParamCategoryId() {
      return this.$route.query.categoryId;
    },
    computedParamCategoryName() {
      return this.$route.query.categoryName;
    },
    currentLang() {
      return this.$i18n.locale;
    }
  },
  watch: {
    isShowingFilterDialog: function(val) {
      this.filterDialog = val;
    },
    "categoryFilter.selectedCategories": function() {
      let categories = this.categoryFilter.categories
        .filter(item =>
          this.categoryFilter.selectedCategories.includes(item.id)
        )
        .map(item => {
          if (item.name.split(" ").length) {
            return item.name
              .toLowerCase()
              .split(" ")
              .join("+");
          } else {
            return item.name.toLowerCase();
          }
        });

      if (categories.length) {
        this.$router.push(
          this.localePath({ name: pathData.pages.marketplace.name }) +
            "/" +
            categories.join("-")
        );
      } else {
        this.$router.push(
          this.localePath({ name: pathData.pages.marketplace.name })
        );
      }
    },
    "locationFilter.location": function(val) {
      if (!val) {
        this.removeMapCircle();
        this.reloadInfiniteLoader();
      }
    },
    "dateFilter.date": function() {
      this.reloadInfiniteLoader();
    },
    "radiusFilter.slider": function() {
      this.reloadInfiniteLoader();
    },
    "countryFilter.selectedCountryCode": function() {
      this.reloadInfiniteLoader();
    }
  },
  async fetch() {
    const { data } = await marketPlaceApi(this.$axios).get();
    this.hourlyPriceFilter.min = data.min;
    this.hourlyPriceFilter.max = data.max;
    this.hourlyPriceFilter.range[0] = data.minRange;
    this.hourlyPriceFilter.range[1] = data.maxRange;
    this.countryFilter.countryList = data.countries;
    if (this.$auth.loggedIn) {
      this.countryFilter.selectedCountryCode = data.countryCode;
    }
    if (data.categories) {
      this.categoryFilter.categories = data.categories
        .map(item => {
          return {
            id: item.id,
            name: this.$i18n.t(item.t_key),
            t_key: item.t_key,
            priority: item.priority,
            image: item.image,
            isImageFullUrl: item.isImageFullUrl
          };
        })
        .sort(function(a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
    }
    if (this.$route.params.pathMatch) {
      let params = this.$route.params.pathMatch.split("/");
      let categories = params[0].split("-");
      categories.forEach(outerItem => {
        this.categoryFilter.categories.forEach(innerItem => {
          if (
            innerItem.name.toLowerCase() ==
            outerItem
              .toLowerCase()
              .split("+")
              .join(" ")
          ) {
            this.categoryFilter.selectedCategories.push(innerItem.id);
          }
        });
      });
    }

    this.reloadInfiniteLoader();

    this.$fetchState.pending = false;
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);

    this.initMap();
    if (!this.$auth.loggedIn) {
      this.setCurrenctCountry();
    }
  },
  methods: {
    urlToArray(url) {
      var request = {};
      var pairs = url.substring(url.indexOf("?") + 1).split("&");
      for (var i = 0; i < pairs.length; i++) {
        if (!pairs[i]) continue;
        var pair = pairs[i].split("=");
        request[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
      }
      return request;
    },
    handleUpdatedPriceRange(val) {
      this.hourlyPriceFilter.range = val;
      this.reloadInfiniteLoader();
    },
    setCurrenctCountry() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          var lat = position.coords.latitude;
          var lng = position.coords.longitude;
          var latlng = new window.google.maps.LatLng(lat, lng);
          var geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ latLng: latlng }, (results, status) => {
            if (status == window.google.maps.GeocoderStatus.OK) {
              if (results[1]) {
                results[1].address_components.forEach(item => {
                  if (item.types.includes("country")) {
                    if (item.short_name) {
                      this.countryFilter.selectedCountryCode = item.short_name;
                      this.reloadInfiniteLoader();
                    }
                  }
                });
              }
            } else {
              console.log("Geocoder failed due to: " + status);
            }
          });
        });
      } else {
        console.log("Geolocation services are not supported by your browser.");
      }
    },
    handleGoogleLocation(item) {
      let { address, long, lat } = item;
      this.locationFilter.location = address;
      this.locationFilter.lat = lat;
      this.locationFilter.long = long;
      this.makeCircle(lat, long, this.radiusFilter.max);
      this.reloadInfiniteLoader();
    },
    handleCloseFilterBtnClick() {
      this.$store.dispatch("marketplace/hideFilterDialog");
    },
    handleFilterBtnClick() {
      this.$store.dispatch("marketplace/showFilterDialog");
    },
    handleFlagBtnClick(item) {
      this.countryFilter.selectedCountryCode = item.cca2;
      this.filter.item.country.isActive = true;
      this.reloadInfiniteLoader();
    },
    handleCountryChange() {
      this.reloadInfiniteLoader();
    },
    removeMapCircle() {
      if (this.mapCircle) {
        this.map.removeLayer(this.mapCircle);
      }
    },
    makeCircle(lat, long, distance) {
      this.removeMapCircle();
      this.mapCircle = window.L.circle([lat, long], {
        radius: distance * 1000
      }).addTo(this.map);
      var latLon = window.L.latLng(lat, long);
      var bounds = latLon.toBounds(distance * 1000); // 1000 = metres
      this.map.panTo(latLon).fitBounds(bounds);
      this.map.setView([lat, long], 7);
    },
    clickedOnContainerSpace() {
      this.footer.value = false;
    },
    footerBtnClicked() {
      this.footer.value = true;
    },
    onScroll(e) {
      if (window.scrollY > 0) {
        this.footer.toggleButton = true;
      }
      if (window.scrollY < 11) {
        this.footer.toggleButton = false;
      }

      if (window.scrollY > 80) {
        this.isFilterBoxFixed = true;
      }

      if (window.scrollY == 0) {
        this.isFilterBoxFixed = false;
      }
    },
    infiniteHandler($state) {
      if (!this.$fetchState.pending) {
        this.queryParams.categoryId = this.categoryFilter.selectedCategories.join(
          ","
        );
        this.queryParams.date = this.dateFilter.date;
        this.queryParams.cityName = this.$route.query.cityName;
        this.queryParams.tagName = this.$route.query.tagName;
        this.queryParams.originLat = this.locationFilter.lat;
        this.queryParams.originLong = this.locationFilter.long;
        this.queryParams.originLocation = this.locationFilter.location;
        this.queryParams.distance = this.radiusFilter.slider;
        this.queryParams.countryCode = this.countryFilter.selectedCountryCode;
        this.queryParams.hourlyPriceMinRange = this.filter.item.hourlyPrice
          .isActive
          ? this.hourlyPriceFilter.range[0]
          : null;
        this.queryParams.hourlyPriceMaxRange = this.filter.item.hourlyPrice
          .isActive
          ? this.hourlyPriceFilter.range[1]
          : null;
        this.queryParams.page = this.page;
        this.queryParams.categoryId = this.categoryFilter.selectedCategories.join(
          ","
        );

        marketPlaceApi(this.$axios)
          .get({ ...this.queryParams })
          .then(({ data }) => {
            let locationList = [];
            let coaches = [];

            if (data.searchedCountryName) {
              this.searchedCountryName = data.searchedCountryName;
            }

            if (data.coachInCountries.length) {
              this.coachInCountries = data.coachInCountries;
            }

            if (data.coaches.length) {
              this.page += 1;
              let coaches = data.coaches.map(item => {
                item.locations.forEach(location => {
                  location.coach = item;
                  locationList.push(location);
                });
                return {
                  name: item.name,
                  id: item.id,
                  isFavourite: item.isFavourite,
                  image: item.image ? item.image : null,
                  countReview: item.countReview,
                  rating: item.rating,
                  countReview: item.countReview,
                  location: "",
                  price: item.price,
                  categories: item.categories,
                  userName: item.userName,
                  badge: item.badge
                };
              });

              this.coaches.push(...coaches);

              let locations = locationList
                .map(item => {
                  return {
                    address: item.address,
                    lat: item.lat,
                    long: item.long,
                    userImage: item.userImage,
                    coach: item.coach
                  };
                })
                .filter(item => (item != null ? true : false));
              this.addAllLocationMarker(locations);

              $state.loaded();
            } else {
              $state.complete();
            }
          });
      }
    },
    removeParamThatHasNotAnyfilter() {
      if (this.queryParams.categoryName) {
        this.queryParams.categoryName = "";
      }
      if (this.queryParams.cityName) {
        this.$route.query.cityName = "";
      }
      if(this.queryParams.tagName){
        this.queryParams.tagName = "";
      }
    },
    changeCategoryFilter() {
      this.removeParamThatHasNotAnyfilter();
      this.categoryFilter.search = null;
      this.reloadInfiniteLoader();
    },
    reloadInfiniteLoader() {
      this.page = 1;
      this.coaches = [];
      this.infiniteId += 1;
      this.removeAllMapMarker();
    },
    addAllLocationMarker(locations) {
      if (process.client) {
        let coordinates = [];
        // this.removeAllMapMarker();
        locations.forEach(item => {
          const markerCardIndex = uuidv4();

          let coordinate = [item.lat, item.long];

          let image = item.userImage
            ? item.userImage
            : profileData.PROFILE_DEFAULT_IMAGE;

          // create marker object, pass custom icon as option, pass content and options to popup, add to map
          // let marker = window.L.marker(coordinate, {
          //   icon: profileImage
          // }).addTo(this.map);

          let marker = window.L.marker(coordinate, {
            icon: new window.L.DivIcon({
              className: "dummy",
              html: `
              <div class="marker-point">
                <img class="marker-point__image" src="${image}"/> 
                <a href="${item.coach.userName}" target="_blank">
                  <div class="${"marker-point__card-wrapper marker-point__card--" +
                    markerCardIndex}" style="display:none;">
                    <div class="marker-point__card">
                      <div class="marker-point__card-body">
                        <img class="marker-point__card-image" src="${image}"/> 
                        <div class="marker-point__card-content">
                          <div style="font-family: Open Sans;font-style: normal;font-weight: bold;font-size: 10px;line-height: 14px;color: #2C3749;">${
                            item.coach.name
                          }</div>
                          <div class="d-flex align-center">
                            <div class="rating small star-icon half color-ok value-${
                              item.coach.rating
                                ? Math.trunc(item.coach.rating)
                                : 0
                            }" style="background: transparent !important;padding-left:0px;margin-left:0px;">
                              <div class="star-container">
                                <div class="star">
                                    <i class="star-empty"></i>
                                    <i class="star-half"></i>
                                    <i class="star-filled"></i>
                                </div>
                                <div class="star">
                                    <i class="star-empty"></i>
                                    <i class="star-half"></i>
                                    <i class="star-filled"></i>
                                </div>
                                <div class="star">
                                    <i class="star-empty"></i>
                                    <i class="star-half"></i>
                                    <i class="star-filled"></i>
                                </div>
                                <div class="star">
                                    <i class="star-empty"></i>
                                    <i class="star-half"></i>
                                    <i class="star-filled"></i>
                                </div>
                                <div class="star">
                                    <i class="star-empty"></i>
                                    <i class="star-half"></i>
                                    <i class="star-filled"></i>
                                </div>
                              </div>
                            </div>
                            <div style="color:#9FAEC2;font-size: 10.2991px;font-family: Open Sans;font-style: normal;font-weight: normal;">(${
                              item.coach.countReview
                            })</div>
                          </div>
                          <div class="text-ellipsis" style="font-size: 10px;color: #2C3749;font-family: Open Sans;font-weight: normal;">${item
                            .coach.categories &&
                            item.coach.categories
                              .slice(0, 3)
                              .map(item => this.$i18n.t(item.t_key))
                              .join(", ")}</div>
                          <div style="font-weight: bold;font-size: 12.3589px;color: #2C3749;font-family: Open Sans;">${currencyService.toCurrency(
                            item.coach.price
                          )}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>  
              `
            })
          })
            .addTo(this.map)
            .on("click", () => {
              this.markerCardElements.forEach(item => {
                item.style.display = "none";
              });
              let x = document.querySelector(
                ".marker-point__card--" + markerCardIndex
              );
              this.markerCardElements.push(x);
              if (x.style.display === "none") {
                x.style.display = "block";
              } else {
                x.style.display = "none";
              }
            });

          this.mapMarkers.push(marker);
          coordinates.push(coordinate);
        });
        let bounds = new window.L.LatLngBounds([coordinates]);
        this.map.fitBounds(bounds);
      }
    },

    removeAllMapMarker() {
      this.mapMarkers.forEach(item => {
        this.map.removeLayer(item);
      });
    },
    remove(category) {
      this.reloadInfiniteLoader();
      const index = this.categoryFilter.selectedCategories.findIndex(
        id => id == category.id
      );
      if (index >= 0) this.categoryFilter.selectedCategories.splice(index, 1);
    },
    initMap() {
      if (process.client) {
        this.map = window.L.map("map").locate({ setView: true, maxZoom: 6 });
        this.map.on("click", () => {
          this.markerCardElements.forEach(item => {
            item.style.display = "none";
          });
          this.markerCardElements = [];
        });
        window.L.tileLayer(
          "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          {}
        ).addTo(this.map);
      }
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    }
  }
};
</script>

<style lang="scss">
.marketplace-content {
  .card-container {
    background: $body-bg;
  }

  .map {
    position: fixed;
    right: 0;
    top: 0;
    width: 25%;
    height: 100vh;
    z-index: 0;
    margin-top: 48px;
    /* Leaflet icon */

    .marker-point {
      position: relative;

      .leaflet-div-icon {
        all: initial;
      }
      .marker-point__image {
        background: white;
        padding: 3px;
        border: 1px solid $primary-light-1;
        border-radius: 50%;
        width: 25px !important;
        height: 25px !important;
        z-index: 0;
      }

      .marker-point__card-wrapper {
        position: absolute;
        width: 280px;
        top: -100px;
        left: -100px;
        .marker-point__card {
          width: 100%;
          background: #ffffff;
          box-sizing: border-box;
          border-radius: 8.23926px;
          top: -100px;
          z-index: 9000;
          &:after {
            content: "";
            position: absolute;
            z-index: -1;
            bottom: -10px;
            right: 50%;
            height: 0;
            border-left: 25px solid transparent;
            border-right: 25px solid transparent;
            border-top: 50px solid white;
          }
          .marker-point__card-body {
            display: flex;
            padding: 5px;

            .marker-point__card-image {
              width: 64px;
              height: 77px;
              border-radius: 6px;
            }
            .marker-point__card-content {
              padding-left: 5px;
              div {
                font-size: 1.2em;
                font-weight: bold;
                font-family: $font-family;
              }
              a {
                text-decoration: none;
                color: $primary-light-2;
              }
            }
          }
        }
      }
    }
  }
  .footer-btn-wrapper {
    position: fixed;
    bottom: 80px;
    left: 10px;
    background: #49556a;
    display: flex;
    align-items: center;
    width: 101px;
    height: 44px;
    justify-content: center;
    /* Shadow-3 */
    box-shadow: 0px 4px 4px rgba(73, 85, 106, 0.15);
    border-radius: 8px;
    .footer-btn--menu {
      outline: none;
      i {
        color: #f7fafc;
      }
      margin-right: 10px;
    }
    .footer-btn--crop {
      background: #f7fafc;
      width: 27px;
      outline: none;
      height: 16px;
      border-radius: 4px;
    }
  }

  .fixed-box {
    position: fixed;
    z-index: 100;
    top: 0px;
    left: 0px;
    background: #F7FAFC;
    transition: background-color 0.5s ease;
    width: 100%;
  }
}

.v-toolbar{
  &__content{
    padding: 4px 12px!important;
  }
}

.coach-filter-sm{
  border-bottom: 1px solid #9FAEC2!important;
  .v-input{
    &__slot{
      box-shadow: 0px 2px 4px rgba(73, 85, 106, 0.15)!important;
      border-radius: 6px!important;
      min-height:36px!important;
      height:36px!important;
      .v-select{
        &__slot{
            display: flex!important;
            justify-content: center!important;
            max-width: 100%!important;
            min-width: 100%!important;
            width: 100%!important;
          .v-label{
            left: auto!important;
            // background: red!important;
            right: auto!important;
            text-align: center!important;
            display: flex!important;
            justify-content: center!important;
            position: absolute!important;
            font-family: 'Open Sans';
            font-style: normal;
            font-weight: 400;
            font-size: 16px!important;
            line-height: 16px!important;
            color: #6F8098;

          }
        }

      }

    }
  }
}
</style>
