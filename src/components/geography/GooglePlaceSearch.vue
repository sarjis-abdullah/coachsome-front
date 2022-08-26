<template>
  <div class="place-search float-container">
    <label for="customInput" class="d-none"  id="customLabel">&nbsp;{{$t('geography_placeholder_address')}}&nbsp;</label>
    <input
      id="customInput"
      @focus="inputFocus()"
      @blur="inputFocusOut()"
      v-model="address"
      @keyup.enter="enterKeyUpHandle"
      class="search-input search-input--inactive"
      type="text"
      :placeholder="addressLabel"
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
      addressLabel:  this.$i18n.t("geography_placeholder_address"),
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
    inputFocus(){
      this.addressLabel = "";
      const el = document.getElementById('customLabel');
      el.classList.remove('d-none');
      const selfEl = document.getElementById('customInput');
      selfEl.classList.remove('search-input--inactive');
      selfEl.classList.add('search-input--active');
    },
    inputFocusOut(){
      this.addressLabel = this.$i18n.t("geography_placeholder_address");
      if(this.address == ""){
        const el = document.getElementById('customLabel');
        el.classList.add('d-none');
      }
      const selfEl = document.getElementById('customInput');
      selfEl.classList.remove('search-input--active');
      selfEl.classList.add('search-input--inactive');
    },
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
<style scoped>
.float-container {
  box-sizing: border-box;
  position: relative;
  align-items: stretch;
} 
input {  
    border: none;
    font-size: 16px;
    outline: 0;
    padding: 16px 0 10px;    
    width: 100%;
  }

  label {
    font-size: 12px;
    font-family: "Roboto", sans-serif;
    position: absolute;
    left: 2px;
    background: #F7FAFC !important;
    color: #9FAEC2 !important;
    height: 20px;
    top: 7px;
    line-height: 20px;
    font-size: 16px;
    letter-spacing: normal;
    max-width: 133%!important;
    overflow: hidden!important;
    text-overflow: ellipsis!important;
    white-space: nowrap!important;
    pointer-events: auto!important;
    transform: translateY(-16px) scale(0.75)!important;
    transition-timing-function: ease-in-out!important;
    animation: animationname .15s linear;
    transition: .15s cubic-bezier(0.25, 0.8, 0.5, 1)!important;;
    -webkit-transition: .15s cubic-bezier(0.25, 0.8, 0.5, 1)!important;;
  }
  @keyframes animationname{
  100%{
    left: 2px;
    top: 8px;
    font-size: 16px;
  }
  75%{
    left: 4px;
    top: 11px;
    font-size: 17px;
  }
  50%{
    left: 6px;
     top: 14px;
     font-size: 18px;
  }
  25%{
    left: 8px;
     top: 17px;
     font-size: 19px;
  }
  0%{
     left: 10px;
     top: 20px;
     font-size: 20px;
  }
}


</style>
<style lang="scss">
.place-search {
  .search-input {
    width: 100%;
    padding: 8px 15px 8px 15px;
    background: white;
    border-radius: 4px;
    font-size: 16px;
    letter-spacing: normal;
    max-width: 100%;
    text-align: left;
    &--active{
      border: 2px solid $grey-500!important;
      background: #F7FAFC !important;
    }
    &--inactive{
      border: 1px solid $grey-500!important;
      background: white !important;
    }

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
