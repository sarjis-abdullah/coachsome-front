<template>
  <v-dialog v-model="dialog" persistent scrollable max-width="1000">
    <v-card class="package-create-dialog">
      <v-card-title class="grey lighten-2">
        Create Package
        <v-spacer></v-spacer>
        <v-btn icon @click="handleCloseBtnClick">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row class="pt-5" justify="center">
          <v-col cols="12" md="12">
            <v-tabs>
              <v-tabs-slider></v-tabs-slider>
              <v-tab v-for="i in tabs" :key="i" :href="`#tab-${i}`">{{
                i == "default"
                  ? $t("text_default_package")
                  : $t("text_camp_package")
              }}</v-tab>
              <v-tab-item value="tab-default">
                <package-default
                  :rate="rate"
                  @package-created="handlePackageCreate"
                ></package-default>
              </v-tab-item>
              <v-tab-item value="tab-camp">
                <package-camp
                  :rate="rate"
                  @package-created="handlePackageCreate"
                ></package-camp>
              </v-tab-item>
            </v-tabs>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import PackageDefault from "./PackageDefault";
import PackageCamp from "./PackageCamp";

export default {
  components: {
    PackageDefault,
    PackageCamp,
  },
  props: ["value", "rate"],
  data: () => ({
    dialog: false,
    showTabs: false,
    tabs: ["default", "camp"],
  }),
  watch: {
    value(val) {
      this.dialog = val;
    },
    dialog(val) {
      if (!val) {
        this.$emit("close");
      }
    },
  },
  methods: {
    handlePackageCreate(newPackage) {
      this.$emit("created", newPackage)
    },
    handleCloseBtnClick() {
      this.$emit("close");
    },
    handleSaveBtnClick() {},
  },
};
</script>

<style lang="scss">
.package-create-dialog {
  .v-tab--active {
    background: $primary-light-1;
    color: white;
  }
}
</style>
