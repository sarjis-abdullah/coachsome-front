<template>
  <div class="package-card">
    <v-card class="mx-auto" outlined>
      <!-- Header -->
      <div class="package-card__header pt-5">
        <div class="d-flex justify-space-between">
          <div class="package-card__title text-ellipsis">{{ title }}</div>
        </div>
        <div class="d-flex justify-space-between align-center">
          <div>
            <div
              class="package-card__sale-price"
              
            >
              <slot name="sale-price" :price="salePrice">{{ salePrice }}</slot>
              <span v-if="isCampPackage" class="package-card__per-person">
                / {{ $t("package_card_text_person") }}</span
              >
            </div>
            <div
              class="package-card__original-price"
              
            >
              <slot
                name="original-price"
                :price="originalPrice"
                :discount="discount"
                >{{ originalPrice }}</slot
              >
            </div>
          </div>
          <div
            class="package-card__min-max"
            v-if="attendeesMin && attendeesMax"
            
          >
            <div>
              {{ $t("general_text_min") }}: {{ attendeesMin }}
              {{ $t("general_text_people") }}
            </div>
            <div>
              {{ $t("general_text_max") }}: {{ attendeesMax }}
              {{ $t("general_text_people") }}
            </div>
          </div>
        </div>
      </div>

      <!-- Body -->
      <div
        class="package-card__body"
        
      >
        <read-more
          :more-str="packageStatus != 0 ? $t('btn_label_read_more') : ''"
          :text="description"
          link="#"
          :less-str="packageStatus != 0 ? $t('btn_label_read_less') : ''"
          :max-chars="maxChars"
        ></read-more>
      </div>

      <!-- Footer -->
      <div class="package-card__footer">
        <div class="text-right">
          <div class="package-card__session-info">
            <div class="d-flex flex-wrap flex-column">
              <div >
                {{ session }} {{ $t("text_session") }}
              </div>
              <div >
                {{ timePerSession }} {{ $t("text_hours") }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import { priceHelper,packageHelper } from "@/helper";
export default {
  props: [
    "title",
    "description",
    "status",
    "discount",
    "originalPrice",
    "salePrice",
    "session",
    "timePerSession",
    "isSpecialPrice",
    "attendeesMin",
    "attendeesMax",
    "completedByDays",
    "rate",
    "currency",
    "maxChars",
    "category"
  ],
  data() {
    return {
      packageStatus: null
    };
  },
  methods: {
    checked() {
      this.$emit("change-status", this.packageStatus);
    },
    edit() {
      this.$emit("edit");
    },
    remove() {
      this.$emit("remove");
    }
  },
  created() {
    this.packageStatus = this.status;
  },
  mounted() {},
  watch: {
    status(val) {
      this.packageStatus = val;
    }
  },
  computed: {
    isCampPackage() {
      let isCampPackage = false;
      // console.log(this.category);
      if (this.category) {
        isCampPackage = packageHelper.getCampPackageId() == this.category.id;
      }
      return isCampPackage;
    },
    calculatePrice() {
      let price = 0.0;
      if (this.isSpecialPrice) {
        price = this.price;
      } else {
        price = priceHelper.calculatePackagePrice(
          this.session,
          this.timePerSession,
          this.rate
        );
      }
      return price;
    },
    calculateOriginalPrice() {
      let originalPrice = 0.0;
      if (this.isSpecialPrice) {
        originalPrice = this.originalPrice;
      } else {
        originalPrice = packageHelper.calculateOriginalPrice(
          this.session,
          this.timePerSession,
          this.rate
        );
      }
      return originalPrice;
    },
    calculateSalePrice() {
      let salePrice = 0.0;
      if (this.isSpecialPrice) {
        salePrice = this.salePrice;
      } else {
        salePrice = packageHelper.calculateOriginalPrice(
          this.session,
          this.timePerSession,
          this.rate,
          this.discount
        );
      }
      return salePrice;
    }
  }
};
</script>

<style lang="scss" scoped>
.package-card {
  @include shadow-4;
  background: $white;
  border-radius: 10px;
  &__title {
    @include h3;
    font-weight: bold;
    color: $primary-light-1;
  }
  &__header {
    border-bottom: 1px solid #e1e8f1;
    padding-left: 0.8em;
    padding-right: 0.8em;
    border-top: 5px solid $primary-light-1;
  }
  &__original-price {
    @include h6;
    text-decoration: line-through;
    font-weight: 800;
    color: $grey-500;
  }
  &__sale-price {
    @include h3;
    font-weight: 800;
    color: $black;
  }
  &__min-max {
    @include h6;
    color: $grey-500;
  }
  &__per-person {
    @include h6;
  }
  &__body {
    font-family: $font-family;
    padding-top: 0.8em;
    padding-left: 1em;
    padding-right: 1em;
    margin-bottom: 2em;
  }
  &__footer {
    padding-left: 1em;
    padding-right: 1em;
    padding-bottom: 1em;
  }
  &__session-info {
    @include h6;
    margin-top: 0.5em;
    color: #6f8098;
  }
}
</style>
