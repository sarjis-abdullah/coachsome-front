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
            // console.log(item.short_name);
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
    padding: 8px 15px 8px 15px;
    background: white;
    border: 1px solid $grey-500!important;
    border-radius: 4px;
    font-size: 16px;
    letter-spacing: normal;
    max-width: 100%;
    text-align: left;

  }
  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: $grey-500!important;
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: $grey-500!important;
  }

  ::-ms-input-placeholder { /* Microsoft Edge */
    color: $grey-500!important;
  }
  .search-input:focus {
    outline: none;
  }
  #map {
    height: 300px;
  }
}
</style>
