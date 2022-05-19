export default {
  computed: {
    isAuthCoach() {
      return this.$auth && this.$auth.loggedIn && this.$auth.hasRole("coach");
    },
    isAuthAthlete() {
      return this.$auth && this.$auth.loggedIn && this.$auth.hasRole("athlete");
    }
  }
};
