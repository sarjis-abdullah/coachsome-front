<template>
  <div
    :class="[
      'sport-search',
      {
        'sport-search--sm': $vuetify.breakpoint.smAndDown,
        'sport-search--md': $vuetify.breakpoint.mdAndUp
      }
    ]"
  >
    <v-autocomplete
      v-model="selectedValue"
      class="sport-search__input"
      ref="searchField"
      :search-input.sync="search"
      @keyup.enter="handleSelect"
      @input="handleSelect"
      hide-no-data
      color="white"
      :items="items"
      :filter="item => item"
      block
      solo
      :loading="loading"
      flat
      height="58px"
      hide-details
      append-icon
      :label="$t('search_input_placeholder_txt')"
      prepend-inner-icon="search"
    >
      <template v-slot:prepend-inner>
        <v-icon class="sport-search__icon">search</v-icon>
      </template>
      <template v-slot:selection="{ item }">
        <div>
          {{ item.title }}
        </div>
      </template>
      <template v-slot:item="{ item }">
        <v-list-item-content>
          <v-list-item-title>
            {{ $t(item.title) }}
            <small class="grey--text">( {{ item.group }} )</small>
          </v-list-item-title>
          <v-list-item-subtitle> </v-list-item-subtitle>
        </v-list-item-content>
      </template>
    </v-autocomplete>
    <v-btn
      dark
      class="sport-search__btn text-normal"
      tile
      color="#D61BA2"
      :block="$vuetify.breakpoint.smAndDown"
      depressed
      @click.stop="handleBtnClick"
      >{{ $t("front_btn_label_search") }}</v-btn
    >
  </div>
</template>

<script>
import { endpoint } from "../../../../../api";
import { pathData } from "@/data";

const group = {
  SPORT: "Sport",
  TAG: "TAG",
  CITY: "City",
  NAME: "Name"
};

export default {
  data() {
    return {
      loading: false,
      selectedValue: null,
      items: [],
      search: null
    };
  },
  watch: {
    search(val) {
      this.loading = true;
      const params = {
        key: val
      };
      this.$axios
        .get(endpoint.MARKETPLACE_SEARCHES, { params })
        .then(({ data }) => {
          this.items = [];
          if (data.categories.length) {
            this.items.push({ header: group.SPORT });
            data.categories.forEach(item => {
              item.group = group.SPORT;
              item.title = item.name;
              this.items.push(item);
            });
          }
          if (data.tags.length) {
            this.items.push({ header: group.TAG });
            data.tags.forEach(item => {
              item.group = group.TAG;
              item.title = item.name;
              this.items.push(item);
            });
          }

          if (data.locations.length) {
            this.items.push({ header: group.CITY });
            data.locations.forEach(item => {
              item.group = group.CITY;
              item.title = item.city;
              this.items.push(item);
            });
          }

          if (data.users.length) {
            this.items.push({ header: group.NAME });
            data.users.forEach(item => {
              item.group = group.NAME;
              item.title = item.profileName;
              this.items.push(item);
            });
          }
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  methods: {
    handleSelect(item) {
      this.navigate(item);
    },

    handleBtnClick() {
      console.log("handleBtnClick");
    },
    navigate(item) {
      if (item) {
        if (item.group == group.NAME) {
          this.$router.push(
            this.localePath(pathData.pages.publicProfile(item.userName))
          );
        }

        if (item.group == group.SPORT) {
          let name = item.title
            .toLowerCase()
            .split(" ")
            .join("+");

          this.$router.push(
            this.localePath({ name: pathData.pages.marketplace.name }) +
              "/" +
              name
          );
        }
        if (item.group == group.TAG) {
          this.$router.push(
            this.localePath({ name: pathData.pages.marketplace.name }) +
              "?tagName=" +
              item.title
          );
        }

        if (item.group == group.CITY) {
          this.$router.push(
            this.localePath({ name: pathData.pages.marketplace.name }) +
              "?cityName=" +
              item.title
          );
        }
      }
    }
  }
};
</script>

<style lang="scss">
/* Search */
.sport-search {
  .v-input__control {
    border-radius: 0;
    background: #fcfdfe;
  }
  .v-btn:not(.v-btn--round).v-size--default {
    height: 58px;
  }
  &--md {
    display: flex;
    .sport-search__icon {
      color: #6f8098;
    }
    .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
      > .v-input__control
      > .v-input__slot {
      box-shadow: none;
      border-top: 1px solid #cad5e1;
      border-bottom: 1px solid #cad5e1;
      border-left: 1px solid #cad5e1;
      background: #fcfdfe;
    }
    .v-input {
      label {
        color: #9faec2;
      }
      .v-input__slot {
        border-radius: 0;
        background: #fcfdfe;
      }
    }
    .v-btn {
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      font-weight: 600;
      font-size: 18px;
      height: 58px;
    }
  }
  &--sm {
    .v-btn {
      margin-top: 10px;
      border-radius: 5px;
      font-weight: 600;
      font-size: 18px;
      height: 58px;
    }
  }
}
</style>
