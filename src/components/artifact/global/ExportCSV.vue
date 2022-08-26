<template>
  <v-btn @click="csvExport" :block="$vuetify.breakpoint.smAndDown" class="white--text mr-4" depressed color="#9FAEC2">
    {{$t("export_to_excel_or_csv")}}
  </v-btn>
</template>

<script>
  export default {
    props: {
      rows: {
        type: Array,
        default: ()=> ([]),
        required: true
      },
      headers: {
        type: Array,
        default: ()=> ([]),
        required: true
      },
      fileName: {
        type: String,
        required: true,
        default: "csv-data"
      }
    },
    methods: {
      csvExport() {
        const mapData = this.rows;

        const headers = this.headers.filter(item=> item.value !== 'image' &&  item.value !== 'actions')
        const fields = [
          ...headers.map((el) => {
            return el.value
          }),
        ];

        const csvContent = "data:text/csv;charset=utf-8," + [
          fields,
          ...mapData.map((item) => [
            ...fields.map(
              (el) => {
                return item[el]
              }
            ),
          ]),
        ]
          .map((e) => {
            return '"' + e.join('","') + '"';
          })
          .join("\n");
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", this.fileName + ".csv");
        document.body.appendChild(link); // Required for FF

        link.click(); // This will download the data file named "my_data.csv".
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>