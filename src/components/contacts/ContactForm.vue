<template>
  <section class="contact-form-parent">
    <header @click="closeForm" class="cursor-pointer">
      <img
        class="pb-5"
        :src="require('@/assets/img/svg-icons/cancel.svg')"
        alt="Cancel Button"
      />
    </header>

    <v-form ref="form" v-model="valid" lazy-validation>
      <div v-for="(item, i) in formItems" :key="i">
        <div class="form-label">
          {{ item.label }} <sup class="red--text">*</sup>
        </div>
        <v-select
          v-if="item.type == 'select'"
          v-model="item.model"
          :items="items"
          :rules="item.rules"
          :placeholder="item.placeholder"
          hide-details
          class="form-input"
          outlined
          dense
          required
        ></v-select>
        <v-text-field
          v-else
          v-model="item.model"
          :rules="item.rules"
          :placeholder="item.placeholder"
          class="form-input"
          outlined
          :hide-details="item.error && item.error != '' ? false : true"
          dense
          required
          :error-messages="item.error"
        ></v-text-field>
      </div>
      <div>
        <v-btn :loading="loading" @click="submitForm" class="add-form-btn" depressed>
          Add Contact
        </v-btn>
      </div>
    </v-form>
  </section>
</template>
<script>
import item from "../darkbox/mixins/item";
export default {
  data: () => ({
    valid: true,
    items: ["In-person", "Online", "Hybrid"],
    loading: false,
    formItems: [
      {
        type: "select",
        placeholder: "How do you coach the athlete?",
        label: "Category",
        key: "categoryName",
        rules: [v => !!v || "Category is required"],
        model: null
      },
      {
        label: "First Name",
        key: "firstName",
        placeholder: "Enter First name",
        rules: [v => !!v || "First Name is required"],
        model: null
      },
      {
        label: "Last Name",
        key: "lastName",
        placeholder: "Enter Last Name",
        rules: [v => !!v || "Last Name is required"],
        model: null
      },
      {
        label: "Email Address",
        key: "email",
        placeholder: "Enter Email Address",
        rules: [
          v => !!v || "E-mail is required",
          v => /.+@.+\..+/.test(v) || "E-mail must be valid"
        ],
        model: null
      }
    ]
  }),
  computed: {},

  methods: {
    async submitForm() {
      if (this.$refs.form.validate()) {
        this.loading = true
        const data = this.payloadData();
        try {
          await this.$axios.post("coach/contact-user", data);
          this.$emit("reloadAllData")
          console.log(4567);
          this.closeForm()
        } catch (error) {
          if (error?.response?.data?.errors) {
            this.handleServerErrorMessage(error.response.data.errors);
          }else{
            this.closeForm()
          }
        }finally {
          this.loading = false
        }
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    closeForm() {
      this.$emit("close-modal");
      this.formItems = this.formItems.map(item => {
        delete item.error
        return item
      })
      this.reset();
    },
    payloadData() {
      const data = {
        contactByUserId: this.$auth.user.id
      };
      this.formItems.forEach(({ model, key }) => {
        if (key == "email") {
          data.email = model;
        } else if (key == "firstName") {
          data.firstName = model;
        } else if (key == "lastName") {
          data.lastName = model;
        } else {
          data.categoryName = model;
        }
      });
      return data;
    },
    handleServerErrorMessage(errors) {
      for (const field in errors) {
        this.formItems = this.formItems.map(item => {
          if (item.key == field) {
            item.error = errors[field]
            return {...item}
          }
          return item
        });
      }
    }
  }
};
</script>
<style>
.contact-form-parent {
  padding: 40px 67px;
}
.contact-form-parent .add-form-btn {
  background: #15577c !important;
  border-radius: 10px;
  padding: 19px !important;
  text-transform: capitalize;
  color: white;
}
.contact-form-parent .form-label {
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #49556a;
}
.contact-form-parent .form-input {
  margin-top: 0;
  padding-top: 10px;
  padding-bottom: 16px;
}
.contact-form-parent .v-input__slot {
  border-radius: 8px !important;
}
</style>
