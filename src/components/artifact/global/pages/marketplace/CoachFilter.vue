<template>
  <div class="coach-filter">
    <div class="d-sm-flex">
      <!-- Category -->
      <div class="flex-grow-1 pr-sm-3 py-1" style="padding-bottom: 0;" v-if="filter.item.category.isActive">
        <v-autocomplete
          v-model="categoryFilter.select"
          :items="categories"
          @input="$emit('update:selectedCategories', categoryFilter.select)"
          :menu-props="{ closeOnContentClick: true }"
          chips
          hide-details
          clearable
          item-text="name"
          item-value="id"
          :search-input.sync="categoryFilter.search"
          multiple
          outlined
          dense
          class="default-text-field"
          color="#9FAEC2"
          background-color="white"
          :label="$t('marketplace_category_filter_placeholder_text')"
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
      </div>

      <!-- Location -->
      <div class="flex-grow-1 px-sm-3 py-1" v-if="filter.item.location.isActive">
        <GooglePlaceSearch height="39px" @location="handleGoogleLocation" />
      </div>

      <!-- Hourly price -->
      <div class="flex-grow-1 px-sm-3 py-1" v-if="filter.item.hourlyPrice.isActive">
        <v-select
          dense
          hide-details
          :label="hourlyPriceFilter.range.join([(separator = ' - ')])"
          outlined
          class="default-text-field"
          color="#9FAEC2"
          background-color="white"
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-content>
                <span class="title">{{
                  $t("marketplace_hourly_rate_filter_title_text")
                }}</span>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content :style="{}">
                <v-range-slider
                  color="primary-light-1"
                  v-model="hourlyPriceFilter.range"
                  :max="priceSliderMax"
                  :min="priceSliderMin"
                  @end="
                    $emit('update:price-slider-range', hourlyPriceFilter.range)
                  "
                  hide-details
                  class="align-center"
                ></v-range-slider>
                <span class="title font-weight-bold"
                  >{{ currencyCode }} {{ hourlyPriceFilter.range[0] }} -
                  {{ hourlyPriceFilter.range[1] }}</span
                >
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-select>
      </div>

      <!-- Country -->
      <div class="flex-grow-1 px-sm-3 py-1" v-if="filter.item.country.isActive">
        <v-autocomplete
          autocomplete="off"
          v-model="countryFilter.select"
          :items="countries"
          @change="() => $emit('update:selectedCountry', countryFilter.select)"
          item-text="displayName"
          item-value="code"
          outlined
          dense
          class="default-text-field"
          color="#9FAEC2"
          background-color="white"
          hide-no-data
          hide-details
          append-icon="expand_more"
          :label="$t('setting_input_hint_country')"
        ></v-autocomplete>
      </div>

      <!-- Radius -->
      <div class="flex-grow-1 px-sm-3 py-1" v-if="filter.item.radius.isActive">
        <v-select hide-details dense :label="radiusFilter.slider + ' km'" solo>
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
                  @end="changeRadius"
                  v-model="radiusFilter.slider"
                  :min="radiusSliderMin"
                  :max="radiusSliderMax"
                  @change="
                    $emit('update:radiusSlider', radiusFilter.slider);
                    $emit('update:radiusSliderMin', radiusSliderMin);
                    $emit('update:radiusSliderMax', radiusSliderMax);
                  "
                  hide-details
                  class="align-center"
                ></v-slider>
                <span class="title font-weight-bold"
                  >{{ radiusSlider }} km</span
                >
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-select>
      </div>

      <!-- Field chooser -->
      <div class="pl-sm-3 py-1">
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
            <v-list-item v-for="(item, i) in filter.item" :key="i">
              <v-list-item-action>
                <v-checkbox
                  :disabled="item.isDisabled"
                  v-model="item.isActive"
                  color="primary-light-1"
                  @click.stop="handleFieldChooserChange"
                ></v-checkbox>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ $t(item.t_key) }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
  </div>
</template>

<script>
import GooglePlaceSearch from "@/components/geography/GooglePlaceSearch";

export default {
  props: [
    "mobile",
    "categories",
    "selectedCategories",
    "radiusSlider",
    "radiusSliderMin",
    "radiusSliderMax",
    "priceSliderRange",
    "priceSliderMax",
    "priceSliderMin",
    "currencyCode",
    "countries",
    "selectedCountry"
  ],
  title: "",
  components: {
    GooglePlaceSearch
  },

  data() {
    return {
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
          hourlyPrice: {
            id: 3,
            text: "Hourly Price",
            t_key: "marketplace_filter_chooser_text_hourly_price",
            isActive: true,
            isDisabled: false
          },
          country: {
            id: 4,
            text: "Country",
            t_key: "filter_item_text_country",
            isActive: true,
            isDisabled: true
          },
          radius: {
            id: 5,
            text: "Radius",
            t_key: "marketplace_filter_chooser_text_radius",
            isActive: false,
            isDisabled: false,
          }
        }
      },
      categoryFilter: {
        select: [],
        search: null
      },
      radiusFilter: {
        slider: 100
      },
      hourlyPriceFilter: {
        range: [0, 99999999]
      },
      cityFilter: {
        name: null
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
        select: null,
        countryList: []
      }
    };
  },
  computed: {
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
    selectedCategories: {
      immediate: true,
      handler: function(value) {
        this.categoryFilter.select = value;
      }
    },
    radiusSlider: {
      immediate: true,
      handler: function(val) {
        this.radiusFilter.slider = val;
      }
    },
    priceSliderRange: {
      immediate: true,
      handler: function(val) {
        this.hourlyPriceFilter.range = val;
      }
    },
    selectedCountry: {
      immediate: true,
      handler: function(val) {
        this.countryFilter.select = val;
      }
    }
  },
  methods: {
    handlePriceChange() {
      this.$emit("update:price-slider-range", this.hourlyPriceFilter.range);
    },
    changeCategoryFilter() {
      this.categoryFilter.search = null;
    },
    handleGoogleLocation(item) {
      this.$emit("update:location", item);
    },
    remove(category) {
      const index = this.selectedCategories.findIndex(id => id == category.id);
      if (index >= 0) this.selectedCategories.splice(index, 1);
    },
    changeRadius() {},
    handleFieldChooserChange() {},
    handleHourlyPriceChange() {},
    handleCountryChange() {},
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
    padding: 5px 5px;
    position: fixed;
    z-index: 100;
    transition: all 0ms;
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
  // .map {
  //   position: fixed;
  //   right: 0;
  //   top: 0;
  //   width: 25%;
  //   height: 100vh;
  //   z-index: 0;
  //   margin-top: 48px;
  //   /* Leaflet icon */

  //   .leaflet-marker-icon {
  //     background: white;
  //     padding: 3px;
  //     border: 1px solid $primary-light-1;
  //     border-radius: 50%;
  //     width: 25px !important;
  //     height: 25px !important;
  //   }
  // }
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
}
</style>
