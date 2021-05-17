<template>
  <div>
    <v-row justify="center" align="center" v-if="!hasError">
      <v-col cols="12" md="8">
        <v-card flat>
          <v-card-title class="d-flex justify-center">
            <div>
              {{ $t("pending_booking_request_sucess_confirmation_title") }}
            </div>
          </v-card-title>
          <v-card-text
            v-html="$t('pending_booking_request_sucess_confirmation_body')"
          >
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { clientPendingBookingApi } from "@/api";
export default {
  data: () => ({
    hasError: true
  }),
  mounted() {
    if (this.$route.query.token) {
      let payload = {
        confirmation_token: this.$route.query.token || ""
      };
      clientPendingBookingApi
        .confirm(payload)
        .then(() => {
          this.hasError = false;
        })
        .catch(error => {
          this.$toast.error(error.response.data.message);
          this.hasError = true;
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
