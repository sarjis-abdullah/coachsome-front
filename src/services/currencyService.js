import currency from "currency.js";
import { currencyConfig } from "@/config";

export default {
  key() {
    return currencyConfig.key;
  },
  currentCurrencyCode() {
    if (process.client) {
      if (localStorage.getItem(this.key())) {
        return localStorage.getItem(this.key());
      } else {
        this.setDefaultCurrencyCode();
        return localStorage.getItem(this.key());
      }
    }
  },
  setCurrencyCode(code) {
    localStorage.setItem(this.key(), code);
  },
  all() {
    return currencyConfig.list;
  },
  defaultCurrency() {
    return currencyConfig.default;
  },
  getBaseCurrency() {
    return currencyConfig.base;
  },
  getByCode(code) {
    let findCurrency = null;
    currencyConfig.list.forEach(item => {
      if (code == item.code) {
        findCurrency = item;
      }
    });

    if (!findCurrency) {
      findCurrency = this.defaultCurrency();
    }
    return findCurrency;
  },
  selectedCurrency() {
    return process.client
      ? this.getByCode(localStorage.getItem(this.key()))
      : "";
  },
  setDefaultCurrencyCode() {
    return localStorage.setItem(this.key(), currencyConfig.default.code);
  },
  getCurrentCurrencyWithoutSymbol() {
    let findCurrency = null;
    currencyConfig.list.forEach(item => {
      if (this.currentCurrencyCode() == item.code) {
        findCurrency = item;
      }
    });
    return findCurrency;
  },
  toCurrency(value, config) {
    let getConfig = config;
    if (!config) {
      getConfig = this.selectedCurrency();
    }
    if (getConfig) {
      return currency(parseFloat(value), {
        symbol: getConfig.symbol,
        separator: getConfig.thousandsSeparator,
        decimal: getConfig.fractionSeparator
      }).format().replace(/(\.|,)00$/g, '');
    } else {
      return value;
    }
  },
  toCurrencyByBase(value, isNoSymbol = false) {
    let currency = { ...this.getBaseCurrency() };
    if (isNoSymbol) {
      currency.symbol = "";
    }
    return this.toCurrency(value, currency);
  }
};
