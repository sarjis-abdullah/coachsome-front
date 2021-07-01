<template>
  <div class="place-search">
    <input
      v-model="address"
      @keyup.enter="enterKeyUpHandle"
      class="search-input"
      type="text"
      :placeholder="$t('geography_placeholder_address')"
      ref="search"
      :style="{ height: height }"
    />
  </div>
</template>
<script>
export default {
  props: ["value", "height"],
  data() {
    return {
      address: "",
      google: null,
      location: {
        zipCode: "",
        city: "",
        address: "",
        long: "",
        lat: "",
        cca2: "",
        googleMapApiResponse: null
      }
    };
  },
  watch: {
    value(val) {
      this.address = val;
    },
    address(val) {
      if (!val.length) {
        this.$emit("no-value");
      }
    }
  },
  beforeDestroy() {
    this.address = "";
  },
  mounted() {
    this.init();
  },
  methods: {
    enterKeyUpHandle() {
      this.$emit("location", this.location);
    },
    init() {
      this.google = window.google;
      let autocomplete = new this.google.maps.places.Autocomplete(
        this.$refs.search,
        {
          fields: ["address_components", "geometry", "formatted_address"]
        }
      );
      autocomplete.addListener("place_changed", () => {
        // Reset location
        this.location.zipCode = "";
        this.location.city = "";
        this.location.lat = "";
        this.location.long = "";
        this.location.address = "";
        this.location.cca2 = "";

        // Set new location value
        let place = autocomplete.getPlace();

        this.location.googleMapApiResponse = place;
        this.location.address = place.formatted_address;
        this.location.lat = place.geometry.location.lat();
        this.location.long = place.geometry.location.lng();

        place.address_components.forEach(item => {
          // Zip Code finder
          if (item.types.includes("postal_code")) {
            this.location.zipCode = item.long_name;
          }

          // City finder
          if (!this.location.city) {
            if (item.types.includes("administrative_area_level_1")) {
              this.location.city = item.long_name;
            }
          }
          if (!this.location.city) {
            if (item.types.includes("locality")) {
              this.location.city = item.long_name;
            }
          }
          if (!this.location.city) {
            if (item.types.includes("postal_town")) {
              this.location.city = item.long_name;
            }
          }
          if (!this.location.city) {
            if (item.types.includes("sublocality_level_1")) {
              this.location.city = item.long_name;
            }
          }

          // Country finder
          if (item.types.includes("country")) {
            console.log(item.short_name);
            this.location.cca2 = item.short_name;
          }
        });
        this.$emit("location", this.location);
      });
    }
  }
};
</script>

<style lang="scss">
.place-search {
  .search-input {
    width: 100%;
    line-height: 20px;
    padding: 12px 0 12px 10px;
    background: white;
    border-radius: 5px;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  }
  .search-input:focus {
    outline: none;
  }
  #map {
    height: 300px;
  }
}
</style>
