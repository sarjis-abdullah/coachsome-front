<template>
  <div>
    <v-form ref="titleForm" v-model="titleForm.valid" lazy-validation>
      <v-card>
        <v-card-title
          >Meta Title
          <v-spacer></v-spacer>
          <v-btn
            :loading="titleForm.isLoading"
            dark
            text
            depressed
            color="primary-light-1"
            @click="handleTitleFormSaveBtnClick"
            >Save</v-btn
          >
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12" md="4">
              <div class="subtitle-2">English</div>
              <div class="textarea-autocomplete">
                <TributeTextarea
                  :value.sync="titleForm.formData.enValue"
                  :options="{
                    trigger: '{',
                    values: [
                      { key: 'First name', value: 'firstname}' },
                      { key: 'Last name', value: 'lastname}' },
                      { key: 'Sport', value: 'sport}' }
                    ]
                  }"
                />
              </div>
            </v-col>
            <v-col cols="12" md="4">
              <div class="subtitle-2">Danish</div>
              <div class="textarea-autocomplete">
                <TributeTextarea
                  :value.sync="titleForm.formData.dnValue"
                  :options="{
                    trigger: '{',
                    values: [
                      { key: 'First name', value: 'firstname}' },
                      { key: 'Last name', value: 'lastname}' },
                      { key: 'Sport', value: 'sport}' }
                    ]
                  }"
                />
              </div>
            </v-col>
            <v-col cols="12" md="4">
              <div class="subtitle-2">Swedish</div>
              <div class="textarea-autocomplete">
                <TributeTextarea
                  :value.sync="titleForm.formData.svValue"
                  :options="{
                    trigger: '{',
                    values: [
                      { key: 'First name', value: 'firstname}' },
                      { key: 'Last name', value: 'lastname}' },
                      { key: 'Sport', value: 'sport}' }
                    ]
                  }"
                />
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-form>

    <!-- <v-form
      ref="descriptionForm"
      v-model="descriptionForm.valid"
      lazy-validation
      class="mt-5"
    >
      <v-card>
        <v-card-title
          >Meta Description
          <v-spacer></v-spacer>
          <v-btn
            :loading="descriptionForm.isLoading"
            dark
            text
            depressed
            color="primary-light-1"
            @click="handleDescriptionFormSaveBtnClick"
            >Save</v-btn
          >
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12" md="4">
              <div class="subtitle-2">English</div>
              <TributeTextarea
                :value.sync="descriptionForm.formData.enValue"
                :options="{
                  trigger: '{',
                  values: [
                    { key: 'First name', value: 'firstname}' },
                    { key: 'Last name', value: 'lastname}' },
                    { key: 'Sport', value: 'sport}' }
                  ]
                }"
              />
            </v-col>
            <v-col cols="12" md="4">
              <div class="subtitle-2">Danish</div>
              <TributeTextarea
                :value.sync="descriptionForm.formData.dnValue"
                :options="{
                  trigger: '{',
                  values: [
                    { key: 'First name', value: 'firstname}' },
                    { key: 'Last name', value: 'lastname}' },
                    { key: 'Sport', value: 'sport}' }
                  ]
                }"
              />
            </v-col>
            <v-col cols="12" md="4">
              <div class="subtitle-2">Swedish</div>
              <TributeTextarea
                :value.sync="descriptionForm.formData.svValue"
                :options="{
                  trigger: '{',
                  values: [
                    { key: 'First name', value: 'firstname}' },
                    { key: 'Last name', value: 'lastname}' },
                    { key: 'Sport', value: 'sport}' }
                  ]
                }"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-form> -->
  </div>
</template>

<script>
import { adminSeoTranslationApi } from "@/api";
import TributeTextarea from "@/components/autocomplete/TributeTextarea";

export default {
  components: {
    TributeTextarea
  },
  data() {
    return {
      titleForm: {
        valid: true,
        isLoading: false,
        formData: {
          page: "profile",
          field: "meta_title",
          enValue: "",
          dnValue: "",
          svValue: ""
        }
      },
      descriptionForm: {
        valid: true,
        isLoading: false,
        formData: {
          page: "profile",
          field: "meta_description",
          enValue: "",
          dnValue: "",
          svValue: ""
        }
      }
    };
  },
  created() {
    adminSeoTranslationApi(this.$axios)
      .get()
      .then(({ data }) => {
        this.titleForm.formData.enValue =
          data.data.profilePage.metaTitle.enValue;
        this.titleForm.formData.dnValue =
          data.data.profilePage.metaTitle.dnValue;
        this.titleForm.formData.svValue =
          data.data.profilePage.metaTitle.svValue;
        this.descriptionForm.formData.enValue =
          data.data.profilePage.metaDescription.enValue;
        this.descriptionForm.formData.dnValue =
          data.data.profilePage.metaDescription.dnValue;
        this.descriptionForm.formData.svValue =
          data.data.profilePage.metaDescription.svValue;
      });
  },
  methods: {
    handleDescriptionFormSaveBtnClick() {
      this.descriptionForm.isLoading = true;
      adminSeoTranslationApi(this.$axios)
        .save({ ...this.descriptionForm.formData })
        .then(() => {
          this.$toast.success("Successfully saved");
        })
        .finally(() => {
          this.descriptionForm.isLoading = false;
        });
    },
    handleTitleFormSaveBtnClick() {
      this.titleForm.isLoading = true;
      adminSeoTranslationApi(this.$axios)
        .save({ ...this.titleForm.formData })
        .then(() => {
          this.$toast.success("Successfully saved");
        })
        .finally(() => {
          this.titleForm.isLoading = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
