<template>
  <v-form ref="form" lazy-validation @submit.prevent="addEmail">
    <section class="email-wrapper">
      <div class="w-full">
        <v-text-field
        v-model="email"
        :placeholder="$t('invite_your_friends_email_placeholder')"
        hide-details
        dense
        outlined
        @blur="addEmail"
        :rules="email_rules"
      ></v-text-field>
    </div>
    <div v-if="item.index > 0" class="cursor-pointer" @click="removeEmail">
      <img class="menu-icon-image" :src="require('@/assets/img/svg-icons/cancel.svg')" alt="cancel btn">
    </div>
    </section>
  </v-form>
</template>

<script>
import validationRules from '@/mixins/validationRules';
    export default {
      mixins: [validationRules],
        props: {
          item: {
            type: Object,
            default: ()=> ({})
          },
        },
        data() {
          return {
            email: ""
          }
        },
        computed: {
          validatedForm() {
            return this.$refs?.form?.validate() 
          }
        },
        methods: {
          removeEmail() {
            this.$emit("removeEmail", this.item.id)
          },
          addEmail() {
            const obj = {id: this.item.id, email: this.email}
            if (this.validatedForm) {
              this.$emit("addEmail", obj)
            }
          },
        },
    }
</script>

<style scoped>
.align-base {
  align-items: baseline;
}
.cursor-pointer {
  cursor: pointer;
}
.email-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
.w-full {
  width: 100%;
}
</style>