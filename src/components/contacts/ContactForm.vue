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
          hide-details
          class="form-input"
          outlined
          dense
          required
        ></v-text-field>
      </div>
      <div>
        <v-btn @click="validate" class="add-form-btn" depressed>
          Add Contact
        </v-btn>
      </div>
    </v-form>
  </section>
</template>
<script>
export default {
  data: () => ({
    valid: true,
    items: ["In-person", "Online", "Hybrid"],
  }),
  computed: {
    formItems() {
      return [
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
      ];
    },
    
  },

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        console.log("object", this.payloadData());
        this.reset()
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    closeForm(){
      this.$emit('close-modal');
      this.reset()
    },
    payloadData() {
      const data = {};
      this.formItems.forEach(({firstName,lastName, model, categoryName, key}) => {
        if (key == "email") {
          data.email = model;
        } else if (key == "firstName") {
          data.firstName = model
        } else if (key == "lastName") {
          data.lastName = model
        } else {
          data.categoryName = model
        }
      });
      return data;
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
