<template>
  <div class="coach-geography-page">
    <v-container fluid class="page-container">
      <v-row>
        <v-col cols="12" class="pb-0">
          <div class="page-title">{{ $t("geography_page_title") }}</div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <div class="line"></div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <div class="section-title pb-2">
            {{ $t("geography_section_title_location") }}
          </div>
          <div class="section-description">
            {{ $t("geography_section_location_desc") }}
          </div>
        </v-col>
        <v-col cols="12" md="8">
          <v-row>
            <v-col cols="12" md="9">
              <GooglePlaceSearch
                @no-value="isDisabled = true"
                @location="handleGoogleLocation"
              />
            </v-col>
            <v-col cols="12" md="3">
              <v-btn
                block
                class="white--text"
                color="primary-light-1"
                :disabled="isDisabled"
                depressed
                light
                large
                @click="addLocation()"
                >{{ $t("btn_label_add_location") }}</v-btn
              >
            </v-col>
          </v-row>
          <v-row> </v-row>
        </v-col>
      </v-row>

      <!-- Location Data Table -->
      <v-row>
        <v-col cols="12">
          <v-data-table
            :headers="locationDataTable.headers"
            :items="locationList"
            hide-default-footer
            class="elevation-1"
            dense
          >
            <template v-slot:item.index="{ item }">
              <td>{{ item.index }}</td>
            </template>
            <template v-slot:item.action="{ item }">
              <v-icon small @click="deleteLocationItem(item)">delete</v-icon>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
      <!-- Location Data Table -->

      <!-- Distance -->
      <v-row>
        <v-col cols="12" md="4">
          <div class="section-title pb-2">
            {{ $t("geography_section_distance") }}
          </div>
          <div class="section-description">
            {{ $t("geography_section_distance_desc") }}
          </div>
        </v-col>
        <v-col cols="12" md="8">
          <v-row>
            <v-col cols="12" md="5">
              <v-row>
                <v-col>
                  <v-checkbox
                    small
                    :label="$t('geography_distance_online_offer_only')"
                    hide-details
                    color="primary-light-1"
                    v-model="distance.isOfferOnlyOnline"
                  ></v-checkbox>
                </v-col>
              </v-row>
              <v-row v-if="!distance.isOfferOnlyOnline">
                <v-col>
                  <v-text-field
                    hide-details
                    solo
                    v-model="distance.farAway"
                    :label="$t('text_km_from')"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <v-btn
                class="white--text"
                color="primary-light-1"
                light
                depressed
                large
                @click="addDistance()"
                >{{ $t("profile_save_btn") }}</v-btn
              >
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <div class="line"></div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="3">
          <div class="section-title pb-2">
            {{ $t("geography_sec_view_locations") }}
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <div
            id="geography-map"
            class="geography-map"
            style="height: 600px;"
          ></div>
        </v-col>
      </v-row>
      <v-row class="d-sm-flex d-xs-flex d-lg-none">
        <v-col cols="12" class="mx-0 px-0">
          <client-back-footer class="px-0 py-0" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { coachGeographyApi, countryApi } from "@/api";
import ClientBackFooter from "@/components/artifact/global/ClientBackFooter";
import GooglePlaceSearch from "@/components/geography/GooglePlaceSearch";

export default {
  layout: "coach",
  components: {
    ClientBackFooter,
    GooglePlaceSearch
  },
  data() {
    return {
      googlePlaceSearch: {
        value: ""
      },
      cca2: null,
      countryList: [],
      isDisabled: true,
      locationDataTable: {
        headers: []
      },
      locationList: [],
      location: {
        zipCode: "",
        city: "",
        address: "",
        long: "",
        lat: "",
        cca2: "",
        googleMapApiResponse: null
      },
      distance: {
        isOfferOnlyOnline: false,
        unit: "",
        farAway: ""
      },
      map: null
    };
  },
  watch: {
    locationList() {
      if (this.locationList.length) {
        let newLocation = this.locationList[this.locationList.length - 1];
        window.L.marker([newLocation.lat, newLocation.long])
          .addTo(this.map)
          .bindPopup(newLocation.address)
          .openPopup();
      }
    }
  },
  computed: {},
  created() {
    this.locationDataTable = {
      headers: [
        { text: this.$i18n.t("geography_table_header_text_id"), value: "id" },
        {
          text: this.$i18n.t("geography_table_header_text_address"),
          value: "address"
        },
        { text: this.$i18n.t("geography_table_header_text_zip"), value: "zip" },
        {
          text: this.$i18n.t("geography_table_header_text_city"),
          value: "city"
        },
        { text: this.$i18n.t("geography_table_col_country"), value: "cca2" },
        {
          text: this.$i18n.t("geography_table_header_text_actions"),
          value: "action",
          sortable: false
        }
      ]
    };

    this.fetchCountryList();
    coachGeographyApi(this.$axios)
      .geographyPageInitialData()
      .then(response => {
        if (response.data.status == "success") {
          if (response.data.locations.length > 0) {
            this.locationList = response.data.locations;
          }
          if (response.data.distance) {
            this.distance.isOfferOnlyOnline =
              response.data.distance.is_offer_only_online;
            this.distance.farAway = response.data.distance.far_away;
          }
        }
        this.initMap();
      })
      .catch(() => {});
  },
  mounted() {},
  methods: {
    handleGoogleLocation(item) {
      this.isDisabled = false;
      let {
        zipCode,
        city,
        address,
        long,
        lat,
        cca2,
        googleMapApiResponse
      } = item;
      this.location.zipCode = zipCode;
      this.location.city = city;
      this.location.address = address;
      this.location.long = long;
      this.location.lat = lat;
      this.location.cca2 = cca2;
      this.location.googleMapApiResponse = googleMapApiResponse;
    },
    async fetchCountryList() {
      try {
        let { data } = await countryApi(this.$axios).get();
        if (data.data.length) {
          data.data.forEach(item => {
            this.countryList.push(item);
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    handleCountryChange() {
      console.log(this.cca2);
    },
    refreshPageProgress() {
      this.$store.dispatch("pageProgress/refresh");
    },
    deleteLocationItem(item) {
      const index = this.locationList.indexOf(item);
      if (confirm("Are you sure you want to delete this item?")) {
        coachGeographyApi(this.$axios)
          .deleteLocation(item.id)
          .then(response => {
            if (response.data.status == "success") {
              this.$toast.success(response.data.message);
              this.locationList.splice(index, 1);
              this.initMap();
            }
            this.refreshPageProgress();
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    addDistance() {
      let payload = {
        isOfferOnlyOnline: this.distance.isOfferOnlyOnline,
        farAway: this.distance.farAway,
        unit: "km"
      };

      coachGeographyApi(this.$axios)
        .storeDistance(payload)
        .then(response => {
          if (response.data.status == "success") {
            this.refreshPageProgress();
            this.$toast.success(
              this.$t("geography_success_msg_successfully_updated")
            );
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    addLocation() {
      let payload = {
        lat: this.location.lat,
        long: this.location.long,
        address: this.location.address,
        zip: this.location.zipCode,
        city: this.location.city,
        cca2: this.location.cca2,
        googleMapApiResponse: this.location.googleMapApiResponse
      };

      coachGeographyApi(this.$axios)
        .storeLocation(payload)
        .then(response => {
          if (response.data.status == "success") {
            this.refreshPageProgress();
            this.locationList.push(response.data.location);
            this.location.address = "";
            this.location.zipCode = "";
            this.location.city = "";
            this.$toast.success(response.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    initMap() {
      if (this.map != undefined) {
        this.map.remove();
      }
      let center = {
        long: 9.5018,
        lat: 56.2639
      };

      this.map = window.L.map("geography-map", {
        // [lat, long]
        center: [center.lat, center.long],
        zoom: 6
      });

      window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      this.locationList.forEach(item => {
        window.L.marker([item.lat, item.long])
          .addTo(this.map)
          .bindPopup(item.address)
          .openPopup();
      });
    }
  }
};
</script>

<style lang="scss">
.coach-geography-page {
  background: $body-bg;
  height: 100%;
  /* Map Styles */
  .geography-map {
    width: 100%;
    height: 400px;
    z-index: 0;
  }
}
</style>
