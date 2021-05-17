<template>
  <div
    :class="[
      'sport-search',
      {
        'sport-search--sm': $vuetify.breakpoint.smAndDown,
        'sport-search--md': $vuetify.breakpoint.mdAndUp,
      },
    ]"
  >
    <v-autocomplete
      v-model="selectedValue"
      class="sport-search__input"
      ref="searchField"
      @keyup.enter="handleEnterKeyBtnClick()"
      @input="changeItem"
      :search-input.sync="search"
      hide-no-data
      color="white"
      :items="values"
      item-text="name"
      item-value="id"
      block
      solo
      :loading="isLoading"
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
      <template v-slot:item="{ item }">
        <v-list-item-content>
          <v-list-item-title>
            {{ $t(item.t_key) }}
          </v-list-item-title>
          <v-list-item-subtitle></v-list-item-subtitle>
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
export default {
  props: {
    items: {
      type: Array,
    },
  },
  data() {
    return {
      isLoading: false,
      selectedValue: null,
      values: [],
      search: null,
    };
  },
  watch: {
    search() {
      this.isLoading = true;
      setTimeout(() => {
        this.values = this.items;
        this.isLoading = false;
      }, 2000);
    },
  },
  methods: {
    changeItem() {
      this.$emit("on-item-select", this.selectedValue);
    },
    handleEnterKeyBtnClick() {
      this.$emit("on-item-select", this.selectedValue);
    },
    handleBtnClick() {
      this.$emit("on-item-select", this.selectedValue);
    },
  },
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
