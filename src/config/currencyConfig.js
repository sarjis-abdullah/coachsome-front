import { currencyData } from "@/data"

const dkk = {
  displayName: currencyData.CURRENCY_DKK_SYMBOL_NATIVE + currencyData.CURRENCY_DKK_CODE,
  symbol: currencyData.CURRENCY_DKK_SYMBOL_NATIVE,
  code: currencyData.CURRENCY_DKK_CODE,
  locale: currencyData.CURRENCY_DKK_LOCALE,
  thousandsSeparator: currencyData.CURRENCY_DKK_THOUSAND_SEPARATOR,
  fractionCount: currencyData.CURRENCY_DKK_DECIMAL_DIGITS,
  fractionSeparator: currencyData.CURRENCY_DKK_FRACTION_SEPARATOR,
  symbolPosition: 'front',
  symbolSpacing: true
};

const sek = {
  displayName: currencyData.CURRENCY_SEK_SYMBOL_NATIVE + currencyData.CURRENCY_SEK_CODE,
  symbol: currencyData.CURRENCY_SEK_SYMBOL_NATIVE,
  code: currencyData.CURRENCY_SEK_CODE,
  locale: currencyData.CURRENCY_SEK_LOCALE,
  thousandsSeparator: currencyData.CURRENCY_SEK_THOUSAND_SEPARATOR,
  fractionCount: currencyData.CURRENCY_SEK_DECIMAL_DIGITS,
  fractionSeparator: currencyData.CURRENCY_SEK_FRACTION_SEPARATOR,
  symbolPosition: 'front',
  symbolSpacing: true
};

const eur = {
  displayName: currencyData.CURRENCY_EUR_SYMBOL + currencyData.CURRENCY_EUR_CODE,
  symbol: currencyData.CURRENCY_EUR_SYMBOL,
  code: currencyData.CURRENCY_EUR_CODE,
  locale: currencyData.CURRENCY_EUR_LOCALE,
  thousandsSeparator: currencyData.CURRENCY_EUR_THOUSAND_SEPARATOR,
  fractionCount: currencyData.CURRENCY_EUR_DECIMAL_DIGITS,
  fractionSeparator: currencyData.CURRENCY_EUR_FRACTION_SEPARATOR,
  symbolPosition: 'front',
  symbolSpacing: false
};

const usd = {
  displayName: currencyData.CURRENCY_USD_SYMBOL + currencyData.CURRENCY_USD_CODE,
  symbol: currencyData.CURRENCY_USD_SYMBOL,
  code: currencyData.CURRENCY_USD_CODE,
  locale: currencyData.CURRENCY_USD_LOCALE,
  thousandsSeparator: currencyData.CURRENCY_USD_THOUSAND_SEPARATOR,
  fractionCount: currencyData.CURRENCY_USD_DECIMAL_DIGITS,
  fractionSeparator: currencyData.CURRENCY_USD_FRACTION_SEPARATOR,
  symbolPosition: 'front',
  symbolSpacing: false
};

export default {
  key: currencyData.CURRENCY_KEY,
  list: [dkk, eur,sek],
  default: dkk,
  base: dkk,
  dkk,
  eur,
  usd
}