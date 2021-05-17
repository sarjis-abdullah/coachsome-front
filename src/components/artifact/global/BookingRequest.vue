<template>
  <div>
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-btn color="primary-light-1" icon @click.stop="handleCancel">
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="5">
            <div class="profile-card">
              <profile-card v-bind="coachInfo"></profile-card>
            </div>
          </v-col>
          <v-col cols="12" md="2" class="d-flex justify-center align-center">
            <div class="line--vertical text-center"></div>
          </v-col>
          <v-col cols="12" md="5">
            <div class="form">
              <div class="form__title">
                {{ $t("pending_booking_title") }}
              </div>
              <div class="form__description">
                {{ $t("pending_booking_description") }}
              </div>
              <div class="form__fields">
                <v-form ref="form">
                  <!-- Name -->
                  <div class="field">
                    <div class="field__label">
                      {{ $t("pending_booking_label_your_name") }}
                    </div>
                    <div class="field__element">
                      <v-text-field
                        solo
                        dense
                        v-model="form.name"
                        :rules="[(v) => !!v || 'Name is required']"
                      ></v-text-field>
                    </div>
                  </div>

                  <!-- Email -->
                  <div class="field">
                    <div class="field__label">
                      {{ $t("pending_booking_label_your_email") }}
                    </div>
                    <div class="field__element">
                      <v-text-field
                        dense
                        v-model="form.email"
                        :rules="[
                          (v) => !!v || 'E-mail is required',
                          (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                        ]"
                        solo
                      ></v-text-field>
                    </div>
                  </div>

                  <!-- Mobile -->
                  <div class="field">
                    <div class="field__label">
                      {{ $t("pending_booking_label_mobile_number") }}
                    </div>
                    <div class="field__element">
                      <v-text-field
                        dense
                        v-model="form.mobileNumber"
                        :rules="[(v) => !!v || 'Mobile number is required']"
                        solo
                      ></v-text-field>
                    </div>
                  </div>

                  <!-- Special text -->
                  <div class="field">
                    <div class="field__label">
                      {{ $t("pending_booking_label_special_text") }}
                    </div>
                    <div class="field__element">
                      <v-textarea
                        solo
                        dense
                        v-model="form.coachDescription"
                      ></v-textarea>
                    </div>
                  </div>

                  <v-btn color="primary-light-1" @click="handleSendBtn">
                    {{ $t("pending_booking_button_text_send") }}
                  </v-btn>
                </v-form>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import ProfileCard from "@/components/card/ProfileCard";

export default {
  components: {
    ProfileCard,
  },
  props: {
    coachInfo: Object,
    coachUserName: String,
    bookingPackage: Object,
  },
  data: () => ({
    form: {
      name: "",
      email: "",
      mobileNumber: "",
      coachDescription: "",
    },
  }),
  watch: {
    value: function(val) {
      this.dialog = val;
    },
  },
  methods: {
    handleSendBtn() {
      if (this.$refs.form.validate()) {
        let payload = {
          ...this.form,
          packageId: this.bookingPackage && this.bookingPackage.id,
          userName: this.coachUserName,
        };
        this.$axios.post("/pendingBookings/confirm",payload)
          .then(() => {
            this.$emit('success')
          })
          .catch((error) => {
            this.$toast.error(error.response.data.message);
          });
      }
    },
    handleCancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style lang="scss" scoped>
.profile-card {
  margin-top: 100px;
}
.line--vertical {
  border: 1px solid #15577c;
  width: 1px;
  height: 80%;
}
.form {
  &__title {
    font-family: $font-family;
    font-size: 18px;
    line-height: 25px;
    text-transform: uppercase;
    color: $primary-light-1;
  }
  &__description {
    margin-top: 50px;
    margin-bottom: 50px;
    font-family: $font-family;
    font-size: 14px;
    line-height: 19px;
    color: $primary-light-1;
  }
  .field {
    &__label {
      font-family: $font-family;
      font-size: 14px;
      line-height: 19px;
      color: $primary-light-1;
    }
    &__element {
    }
  }
}
</style>
