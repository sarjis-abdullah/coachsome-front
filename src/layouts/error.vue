<template>
  <div class="error-layout">
    <v-container>
      <v-card outlined>
        <v-row>
          <v-col class="py-8">
            <div class="d-flex justify-center mb-4">
              <v-icon size="80">mdi-emoticon-sad-outline</v-icon>
            </div>
            <p class="title text-center my-0 py-0 grey--text text--darken-3">
              Oops! Something totally went wrong
            </p>
            <div class="subtitle-1 red--text text-center my-0 py-0">
              <div v-if="error.statusCode === 404">
                {{ pageNotFound }}
              </div>
              <div v-else>
                {{ error.message || otherError }}
              </div>
            </div>
            <div class="d-flex justify-center mt-2">
              <v-btn
                small
                class="text-normal text-decoration-underline"
                to="/"
                depressed
                plain
                color="#1867c0"
              >
                Home
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageNotFound: "404 Not Found",
      otherError: "An error occurred"
    };
  },
  head() {
    let title = "";
    if (this.error.statusCode === 404) {
      title = this.pageNotFound;
    } else {
      title = this.message;
    }
    return {
      title
    };
  }
};
</script>

<style scoped lang="scss">
.error-layout {
  background: $body-bg;
  width:100%;
  height: 100vh;
}
</style>
