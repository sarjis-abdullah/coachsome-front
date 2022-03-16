<template>
  <div class="attachment-top-box">
    <v-card>
      <v-card-text>
        <div
          class="attachment-box"
        >
          <div class="attachment-box__title py-5">
            Upload Attachment
          </div>
          <div>
            <v-file-input
              color="deep-purple accent-4"
              counter
              label="Upload file.."
              placeholder="Select your files"
              prepend-icon="mdi-paperclip"
              outlined
              :show-size="1000"
              v-model="image"
              @change="onFileChange" 
              :clearable="false"
            >
              <template v-slot:selection="{ index, text }">
                <v-chip
                  v-if="index < 2"
                  color="deep-purple accent-4"
                  dark
                  label
                  small
                  close
                  @click:close="cancelUpload()"
                >
                  {{ text }}
                </v-chip>

                <span
                  v-else-if="index === 2"
                  class="text-overline grey--text text--darken-3 mx-2"
                >
                  +{{ files.length - 2 }} File(s)
                </span>
              </template>
            </v-file-input>
          </div>

          <div v-if="imageUrl!=null">
             <div class="chat-send-container">
              <div class="chat-send-primary">
                <div class="chat-send-attachment">
                  <img :src="imageUrl" alt="" class="chat-send-attachment-img">
                  <div>
                    <p class="chat-send-attachment-file">{{fileName.substring(0,8)+".."}}</p>
                    <v-btn text color="#9b1c13" class="chat-send-attachment-delete px-0" small @click="cancelBtnClickHandle">
                      <i class="material-icons">cancel</i> 
                      <span>Cancel</span>
                    </v-btn>
                  </div>
                </div>

                <v-btn
                  class="chat-message-action"
                  fab
                  color="success"
                  large
                  :style="{ fontWeight: 'bold' }"
                  @click="uploadAttachment"
                  :loading="loadingData"
                >
                  <i class="material-icons text-white">send</i>
                </v-btn>
              </div>
            </div>
          </div>

        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
   props:['loadingData','image','imageUrl'],
  data: () => ({
    fileName: "",
  }),
  mounted(){
    this.reset();
  },
  // computed:{
  //   imageName(){
  //     return document.querySelector('.v-chip__content').textContent;
  //   }
  // },
  methods: {
  createImage(file) {
      const reader = new FileReader();
      reader.onload = e => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);

    },
    onFileChange(file) {
      if (!file) {
        return '';
      }
      this.image = file;
      this.fileName = file.name;
      console.log(file);
      this.createImage(file);
    },
    cancelUpload() {
      this.reset();
    },

    reset() {
      this.image = null;
      this.imageUrl = null;
    },

    uploadAttachment() {
      this.loadingData = true;
      this.$emit('loadingStart', this.loadingData);
      this.$emit('sendAttachment', this.image);
    },

    cancelBtnClickHandle() {
      this.reset();
      this.$emit("cancel");
    },

  }
};
</script>

<style lang="scss">
.chat-send-container {
  background-color: #f7f7f7;
  box-shadow: 0 0 12px rgba(0,0,0,0.2);
  position: relative;
  z-index: 1;
}
.chat-send-primary, .chat-send-secondary {
  display: flex;
  justify-content: space-between;
}
.chat-send-primary {
  padding: 0.8em 1.2em;
}
.chat-message-input {
  width: 100%;
  margin-right:0.6rem;
  position: relative;
}
.chat-message-input textarea {
  width: 100%;
  border: 1px solid #593ecc;
  border-radius: 4px;
  font-size: 1.3em;
  line-height: 1.5;
  padding: 0.5em 2.4em 0.5em 0.5em;
  vertical-align: top;
  outline: 0;
}
.chat-attach-input {
  position: absolute;
  right: 1px;
  bottom: 1px;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
}
.chat-attach-input input {
  opacity:0;
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: block;
  z-index:2;
  top: 0;
  left:0;
}
.chat-attach-input .material-icons {
  color:#007BFF;
  background-color: #fff;
  font-size: 2.4em;
  display: block;
  padding: 0.2em;
}
.chat-send-secondary {
  padding: 0 1.2em;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
}
.chat-send-secondary p {
  margin: 0;
  color: #666;
  font-weight: 600;
}
.chat-send-secondary button {
  border:0;
  background-color: #f7f7f7;
  color: #666;
  cursor: pointer;
  padding: 0.6em;
  margin-right: -0.6em;
}
.chat-send-secondary button .material-icons {
  font-size: 1.8em;
}
.chat-message-action {
  border: 0;
  background-color: #593ecc;
  color: #fff;
  text-transform: uppercase;
  border-radius: 4px;
}
.chat-send-attachment {
  display: flex;
  align-items: flex-start;
  padding-right: 1.2em;
}
.chat-send-attachment-img {
  height: 100%;
  max-height: 60px;
  width: auto;
  border: 2px solid #e0e0e0;
  margin:0 1em 0 0;
}
.chat-send-attachment-file {
  font-size: 1em;
  margin: 0;
  color: #666;
  font-weight: 600;
 }
.chat-send-attachment-delete {
  border: 0;
  background-color: transparent;
  font-size: 1em;
  color: #0277bd;
  text-transform: uppercase;
  display: flex;
  align-tems: center;
  font-weight: 600;
  width: 100%;
  padding: 0.7em 0em;
  line-height: 1.5;
}
.chat-send-attachment-delete .material-icons {
  font-size:1.5em;
  margin-right: 0.2rem;
  font-weight: 600;
}
.attachment-top-box {
  .attachment-box {
    &__title {
      display: flex;
      justify-content: center;
      font-family: Roboto;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 21px;
      display: flex;
      align-items: center;
      text-align: center;
      text-transform: uppercase;
      color: #15577c;
    }
    &__sub-title {
      display: flex;
      justify-content: center;
      font-family: Roboto;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      display: flex;
      align-items: center;
      text-align: center;
      color: #2c3749;
    }
  }
  .info-table {
    tbody {
      tr {
        td {
          padding: 10px;
          border: 5px solid red;
        }
      }
    }
  }
}
</style>
