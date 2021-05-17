<template>
  <div class="marketplace-page">
    <v-container
      class="pt-0  pb-0 body-bg"
      style="height: 96vh;"
      fluid
      @click.stop="clickedOnContainerSpace"
    >
      <v-row>
        <v-col>
          <v-card
            elevation="0"
            color="transparent"
            class="d-flex overflow-y-auto my-0"
            v-scroll.self="onScroll"
            :max-height="$vuetify.breakpoint.mdAndUp ? '91vh' : '90vh'"
          >
            <v-card-text>
              <v-row>
                <v-col class="px-10" cols="12" md="9">
                  <!-- Filter Box -->
                  <div :class="{ 'filter-box': isFilterBoxFixed }">
                    <!-- Fields block is the duplicate code in future it should be optimized-->
                    <!-- Field Block -->
                    <div
                      class="fields-block"
                      v-if="$vuetify.breakpoint.mdAndUp"
                    >
                      <v-row>
                        <v-col cols="12" md="11">
                          <v-row>
                            <!-- Category -->
                            <v-col
                              cols="12"
                              md="4"
                              style="padding-bottom: 0;"
                              v-if="filter.item.category.isActive"
                            >
                              <v-autocomplete
                                v-model="categoryFilter.selectedCategories"
                                :items="categoryFilter.categories"
                                @input="changeCategoryFilter"
                                :menu-props="{ closeOnContentClick: true }"
                                chips
                                dense
                                hide-details
                                clearable
                                color="white"
                                item-text="name"
                                item-value="id"
                                :search-input.sync="categoryFilter.search"
                                multiple
                                solo
                                :label="
                                  $t(
                                    'marketplace_category_filter_placeholder_text'
                                  )
                                "
                                append-icon
                                autocomplete="off"
                              >
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
                            </v-col>

                            <!-- Location -->
                            <v-col
                              cols="12"
                              md="4"
                              v-if="filter.item.location.isActive"
                            >
                              <GooglePlaceSearch
                                height="39px"
                                @location="handleGoogleLocation"
                              />
                            </v-col>

                            <!-- Radius -->
                            <v-col
                              cols="12"
                              md="4"
                              v-if="filter.item.radius.isActive"
                            >
                              <v-select
                                hide-details
                                dense
                                :label="radiusFilter.slider + ' km'"
                                solo
                              >
                                <template v-slot:no-data>
                                  <v-list-item>
                                    <v-list-item-content>
                                      <span class="title">Radius</span>
                                    </v-list-item-content>
                                  </v-list-item>
                                  <v-list-item>
                                    <v-list-item-content :style="{}">
                                      <v-slider
                                        color="primary-light-1"
                                        @end="reloadInfiniteLoader"
                                        v-model="radiusFilter.slider"
                                        :min="radiusFilter.min"
                                        :max="radiusFilter.max"
                                        hide-details
                                        class="align-center"
                                      ></v-slider>
                                      <span class="title font-weight-bold"
                                        >{{ radiusFilter.slider }} km</span
                                      >
                                    </v-list-item-content>
                                  </v-list-item>
                                </template>
                              </v-select>
                            </v-col>
                          </v-row>
                        </v-col>

                        <!-- Field chooser -->
                        <v-col cols="12" md="1" class="text-right">
                          <v-row>
                            <v-col>
                              <v-menu
                                bottom
                                offset-y
                                :close-on-content-click="false"
                              >
                                <template v-slot:activator="{ on }">
                                  <v-btn color="white" v-on="on">
                                    <v-icon>filter_list</v-icon>
                                  </v-btn>
                                </template>
                                <v-list>
                                  <v-list-item
                                    v-for="(item, i) in filter.item"
                                    :key="i"
                                  >
                                    <v-list-item-action>
                                      <v-checkbox
                                        :disabled="item.isDisabled"
                                        v-model="item.isActive"
                                        color="primary-light-1"
                                        @click.native="reloadInfiniteLoader"
                                      ></v-checkbox>
                                    </v-list-item-action>
                                    <v-list-item-content>
                                      <v-list-item-title>{{
                                        $t(item.t_key)
                                      }}</v-list-item-title>
                                    </v-list-item-content>
                                  </v-list-item>
                                </v-list>
                              </v-menu>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col cols="12" md="11">
                          <v-row>
                            <!-- Hourly price -->
                            <v-col
                              cols="12"
                              md="4"
                              v-if="filter.item.hourlyPrice.isActive"
                            >
                              <v-select
                                dense
                                hide-details
                                :label="
                                  hourlyPriceFilter.range.join([
                                    (separator = ' - ')
                                  ])
                                "
                                solo
                              >
                                <template v-slot:no-data>
                                  <v-list-item>
                                    <v-list-item-content>
                                      <span class="title">{{
                                        $t(
                                          "marketplace_hourly_rate_filter_title_text"
                                        )
                                      }}</span>
                                    </v-list-item-content>
                                  </v-list-item>
                                  <v-list-item>
                                    <v-list-item-content :style="{}">
                                      <v-range-slider
                                        color="primary-light-1"
                                        v-model="hourlyPriceFilter.range"
                                        :max="hourlyPriceFilter.max"
                                        :min="hourlyPriceFilter.min"
                                        hide-details
                                        @end="reloadInfiniteLoader"
                                        class="align-center"
                                      ></v-range-slider>
                                      <span class="title font-weight-bold"
                                        >{{ hourlyPriceFilter.currencyCode }}
                                        {{ hourlyPriceFilter.range[0] }} -
                                        {{ hourlyPriceFilter.range[1] }}</span
                                      >
                                    </v-list-item-content>
                                  </v-list-item>
                                </template>
                              </v-select>
                            </v-col>

                            <!-- Date -->
                            <v-col
                              cols="12"
                              md="4"
                              v-if="filter.item.date.isActive"
                            >
                              <v-menu
                                v-model="dateFilter.menu"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                              >
                                <template v-slot:activator="{ on }">
                                  <v-text-field
                                    dense
                                    v-model="formttedDate"
                                    solo
                                    label="Date"
                                    readonly
                                    v-on="on"
                                  ></v-text-field>
                                </template>
                                <v-date-picker
                                  :locale="currentLang"
                                  v-model="dateFilter.date"
                                  :first-day-of-week="1"
                                  @input="dateFilter.menu = false"
                                ></v-date-picker>
                              </v-menu>
                            </v-col>

                            <!-- Country -->
                            <v-col
                              cols="12"
                              md="4"
                              v-if="filter.item.country.isActive"
                            >
                              <v-autocomplete
                                autocomplete="off"
                                v-model="countryFilter.selectedCountryCode"
                                @change="handleCountryChange"
                                :items="countryFilter.countryList"
                                item-text="displayName"
                                item-value="code"
                                solo
                                dense
                                hide-no-data
                                hide-details
                                append-icon="expand_more"
                                :label="$t('setting_input_hint_country')"
                              ></v-autocomplete>
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
                          <v-menu
                            bottom
                            offset-y
                            :close-on-content-click="false"
                          >
                            <template v-slot:activator="{ on }">
                              <v-btn icon v-on="on">
                                <v-icon>filter_list</v-icon>
                              </v-btn>
                            </template>
                            <v-list>
                              <v-list-item
                                v-for="(item, i) in filter.item"
                                :key="i"
                              >
                                <v-list-item-action>
                                  <v-checkbox
                                    :disabled="item.isDisabled"
                                    v-model="item.isActive"
                                    color="primary-light-1"
                                    @click.native="reloadInfiniteLoader"
                                  ></v-checkbox>
                                </v-list-item-action>
                                <v-list-item-content>
                                  <v-list-item-title>{{
                                    $t(item.t_key)
                                  }}</v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                            </v-list>
                          </v-menu>
                          <v-btn small icon @click="handleCloseFilterBtnClick">
                            <v-icon>mdi-close</v-icon>
                          </v-btn>
                        </v-card-title>
                        <v-card-text>
                          <!-- Fields block is the duplicate code in future it should be optimized-->
                          <!-- Field Block -->
                          <div
                            class="fields-block"
                            v-if="$vuetify.breakpoint.smAndDown"
                          >
                            <v-row>
                              <v-col cols="12" md="11">
                                <v-row>
                                  <!-- Category -->
                                  <v-col
                                    cols="12"
                                    md="4"
                                    style="padding-bottom: 0;"
                                    v-if="filter.item.category.isActive"
                                  >
                                    <v-autocomplete
                                      v-model="
                                        categoryFilter.selectedCategories
                                      "
                                      :items="categoryFilter.categories"
                                      @input="changeCategoryFilter"
                                      :menu-props="{
                                        closeOnContentClick: true
                                      }"
                                      chips
                                      dense
                                      hide-details
                                      clearable
                                      color="white"
                                      item-text="name"
                                      item-value="id"
                                      :search-input.sync="categoryFilter.search"
                                      multiple
                                      solo
                                      :label="
                                        $t(
                                          'marketplace_category_filter_placeholder_text'
                                        )
                                      "
                                      append-icon
                                      autocomplete="off"
                                    >
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
                                  </v-col>

                                  <!-- Location -->
                                  <v-col
                                    cols="12"
                                    md="4"
                                    v-if="filter.item.location.isActive"
                                  >
                                    <GooglePlaceSearch
                                      height="39px"
                                      @location="handleGoogleLocation"
                                    />
                                  </v-col>

                                  <!-- Radius -->
                                  <v-col
                                    cols="12"
                                    md="4"
                                    v-if="filter.item.radius.isActive"
                                  >
                                    <v-select
                                      hide-details
                                      dense
                                      :label="radiusFilter.slider + ' km'"
                                      solo
                                    >
                                      <template v-slot:no-data>
                                        <v-list-item>
                                          <v-list-item-content>
                                            <span class="title">Radius</span>
                                          </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                          <v-list-item-content :style="{}">
                                            <v-slider
                                              color="primary-light-1"
                                              @end="reloadInfiniteLoader"
                                              v-model="radiusFilter.slider"
                                              :min="radiusFilter.min"
                                              :max="radiusFilter.max"
                                              hide-details
                                              class="align-center"
                                            ></v-slider>
                                            <span class="title font-weight-bold"
                                              >{{
                                                radiusFilter.slider
                                              }}
                                              km</span
                                            >
                                          </v-list-item-content>
                                        </v-list-item>
                                      </template>
                                    </v-select>
                                  </v-col>
                                </v-row>
                              </v-col>
                            </v-row>

                            <v-row>
                              <v-col cols="12" md="11">
                                <v-row>
                                  <!-- Hourly price -->
                                  <v-col
                                    cols="12"
                                    md="4"
                                    v-if="filter.item.hourlyPrice.isActive"
                                  >
                                    <v-select
                                      dense
                                      hide-details
                                      :label="
                                        hourlyPriceFilter.range.join([
                                          (separator = ' - ')
                                        ])
                                      "
                                      solo
                                    >
                                      <template v-slot:no-data>
                                        <v-list-item>
                                          <v-list-item-content>
                                            <span class="title">{{
                                              $t(
                                                "marketplace_hourly_rate_filter_title_text"
                                              )
                                            }}</span>
                                          </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                          <v-list-item-content :style="{}">
                                            <v-range-slider
                                              color="primary-light-1"
                                              v-model="hourlyPriceFilter.range"
                                              :max="hourlyPriceFilter.max"
                                              :min="hourlyPriceFilter.min"
                                              hide-details
                                              @end="reloadInfiniteLoader"
                                              class="align-center"
                                            ></v-range-slider>
                                            <span class="title font-weight-bold"
                                              >{{
                                                hourlyPriceFilter.currencyCode
                                              }}
                                              {{ hourlyPriceFilter.range[0] }} -
                                              {{
                                                hourlyPriceFilter.range[1]
                                              }}</span
                                            >
                                          </v-list-item-content>
                                        </v-list-item>
                                      </template>
                                    </v-select>
                                  </v-col>

                                  <!-- Date -->
                                  <v-col
                                    cols="12"
                                    md="4"
                                    v-if="filter.item.date.isActive"
                                  >
                                    <v-menu
                                      v-model="dateFilter.menu"
                                      :close-on-content-click="false"
                                      :nudge-right="40"
                                      transition="scale-transition"
                                      offset-y
                                      min-width="290px"
                                    >
                                      <template v-slot:activator="{ on }">
                                        <v-text-field
                                          dense
                                          v-model="formttedDate"
                                          solo
                                          label="Date"
                                          readonly
                                          v-on="on"
                                        ></v-text-field>
                                      </template>
                                      <v-date-picker
                                        :locale="currentLang"
                                        v-model="dateFilter.date"
                                        :first-day-of-week="1"
                                        @input="dateFilter.menu = false"
                                      ></v-date-picker>
                                    </v-menu>
                                  </v-col>

                                  <!-- Country -->
                                  <v-col
                                    cols="12"
                                    md="4"
                                    v-if="filter.item.country.isActive"
                                  >
                                    <v-autocomplete
                                      autocomplete="off"
                                      v-model="
                                        countryFilter.selectedCountryCode
                                      "
                                      @change="handleCountryChange"
                                      :items="countryFilter.countryList"
                                      item-text="displayName"
                                      item-value="code"
                                      solo
                                      dense
                                      hide-no-data
                                      hide-details
                                      append-icon="expand_more"
                                      :label="$t('setting_input_hint_country')"
                                    ></v-autocomplete>
                                  </v-col>
                                </v-row>
                              </v-col>
                            </v-row>
                          </div>
                          <!-- Field Block -->
                        </v-card-text>
                        <v-divider></v-divider>
                      </v-card>
                    </v-dialog>
                  </div>

                  <!-- Explore Card -->
                  <v-row>
                    <v-col
                      cols="12"
                      md="4"
                      v-for="(item, i) in coaches"
                      :key="i"
                    >
                      <explore-card v-bind="item"></explore-card>
                    </v-col>
                  </v-row>
                  <v-row justify="center">
                    <v-col cols="12" md="4" class="py-0 my-0">
                      <client-only>
                        <infinite-loading
                          :identifier="infiniteId"
                          @infinite="infiniteHandler"
                        >
                          <div slot="no-results">
                            {{ $t("marketplace_infiniity_loader_no_result") }}
                            <br />
                            <i18n path="marketplace_search_did_not_give_result">
                              <template v-slot:country>
                                <span>{{ searchedCountryName }}</span>
                              </template>
                            </i18n>
                            <br />
                            <span
                              v-for="(item, i) in coachInCountries"
                              :key="i"
                            >
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
                </v-col>

                <!-- Map -->
                <v-col>
                  <div
                    id="map"
                    class="map pt-0 pl-0 d-none d-md-flex"
                    ref="mapRef"
                  ></div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <client-only>
        <v-row>
          <v-col>
            <slide-x-left-transition>
              <div
                v-if="footer.toggleButton"
                class="footer-btn-wrapper"
                @click.stop="footerBtnClicked"
              >
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
import { constantData, profileData } from "@/data";
import { marketPlaceApi } from "@/api";

import ExploreCard from "@/components/card/ExploreCard";
import FrontFooter from "@/components/layout/global/FrontFooter";
import GooglePlaceSearch from "@/components/geography/GooglePlaceSearch";

export default {
  layout: "marketplace",
  title: "",
  components: {
    ExploreCard,
    FrontFooter,
    GooglePlaceSearch
  },
  head() {
    return {
      title:this.$i18n.t("header_title_tag_front_marketplace"),
      titleTemplate:"%s"
    };
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
      }
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
      return this.$store.getters["locale/getCurrLang"];
    }
  },
  watch: {
    isShowingFilterDialog: function(val) {
      this.filterDialog = val;
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
    "$route.query.categoryId": {
      immediate: true,
      handler: function(val) {
        if (typeof val == "string" && val.length > 0) {
          let categoryIdArr = val.split(",");
          let selectedCategories = categoryIdArr.map(item => {
            return Number.parseInt(item);
          });
          this.categoryFilter.selectedCategories = selectedCategories;
        }
      }
    },
    "$route.query.categoryName": {
      immediate: true,
      handler: function(val) {
        if (typeof val == "string") {
          this.queryParams.categoryName = val;
        }
      }
    }
  },
  mounted() {
    this.initMap();
    if (!this.$auth.loggedIn) {
      this.setCurrenctCountry();
    }
  },
  created() {
    this.getInitialData();
  },
  methods: {
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
    async getInitialData() {
      const { data } = await marketPlaceApi(
        this.$axios
      ).getMarketPlacePageInitialData();
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
      console.log(e);
      if (e.target.scrollTop > 0) {
        this.footer.toggleButton = true;
      }
      if (e.target.scrollTop < 11) {
        this.footer.toggleButton = false;
      }

      if (e.target.scrollTop > 200) {
        this.isFilterBoxFixed = true;
      }

      if (e.target.scrollTop == 0) {
        this.isFilterBoxFixed = false;
      }
    },
    infiniteHandler($state) {
      this.queryParams.categoryId = this.categoryFilter.selectedCategories.join(
        ","
      );
      this.queryParams.date = this.dateFilter.date;
      this.queryParams.cityName = this.$route.query.cityName;
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

      this.$router.replace({ query: this.queryParams }).catch(() => {});

      marketPlaceApi(this.$axios)
        .getHourlyRatingUsers({ ...this.queryParams })
        .then(({ data }) => {
          if (data.searchedCountryName) {
            this.searchedCountryName = data.searchedCountryName;
          }
          if (data.coachInCountries.length) {
            this.coachInCountries = data.coachInCountries;
          }

          if (data.coaches.length) {
            this.page += 1;
            let coaches = data.coaches.map(item => {
              let coachItem = {};
              coachItem.name = item.name;
              coachItem.image = item.image ? item.image : null;
              coachItem.countReview = item.countReview;
              coachItem.rating = item.rating;
              coachItem.countReview = item.countReview;
              coachItem.location =
                item.locations && item.locations.length > 0
                  ? item.locations[0].zip + " " + item.locations[0].city
                  : "";
              coachItem.price = item.price;
              coachItem.categories = item.categories;
              coachItem.userName = item.userName;
              return coachItem;
            });
            this.coaches.push(...coaches);

            let locations = data.coaches
              .map(item => {
                if (item.locations.length > 0) {
                  let locationItem = {};
                  locationItem.address = item.locations[0].address;
                  locationItem.lat = item.locations[0].lat;
                  locationItem.long = item.locations[0].long;
                  locationItem.userImage = item.locations[0].userImage;
                  return locationItem;
                }
              })
              .filter(item => (item != null ? true : false));

            this.addAllLocationMarker(locations);
            $state.loaded();
          } else {
            $state.complete();
          }
        });
    },
    removeParamThatHasNotAnyfilter() {
      if (this.queryParams.categoryName) {
        this.queryParams.categoryName = "";
      }
      if (this.queryParams.cityName) {
        this.$route.query.cityName = "";
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
        this.removeAllMapMarker();
        locations.forEach(item => {
          let coordinate = [item.lat, item.long];

          let image = item.userImage
            ? item.userImage
            : profileData.PROFILE_DEFAULT_IMAGE;

          let profileImage = window.L.icon({
            iconUrl: image,
            iconSize: [20, 20],
            popupAnchor: [0, -15]
          });

          // create marker object, pass custom icon as option, pass content and options to popup, add to map
          let marker = window.L.marker(coordinate, {
            icon: profileImage
          }).addTo(this.map);

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
.marketplace-page {
  .filter-box {
    position: fixed;
    z-index: 100;
    width: 71%;
    top: 50px;
    transition: all 3000ms ease;
  }

  /* Dawa */
  .autocomplete-container {
    position: relative;
    width: 100%;
  }

  .autocomplete-container input {
    width: 100%;
    box-sizing: border-box;
  }

  .dawa-autocomplete-suggestions {
    margin: 0.3em 0 0 0;
    padding: 0;
    text-align: left;
    border-radius: 0.3125em;
    background: #fcfcfc;
    box-shadow: 0 0.0625em 0.15625em rgba(0, 0, 0, 0.15);
    position: absolute;
    left: 0;
    right: 0;
    z-index: 9999;
    overflow-y: auto;
    box-sizing: border-box;
  }

  .dawa-autocomplete-suggestions .dawa-autocomplete-suggestion {
    margin: 0;
    list-style: none;
    cursor: pointer;
    padding: 0.4em 0.6em;
    color: #333;
    border: 0.0625em solid #ddd;
    border-bottom-width: 0;
  }

  .dawa-autocomplete-suggestions .dawa-autocomplete-suggestion:first-child {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
  }

  .dawa-autocomplete-suggestions .dawa-autocomplete-suggestion:last-child {
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
    border-bottom-width: 0.0625em;
  }

  .dawa-autocomplete-suggestions .dawa-autocomplete-suggestion.dawa-selected,
  .dawa-autocomplete-suggestions .dawa-autocomplete-suggestion:hover {
    background: #f0f0f0;
  }
  /* Dawa */

  /* Map Styles */
  .map {
    position: fixed;
    right: 0;
    top: 0;
    width: 25%;
    height: 100vh;
    z-index: 0;
    margin-top: 48px;
    /* Leaflet icon */

    .leaflet-marker-icon {
      background: white;
      padding: 3px;
      border: 1px solid $primary-light-1;
      border-radius: 50%;
      width: 25px !important;
      height: 25px !important;
    }
  }
  .footer-btn-wrapper {
    position: fixed;
    bottom: 20px;
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
}
</style>
