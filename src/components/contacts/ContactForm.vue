<template>
  <section class="form-parent">
    <header @click="$emit('close-modal')" class="cursor-pointer">
      <img
        class="pb-5"
        :src="require('@/assets/img/svg-icons/cancel.svg')"
        alt="Cancel Button"
      />
    </header>

    <v-form ref="form" v-model="valid" lazy-validation>
      <div>
        <div class="form-label">Category <sup class="red--text">*</sup></div>
        <v-select
          v-model="select"
          :items="items"
          :rules="[v => !!v || 'Item is required']"
          placeholder="How do you coach the athlete?"
          hide-details
          class="form-input"
          required
        ></v-select>
      </div>
      <div>
        <v-btn
          @click="validate"
          class="add-form-btn"
          depressed
        >
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
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false
  }),
  computed: {
      formItems() {
          return [
              {
                  type: "select",
                  placeholder: "",
                  rules: [v => !!v || 'Item is required']
              }
          ] 
      }
  },

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
};
</script>
<style scoped>
.form-parent {
  padding: 40px 67px;
}
.add-form-btn {
    background: #15577c !important;
    border-radius: 10px;
    padding: 19px !important;
    text-transform: capitalize;
    color: white;
}
.form-label {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #49556A;
}
.form-input {
    margin-top: 0;
    padding-top: 10px;
    padding-bottom: 16px;
}
</style>
