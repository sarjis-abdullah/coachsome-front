<template>
  <div class="invite-group-form">
    <v-card color="body-bg">
      <v-card-title class="py-2">
        <div class="create-group-form__title">
          Group invitations
        </div>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon color="primary-light-1" @click="$emit('close')">
            mdi-close
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="pa-5">
        <v-form ref="form" v-model="valid" lazy-validation>
          <div class="field__label">
            Add People
          </div>
          <v-autocomplete
            :rules="[v => !!v || 'At least one email is required']"
            v-model="form.emails"
            :items="items"
            label="Add users by name or email address"
            multiple
            :search-input.sync="search"
            solo
            dense
            no-filter
            chips
          >
            <template v-slot:append>
              <div></div>
            </template>
            <template v-slot:selection="data">
              <v-chip
                small
                :key="JSON.stringify(data.item)"
                v-bind="data.attrs"
                :input-value="data.selected"
                :disabled="data.disabled"
                @click:close="data.parent.selectItem(data.item)"
              >
                {{ data.item }}
              </v-chip>
            </template>
          </v-autocomplete>
          <v-btn
            dark
            color="primary-light-1"
            class="mr-4"
            @click="handleCreateBtnClick"
          >
            Invite
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { endpoint } from "../../../../../api";

export default {
  data() {
    return {
      valid: true,
      search: "",
      items: [],
      form: {
        emails: null
      }
    };
  },
  watch: {
    search(val) {
        console.log(val)
    }
  },
  methods: {
    handleCreateBtnClick() {
      this.$axios
        .post(endpoint.GROUP_INVITATIONS_POST, this.form)
        .then(({ data }) => {
          this.$toast.success("Invitaion is completed successfully");
        })
        .catch(err => {
          if (err.response.data.error) {
            this.$toast.error(err.response.data.error.message);
          }
        });
    }
  }
};
</script>

<style lang="scss">
.invite-group-form {
  background: $body-bg;
  .v-card .v-card__title {
    border-bottom: 1px solid $primary-light-1;
  }
  .field__label {
    font-family: $font-family;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    color: $primary-light-1;
  }
  &__title {
    font-family: $font-family;
    font-weight: bold;
    font-size: 18px;
    line-height: 25px;
    color: $primary-light-1;
  }
}
</style>
