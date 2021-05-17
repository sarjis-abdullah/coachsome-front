<template>
  <!-- News Card -->
  <div class="service-card">
    <v-card>
      <div class="service-card__header">
        <div class="service-card__header-left">
          <div class="service-card__title">Faster booking</div>
        </div>
        <div class="service-card__header-right">
          <v-btn text>
            <VIcon>close</VIcon>
          </v-btn>
        </div>
      </div>
      <div class="service-card__body">
        <div class="service-card__body-text">
          eleifend mi ut amet dignissim turpis risus purus, sed eget lectus leo tortor at quam iaculis velit tellus vitae vivamus suspendisse
          eleifend mi ut amet dignissim turpis risus purus, sed eget lectus leo tortor at quam iaculis velit tellus vitae vivamus suspendisse
        </div>
        <div class="service-card__btn--more">
          <v-btn text>
            {{ $t('btn_label_view_more') }}
          </v-btn>
        </div>
      </div>
    </v-card>
  </div>
  <!-- News Card -->
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.service-card {
  border-top: 5px solid #15577c;
  background: #ffffff;
  box-shadow: 0px 10px 20px rgba(159, 174, 194, 0.15);
  border-radius: 10px;
  .v-card {
    padding-bottom: 18px;
  }
  &__header {
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 24px;
    padding-right: 24px;
    display: flex;
    border-bottom: 1px solid #e1e8f1;
    > * {
      flex: 1;
    }
  }
  &__header-right {
    text-align: right;
  }
  &__title {
    font-family: $font-family;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    color: $primary-light-1;
  }
  &__body {
    margin-top: 20px;
    padding-left: 24px;
    padding-right: 24px;
  }
  &__body-text {
    font-family: $font-family;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;
    color: #2c3749;
  }
  &__btn--more {
    .v-btn {
      padding-left: 0px;
      font-family: $font-family;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      background: transparent;
      color: #6f8098;
      text-transform: none !important;
    }
  }

  &__footer {
    display: flex;
    clear: left;
    padding-left: 24px;
    padding-right: 24px;
    margin-top: 15px;
    justify-content: space-between;
    > * {
      flex: 1;
    }
  }
  &__footer-left {
    .v-btn {
      background: #edb041;
      border-radius: 8px;
      font-family: $font-family;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      text-align: center;
      color: #1a202d;
    }
  }
  &__footer-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  &__currency-symbol {
    margin-top: -25px;
    font-family: $font-family;
    font-style: normal;
    font-weight: 800;
    font-size: 18px;
    line-height: 25px;
    color: #1a202d;
  }
  &__currency-price {
    font-family: $font-family;
    font-style: normal;
    font-weight: 800;
    font-size: 36px;
    line-height: 49px;
    color: #1a202d;
  }
  &__currency-footer-text {
    margin-left: 25px;
    font-family: $font-family;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    color: #6f8098;
  }
}
</style>