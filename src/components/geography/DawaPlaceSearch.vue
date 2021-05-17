<template>
  <div class="autocomplete-container">
    <input
      v-model="address"
      type="search"
      :placeholder="$t('geography_placeholder_address')"
      solo
      id="dawa-autocomplete-input"
      class="address__input"
      ref="input"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      address: "",
      location: {
        zipCode: "",
        city: "",
        address: "",
        long: "",
        lat: "",
      },
    };
  },
  mounted() {
    var dawaAutocomplete2 = require("dawa-autocomplete2");
    var inputElm = document.getElementById("dawa-autocomplete-input");

    dawaAutocomplete2.dawaAutocomplete(inputElm, {
      select: (selected) => {
        this.location.long = selected.data.x;
        this.location.lat = selected.data.y;
        this.location.zipCode = selected.data.postnr;
        this.location.city = selected.data.postnrnavn;
        this.location.address = selected.tekst;
        this.$emit("location", { ...this.location });
      },
    });
  },
};
</script>

<style lang="scss">
.address__input {
  line-height: 20px;
  padding: 12px 0 12px 10px;
  background: white;
  border-radius: 5px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
.address__input:focus {
  outline: none;
}
.autocomplete-container {
  /* relative position for at de absolut positionerede forslag får korrekt placering.*/
  position: relative;
  width: 100%;
}

.autocomplete-container input {
  /* Både input og forslag får samme bredde som omkringliggende DIV */
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
</style>
