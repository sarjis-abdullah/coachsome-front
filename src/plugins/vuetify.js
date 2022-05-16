import MyGoogleIcon from "@/components/icons/GoogleIcon.vue";
import MyFacebookIcon from "@/components/icons/FacebookIcon.vue";

export default {
  defaultAssets: false,
  icons: {
    iconfont: "md",
    values: {
      myGoogleIcon: {
        component: MyGoogleIcon
      },
      myFacebookIcon: {
        component: MyFacebookIcon
      }
    }
  },
  theme: {
    dark: false,
    themes: {
      light: {
        primary: "#2C3749",
        secondary: "#4caf50",
        tertiary: "#495057",
        accent: "#edb041",
        error: "#f55a4e",
        info: "#00d3ee",
        success: "#5cb860",
        warning: "#ffa21a",
        "primary-light-1": "#15577C",
        "body-bg": "#F7FAFC",
        rating: "#edb041"
      }
    }
  }
};
