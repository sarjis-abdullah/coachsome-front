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
          <v-combobox
            :rules="[v => !!v || 'At least one email is required']"
            item-value="email"
            item-text="profile.profileName"
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
                class="my-1"
                :class="{'has-chip-name' : data.item.profile}"
              >
                 {{ data.item.profile ? data.item.profile.profileName : data.item }}
              </v-chip>
            </template>
          </v-combobox>
          <v-btn
            dark
            :loading="loading"
            color="primary-light-1"
            class="mr-4"
            @click="handleInviteBtnClick"
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
  props: ["open"],
  data() {
    return {
      valid: true,
      validEmail: true,
      search: "",
      items: [],
      loading: false,
      form: {
        emails: null
      },
      emailRules: [
        v => !!v || this.$i18n.t("valid_required_email"),
        v => /.+@.+/.test(v) || this.$i18n.t("valid_valid_email")
      ]
    };
  },
  watch: {
    open(val) {
      this.items = [];
      this.form.emails = "";
      this.$refs.form.resetValidation();
    },
    search(val) {
      const selectedContact = this.$store.getters["chat/selectedContact"];
      if (selectedContact) {
        const params = {
          search: val,
          groupId: selectedContact.groupId
        };
        this.$axios
          .get(endpoint.GROUP_INVITATIONS_PRIVATE_USERS_GET, { params })
          .then(({ data }) => {
            if (data.data) {
              this.items = data.data;
              // this.items = data.data.map(item => item.email);
            }
          });
      }
    }
  },
  methods: {
    validateEmail(email) {
      this.validEmail = false;
      let validation = String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      if(validation){
        this.validEmail = true;
      }else{
        this.validEmail = false;
        this.$toast.error(data + " is invalid email address.")
      }
      return validation;
    },
    handleInviteBtnClick() {
      let emailData = [];
      
      this.form.emails.map((item) => {
        let data = item.email ? item.email : item;
        if(this.validateEmail(data)){
          emailData.push(data);
        }
      })

      let payload = {
        emails: emailData
      }
      const selectedContact = this.$store.getters["chat/selectedContact"];
      if (this.$refs.form.validate() && selectedContact && this.validEmail == true) {
        const { groupId } = selectedContact;
        this.loading = true;
        this.$axios
          .post(endpoint.GROUP_INVITATIONS_GROUP_ID_POST(groupId), payload)
          .then(({ data }) => {
            this.$toast.success("Successfully invited");
            this.$emit("invited");
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
.has-chip-name{
  background: #15577C !important;
  color: white !important;
}
</style>
