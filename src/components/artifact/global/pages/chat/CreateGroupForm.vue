<template>
  <div class="create-group-form">
    <v-card flat color="body-bg">
      <FormHeader @close="$emit('close')" :title="$t('chat_create_group_title')" :parentClass="{
        'px-8 pt-8': $vuetify.breakpoint.mdAndUp,
        'px-3': !$vuetify.breakpoint.mdAndUp,
      }"/>
      <v-card-text class="pa-8" :class="!$vuetify.breakpoint.mdAndUp && 'mt-6'">
        <v-form ref="form" v-model="valid" lazy-validation>
          <div class="default--label pb-3">
            {{ $t("chat_create_group_label_group_name") }}
          </div>
          <v-text-field
            v-model="form.name"
            :rules="[v => !!v || 'Name is required']"
            :label="$t('chat_create_group_name_placeholder')"
            dense
            outlined
            class="pb-3"
          ></v-text-field>

          <div class="default--label pb-3">
            {{ $t("chat_create_group_label_descritpion") }}
          </div>
          <v-text-field
            v-model="form.description"
            :rules="[v => !!v || 'Description is required']"
            :label="$t('chat_create_group_description_placeholder')"
            dense
            outlined
            class="pb-3"
          ></v-text-field>

          <div class="default--label pb-3">
            {{ $t("chat_create_group_label_add_people") }}
          </div>
          <v-combobox
            :rules="[v => !!v || 'At least one email is required']"
            item-value="email"
            item-text="profile.profileName"
            v-model="form.emails"
            :search-input.sync="search"
            :items="items"
            :label="$t('chat_create_group_emails_placeholder')"
            multiple
            outlined
            dense
            @keyup.enter="search = ''"
            no-filter
            chips
            class="pb-3"
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

          <div class="default--label pb-3">
            {{ $t("chat_create_group_label_message") }}
          </div>
          <v-textarea
            :rules="[v => !!v || 'Text seome message']"
            v-model="form.message"
            outlined
            name="input-7-1"
            :label="$t('chat_create_group_message_placeholder')"
          ></v-textarea>

          <v-btn
            :loading="loading"
            dark
            color="primary-light-1"
            class="mr-4 mt-4"
            :block="!$vuetify.breakpoint.mdAndUp"
            @click="handleCreateBtnClick"
          >
            {{ $t("chat_create_group_label_create") }}
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { endpoint } from "../../../../../api";
import MobileTopNav from "@/components/layout/global/MobileTopNav";
import FormHeader from "@/components/layout/global/FormHeader";
export default {
  components: {
    MobileTopNav,
    FormHeader
  },
  props: ["open"],
  data() {
    return {
      valid: true,
      validEmail: true,
      items: [],
      loading: false,
      form: {
        name: "",
        description: "",
        emails: null,
        message: ""
      },
      search: "",
      emailRules: [
        v => !!v || this.$i18n.t("valid_required_email"),
        v => /.+@.+/.test(v) || this.$i18n.t("valid_valid_email")
      ]
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
          // console.log(data.data);
          if (data.data) {
            // this.items = data.data.map(item => item.email);
            this.items = data.data;
          }
        });
    },
    'form.emails': {
      immediate: false,
      deep: true,
      handler(newValue, oldValue) {
        this.$emit("catchEmailUserForNotification", this.form.emails)
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
    handleCreateBtnClick() {
      let emailData = [];
      
      this.form?.emails?.length && this.form.emails.map((item) => {
        let data = item.email ? item.email : item;
        if(this.validateEmail(data)){
          emailData.push(data);
        }
      })

      let payload = {
        name: this.form.name,
        description: this.form.description,
        emails: emailData,
        message: this.form.message,
      }
      if (this.$refs.form.validate() && this.validEmail == true) {
        this.loading = true;
        this.$axios
          .post(endpoint.GROUPS_POST, payload)
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
    padding-bottom: 8px;
  }
  &__title {
    font-family: $font-family;
    font-weight: bold;
    font-size: 18px;
    line-height: 25px;
    color: $primary-light-1;
  }
  .mt-6{
    margin-top: 24px;
  }
}
.has-chip-name{
  background: #15577C !important;
  color: white !important;
}
</style>
