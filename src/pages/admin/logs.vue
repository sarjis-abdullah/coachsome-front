<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="pb-0">
        <div class="page-title">User Log</div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <div class="line"></div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div>
          <v-card>
            <v-card-title>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="search"
                    prepend-inner-icon="search"
                    label="Search"
                    single-line
                    solo
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-title>
            <v-data-table
              :headers="table.headers"
              :items="table.rows"
              :search="search"
            >
              <template v-slot:item.name="{ item }">
                <div class="name-btn">
                  <v-btn text>{{ item.name }}</v-btn>
                </div>
              </template>
              <template v-slot:item.image="{ item }">
                <div class="name-btn">
                  <v-btn icon v-if="!item.image">
                    <v-icon size="50">mdi-account-box</v-icon>
                  </v-btn>
                  <div v-if="item.image">
                    <router-link to="#">
                      <v-img width="35" :src="getImageUrl(item.image)"></v-img>
                    </router-link>
                  </div>
                </div>
              </template>
            </v-data-table>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { adminUserLogApi } from "@/api";
import { imageService } from "@/services";
export default {
  layout:"admin",
  data() {
    return {
      search: "",
      table: {
        headers: [
          {
            text: "Id",
            align: "start",
            filterable: false,
            value: "id"
          },
          { text: "Date", value: "date" },
          { text: "Switch", value: "image" },
          { text: "Name", value: "name" },
          { text: "Phone", value: "phone" },
          { text: "Email", value: "email" },
          { text: "Action", value: "action" },
          { text: "Note", value: "note" }
        ],
        rows: []
      }
    };
  },
  methods: {
    getImageUrl(name) {
      return imageService.getImageByName(name);
    }
  },
  created() {
    adminUserLogApi(this.$axios)
      .getUserLogList()
      .then(({ data }) => {
        if (data.userLogs) {
          let rows = data.userLogs.map(item => {
            let row = {};
            row.id = item.id;
            row.image = item.image;
            row.userId = item.userId;
            row.date = item.date;
            row.phone = item.phoneNumber;
            row.name = item.fullName;
            row.type = item.type;
            row.status = item.status;
            row.email = item.email;
            row.action = item.status;
            row.note = item.activityStatusReason;
            return row;
          });
          this.table.rows = rows;
        }
      })
      .catch(() => {});
  }
};
</script>
<style lang="scss" scoped>
.name-btn {
  .v-btn {
    text-transform: none;
    color: $primary-light-1;
  }
  .v-btn:before {
    display: none;
  }
}
</style>
