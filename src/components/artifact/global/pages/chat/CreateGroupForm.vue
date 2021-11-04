<template>
  <div class="create-group-form">
    <v-card color="body-bg">
      <v-card-title class="py-2">
        <div class="create-group-form__title">
          Create a New Group
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
            Group Name
          </div>
          <v-text-field
            v-model="form.name"
            :rules="[v => !!v || 'Name is required']"
            label="What do you want to call this group?"
            dense
            solo
          ></v-text-field>

          <div class="field__label">
            Description
          </div>
          <v-text-field
            v-model="form.description"
            :rules="[v => !!v || 'Description is required']"
            label="What is the purpose of this group?"
            dense
            solo
          ></v-text-field>

          <div class="field__label">
            Add People
          </div>
          <v-combobox
            :rules="[v => !!v || 'At least one email is required']"
            v-model="form.emails"
            :search-input.sync="search"
            :items="items"
            label="Add users by name or email address"
            multiple
            solo
            dense
            @keyup.enter="search = ''"
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
          </v-combobox>

          <div class="field__label">
            Message
          </div>
          <v-textarea
            :rules="[v => !!v || 'Text seome message']"
            v-model="form.message"
            solo
            name="input-7-1"
            label="Type your message..."
          ></v-textarea>

          <v-btn
            :loading="loading"
            dark
            color="primary-light-1"
            class="mr-4"
            @click="handleCreateBtnClick"
          >
            Create
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { endpoint } from "../../../../../api";

export default {
  props: ["open"],
  data() {
    return {
      valid: true,
      items: [],
      loading: false,
      form: {
        name: "",
        description: "",
        emails: null,
        message: ""
      },
      search: ""
    };
  },
  watch: {
    open(val) {
      this.items = [];
      this.form.name = "";
      this.form.description = "";
      this.form.emails = "";
      this.form.message = "";
      this.$refs.form.resetValidation();
    },
    search(val) {
      const params = {
        search: val
      };
      this.$axios
        .get(endpoint.CONTACTS_PRIVATE_USERS_GET, { params })
        .then(({ data }) => {
          console.log(data.data);
          if (data.data) {
            this.items = data.data.map(item => item.email);
          }
        });
    }
  },
  methods: {
    handleCreateBtnClick() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.$axios
          .post(endpoint.GROUPS_POST, this.form)
          .then(({ data }) => {
            this.$toast.success("Successfully created");
            this.$emit("created");
          })
          .catch(err => {
            if (err.response.data.error) {
              this.$toast.error(err.response.data.error.message);
            }
          })
          .finally(() => {
            this.loading = false;
          });
      }
    }
  }
};
</script>

<style lang="scss">
.create-group-form {
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
