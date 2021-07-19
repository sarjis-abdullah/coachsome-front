<template>
  <div class="request-box-location">
    <v-card>
      <v-card-title class="justify-center">
        {{ $t("chat_req_box_location_title") }}
        <v-spacer></v-spacer>
        <v-btn icon @click="handleCancelBtnClick">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <div class="request-box-location__map">
          <div id="map" style="height: 200px;"></div>
        </div>
        <v-row>
          <v-col cols="12" class="text-center">
            <GooglePlaceSearch
              :value="googlePlaceSearch.value"
              @location="handleGoogleLocation"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="d-flex justify-center flex-column">
            <v-btn
              class="primary-light-1"
              depressed
              :disabled="!isEnableSubmitBtn"
              @click="handleSubmitBtnClick"
            >
              {{ $t("chat_location_box_btn_label_submit") }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import GooglePlaceSearch from "@/components/geography/GooglePlaceSearch";

export default {
  props: ["locations"],
  components: {
    GooglePlaceSearch
  },
  data: () => ({
    map: null,
    zip: "",
    city: "",
    address: "",
    long: "",
    lat: "",
    googlePlaceSearch: {
      value: ""
    },
    coordinates: []
  }),
  computed: {
    isEnableSubmitBtn() {
      if (this.city && this.address) {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted() {
    this.initMap();
  },
  methods: {
    handleGoogleLocation(item) {
      let { zipCode, city, address, long, lat } = item;
      this.long = long;
      this.lat = lat;
      this.zip = zipCode;
      this.city = city;
      this.address = address;
    },
    handleCancelBtnClick() {
      this.$emit("cancel");
    },
    handleSubmitBtnClick() {
      let location = {
        zip: this.zip,
        city: this.city,
        address: this.address,
        long: this.long,
        lat: this.lat
      };
      this.$emit("submit", location);
    },
    initMap() {
      this.map = window.L.map("map", {});

      window.L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {}
      ).addTo(this.map);

      this.locations.forEach(item => {
        let coordinate = [item.lat, item.long];
        this.coordinates.push(coordinate);
        window.L.marker(coordinate)
          .addTo(this.map)
          .bindPopup(item.address)
          .openPopup()
          .on("click", e => {
            let l = this.locations.find(
              item => item.lat == e.latlng.lat && item.lang == e.latlng.lang
            );
            console.log(l);
            if (l) {
              this.address = l.address;
              this.zip = l.zip;
              this.city = l.city;
              this.long = l.long;
              this.lat = l.lat;
              this.googlePlaceSearch.value = l.address;
            }
          });
      });

      setTimeout(() => {
        let bounds = new window.L.LatLngBounds([this.coordinates]);
        this.map.fitBounds(bounds);
      }, 3);
    }
  }
};
</script>

<style lang="scss" scoped>
.request-box-location {
}
</style>
