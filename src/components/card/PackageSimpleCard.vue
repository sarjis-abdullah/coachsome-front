<template>
  <div class="package-simple-card">
    <v-card>
      <div class="package-simple-card__header">
        <div class="package-simple-card__title">{{ title }}</div>
      </div>
      <div class="package-simple-card__body pb-2">
        <client-only>
          <read-more
            :more-str="$t('btn_label_read_more')"
            :text="description"
            link="#"
            :less-str="$t('btn_label_read_less')"
            :max-chars="150"
          ></read-more>
        </client-only>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: "" },
    description: { type: String, default: "" }
  }
};
</script>

<style lang="scss" scoped>
.package-simple-card {
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
    color: #2c3749;
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
