<template>
  <v-autocomplete
    dense
    @click="removeSelectedValue"
    @input="goToMarketPlaceAndSearchByQueryParam"
    v-model="selectedCategory"
    :loading="loading"
    :items="items"
    :search-input.sync="search"
    item-text="name"
    item-value="id"
    flat
    hide-no-data
    hide-details
    :label="$t('app_bar_search_label_placeholder')"
    append-icon
    solo-inverted
  >
    <template v-slot:item="data">
      {{ $t(data.item.t_key) }}
    </template>
    <template v-slot:selection="data">
      <span>{{ $t(data.item.t_key) }}</span>
    </template>
    <template v-slot:append>
      <div>
        <v-icon>search</v-icon>
      </div>
    </template>
  </v-autocomplete>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { endpoint } from "../../../api";
export default {
  data() {
    return {
      items: [],
      search: null,
      selectedCategory: null,
      loading: false
    };
  },
  computed: {},
  watch: {
    search: function() {
      this.searchByKey();
    }
  },
  created() {},
  methods: {
    searchByKey() {
      this.loading = true;
      this.$axios
        .get(endpoint.MARKETPLACE_SEARCHES)
        .then(data => {
          this.items = data.sportCategories;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    removeSelectedValue() {
      this.selectedCategory = null;
    },
    goToMarketPlaceAndSearchByQueryParam() {
      this.$router.push({
        name: "marketplace",
        query: { categoryId: this.selectedCategory.toString() }
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
