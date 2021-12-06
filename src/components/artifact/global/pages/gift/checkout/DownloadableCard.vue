<template>
  <div class="downloadable-card">
    <div class="gift-card">
      <div class="top-section">
        <div class="top-section__title">
          Dear {{ firstName }} {{ lastName }}
        </div>
        <div class="top-section__description">
          :GiftcardText Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
          ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
          Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
          ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
        </div>
      </div>
      <div class="middle-section">
        <div class="code-title">
          {{ "GIFT CARD CODE" }}
        </div>
        <div class="code">
          {{ code }}
        </div>
        <div class="help-text">
          From {{ firstName }} {{ lastName }} - I hope this can help you on your
          way
        </div>
        <div class="code-value">{{ value }} {{ currency }}</div>
        <div class="how-to-use">
          How to use your gift
        </div>
        <div class="steps">
          <div class="step-card">
            <div class="step-card__title">
              1
            </div>
            <div class="step-card__description">
              Select your sport at Coachsome.com
            </div>
          </div>
          <div class="step-card">
            <div class="step-card__title">
              2
            </div>
            <div class="step-card__description">
              Find & book a coach
            </div>
          </div>
          <div class="step-card">
            <div class="step-card__title">
              3
            </div>
            <div class="step-card__description">
              On checkout, use code {{ code }}
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-section">
        <div class="bottom-section__title">
          <img :src="require(`@/assets/images/logo-light.png`)" alt="" />
        </div>
        <div class="bottom-section__description">
          GIFT CERTIFICATE
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["code", "value", "currency", "firstName", "lastName"],
  mounted() {}
};
</script>

<style lang="scss" scoped>
.downloadable-card {
  .gift-card {
    .top-section {
      &__title {
        margin-top: 50px;
        width: 100%;
        font-family: "Pacifico";
        font-style: normal;
        font-weight: normal;
        font-size: 48px;
        line-height: 84px;
        text-align: center;
        color: $primary-light-2;
      }
      &__description {
        width: 100%;
        font-family: Pacifico;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 27px;
        margin-top: 100px;
        margin-bottom: 300px;
        text-align: center;
        color: #49556a;
      }
    }
    .middle-section {
      .code-title {
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 14px;
        text-align: center;
        color: #9faec2;
      }

      .code {
        font-family: $font-family;
        font-weight: 800;
        font-size: 24px;
        line-height: 33px;
        text-align: center;
        color: $primary-light-2;
      }
      .help-text {
        font-family: $font-family;
        font-weight: normal;
        font-size: 14px;
        line-height: 27px;
        text-align: center;
        color: #000000;
      }
      .code-value {
        font-family: $font-family;
        font-weight: 800;
        font-size: 48px;
        line-height: 65px;
        text-align: center;
        color: #d61ba2;
      }
      .how-to-use {
        font-family: $font-family;
        font-weight: 800;
        font-size: 18px;
        line-height: 25px;
        text-align: center;
        color: $primary-light-2;
      }

      .steps {
        display: flex;
        width: 100%;
        margin-top: 20px;
        margin-bottom: 20px;
        justify-content: space-between;

        .step-card {
          height: 100px;
          background: #ecf2f7;
          border-radius: 12px;
          flex-grow: 1;
          padding: 10px;
          margin: 20px;
          display: flex;
          flex-direction: column;
          text-align: center;
          align-items:center;
          justify-content: center;
          &__title {
            font-family: $font-family;
            font-weight: 800;
            font-size: 18px;
            line-height: 25px;
            text-align: center;
            color: $primary-light-1;
          }
          &__description {
            font-family: $font-family;
            font-weight: 600;
            font-size: 12px;
            line-height: 16px;
            text-align: center;
            color: #2c3749;
          }
        }
      }
    }
    .bottom-section {
      background: $primary-light-1;
      &__title {
        width: 100%;
        text-align: center;
      }
      &__description {
        font-family: $font-family;
        font-weight: bold;
        font-size: 48px;
        line-height: 65px;
        text-align: center;
        color: #e1e8f1;
      }
    }
  }
}
</style>
