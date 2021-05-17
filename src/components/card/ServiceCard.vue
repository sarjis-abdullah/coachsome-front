<template>
  <div class="service-card">
    <v-card>
      <div class="service-card__header">
        <div class="service-card__title">{{ title }}</div>
        <div class="d-flex justify-space-between align-center">
          <div>
            <div class="service-card__sale-price">
              {{ currencyService.toCurrency(salePrice) }}
              <span v-if="isCampPackage" class="service-card__per-person"
                >/ {{ $t("package_card_text_person") }}</span
              >
            </div>
            <div
              class="service-card__original-price text--secondary"
              v-if="discount > 0"
            >
              {{ currencyService.toCurrency(originalPrice) }}
            </div>
          </div>
          <div
            v-if="attendeesMin && attendeesMax"
            class="service-card__min-max"
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
      <div class="service-card__body">
        <div class>
          <slot name="description" :text="description">{{ description }}</slot>
        </div>
      </div>
      <div
        class="service-card__footer d-flex justify-space-between align-center"
      >
        <slot name="book-now-btn">
          <v-btn color="accent">{{ $t("btn_label_book_now") }}</v-btn>
        </slot>
        <div class="d-flex flex-column">
          <div class="service-card__session" v-if="session > 0">
            {{ session }} {{ $tc("service_card_text_session", session) }}
          </div>
          <div class="service-card__minute" v-if="timePerSession > 0">
            {{ timePerSession }} {{ $t("text_minutes") }}
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import packageHelper from "@/helper/package";
import { currencyService } from "@/services";

export default {
  props: [
    "title",
    "description",
    "discount",
    "originalPrice",
    "salePrice",
    "session",
    "timePerSession",
    "category",
    "attendeesMin",
    "attendeesMax"
  ],
  data() {
    return {
      currencyService
    };
  },
  computed: {
    isCampPackage() {
      let isCampPackage = false;
      if (this.category) {
        isCampPackage = packageHelper.getCampPackageId() == this.category.id;
      }
      return isCampPackage;
    }
  }
};
</script>

<style lang="scss" scoped>
.service-card {
  @include shadow-3;
  border-top: 5px solid $primary-light-1;
  background: $white;
  border-radius: 10px;
  &__header {
    padding-top: 18px;
    padding-bottom: 18px;
    padding-left: 24px;
    padding-right: 24px;
    border-bottom: 1px solid #e1e8f1;
  }
  &__title {
    @include h3;
    color: $primary-light-1;
    font-weight: bold;
  }
  &__min-max {
    @include h6;
    color: $grey-500;
  }
  &__body {
    @include h5;
    margin-top: 20px;
    padding-left: 24px;
    padding-right: 24px;
  }
  &__footer {
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 15px;
    margin-top: 15px;
  }
  &__per-person {
    @include h6;
  }
  &__original-price {
    @include h6;
    text-decoration: line-through;
    font-weight: 800;
    color: $grey-500;
  }
  &__sale-price {
    @include h4;
    font-weight: 800;
    color: $black;
  }
  &__session,
  &__minute {
    @include h6;
    color: $grey-600;
  }
}
</style>
