import { currencyService } from "@/services";
export default function({ $axios, app, $auth }) {
  $axios.setHeader("Accept", "application/json");
  $axios.setHeader("Content-Type", "application/json");
  $axios.setHeader("Currency-Code", currencyService.currentCurrencyCode());
  $axios.setHeader("Language-Code", app.i18n.locale);
}
