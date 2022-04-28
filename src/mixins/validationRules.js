export default {
  data() {
      return {
        email_rules: [
            (v) => !!v || this.$i18n.t("valid_required_email"),
            (v) => /.+@.+\..+/.test(v) || this.$i18n.t("valid_valid_email"),
        ],
      }
  },
};
