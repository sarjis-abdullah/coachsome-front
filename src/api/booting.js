import axios from "axios";

var http = axios.create({
  baseURL: process.env.API_BASE_URL_LIVE,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default {
  init: () => {
    return http.get("booting");
  }
};
