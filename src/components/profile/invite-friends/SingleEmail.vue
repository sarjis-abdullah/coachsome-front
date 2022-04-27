<template>
<v-form ref="form" lazy-validation @submit.prevent="addEmail"> 
    <v-row class="align-base">
      <v-col
            cols="12"
          >
            <section class="email-wrapper">
              <div class="w-full">
                <v-text-field
                v-model="email"
                placeholder="Enter Email-Address"
                hide-details
                dense
                outlined
                @blur="addEmail"
                :rules="email_rules"
              ></v-text-field>
            </div>
            <div v-if="item.index > 0" class="cursor-pointer" @click="removeEmail">
              <img class="menu-icon-image" :src="require('@/assets/img/svg-icons/cancel.svg')" alt="">
            </div>
            </section>
          </v-col>
          <!-- <v-col
          v-show="item.index > 0"
            cols="1"
          >
            <div class="cursor-pointer" @click="removeEmail">
              <img class="menu-icon-image" :src="require('@/assets/img/svg-icons/cancel.svg')" alt="">
            </div>
          </v-col> -->
    </v-row>
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