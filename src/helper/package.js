import { constantData } from "@/data";

export default {
  getDefaultPackageId: () => {
    return constantData.PACKAGE_CATEGORY_ID_DEFAULT;
  },
  getCampPackageId: () => {
    return constantData.PACKAGE_CATEGORY_ID_CAMP;
  },
  getShowingMaxCharOfPackgeCardDescription: () => {
    return constantData.PACKAGE_CARD_DESCRIPTION_DEFAULT_SHOW_MAX_CHAR;
  },
  calculateOriginalPrice: (session, minutePerSession, rate) => {
    let price = 0.0;
    if (session || minutePerSession) {
      if (session && !minutePerSession) {
        price = rate * session;
      }
      if (!session && minutePerSession) {
        price = rate * (minutePerSession / 60);
      }
      if (session && minutePerSession) {
        price = session * (rate * (minutePerSession / 60));
      }
    } else {
      price = rate;
    }
    return Number(price).toFixed(2);
  },
  calculateSalePrice: (session, minutePerSession, rate, discount) => {
    let salePrice = 0.0;
    if (discount && discount > 0) {
      let originalPrice = this.calculateOriginalPrice(
        session,
        minutePerSession,
        rate
      );
      let calculateDiscount = originalPrice * (discount / 100);
      salePrice = originalPrice - calculateDiscount;
    } else {
      salePrice = this.calculateOriginalPrice(session, minutePerSession, rate);
    }
    return Number(salePrice).toFixed(2);
  },
  calculatePackagePrice: function(session, minutePerSession, rate) {
    let price = 0.0;
    if (session || minutePerSession) {
      if (session && !minutePerSession) {
        price = rate * session;
      }
      if (!session && minutePerSession) {
        price = rate * (minutePerSession / 60);
      }
      if (session && minutePerSession) {
        price = session * (rate * (minutePerSession / 60));
      }
    } else {
      price = rate;
    }
    return Number(price).toFixed(2);
  }
};
