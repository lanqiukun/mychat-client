<template>
  <div id="message" :class="{selfsend: payload.selfsend}">
    <div class="avatar">
      <img v-if="payload.selfsend" :src="selfAvatar" alt />
      <img v-else :src="targetAvatarUrl" alt />
    </div>

    <div v-if="payload.type == 0" class="text">
      <p v-html="payload.body">{{payload.body}}</p>
    </div>

    <div v-if="payload.type == 1" class="file">
      <div :src="fileUrl">
        <div class="icon">
          <img width="auto" height="100%" src="../../assets/img/mydialog/fileicon.png" alt />
        </div>

        <div class="info">
          <div class="fileName">{{ fileName }}</div>
        </div>

        <div class="download">
          <div class="fileSize">{{ fileSize }}</div>

          <img @click="downloadFile" width="40px" src="../../assets/img/mydialog/download.png" alt />
        </div>
      </div>
    </div>

    <div
      v-if="payload.type == 2"
      class="image"
      :class="{imageContainerfullscreen}"
      @click="imageContainerClicked"
    >
      <div>
        <img :style="{opacity: imgOpacity}" :src="fileUrl" alt />
        <div class="progressBar" :style="{width: progressBarWidth}" v-show="!finished"></div>
      </div>
    </div>

    <div v-if="payload.type == 3" class="video">
      <video controls :src="fileUrl" alt />
      <div class="progressBar" :style="{width: progressBarWidth}" v-show="!finished"></div>
    </div>

    <div v-if="payload.type == 4" class="audio">
      <audio controls :src="fileUrl" alt />
      <div class="progressBar" :style="{width: progressBarWidth}" v-show="!finished"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    payload: Object,
    targetAvatarUrl: String
  },
  data() {
    return {
      selfAvatar: this.current_user.avatar,
      imageContainerfullscreen: false,
      uploaded: false,
      uploadedPercent: 0,
      finished: false
    };
  },
  computed: {
    fileUrl() {
      if (this.payload.selfsend)
        return this.createObjectURL(this.payload.body);
      else
        return this.server + "/" + this.payload.body
    },
    progressBarWidth() {
      return String(this.uploadedPercent * 100) + "%";
    },
    fileName() {
      return this.payload.body.name;
    },
    fileSize() {
      let sizeInByte = this.payload.body.size;

      if (sizeInByte > 1024 * 1024 * 1024)
        return String(Math.ceil(sizeInByte / (1024 * 1024 * 1024))) + " GB";
      else if (sizeInByte > 1024 * 1024)
        return String(Math.ceil(sizeInByte / (1024 * 1024))) + " MB";
      else if (sizeInByte > 1024)
        return String(Math.ceil(sizeInByte / 1024)) + " KB";
      else return String(Math.ceil(sizeInByte)) + " B";
    },
    imgOpacity() {
      if (!this.payload.selfsend)
        return 1
      else 
        return this.uploadedPercent
    },
  },
  methods: {
    downloadFile() {
      console.log("download file");
    },
    imageContainerClicked() {
      this.imageContainerfullscreen = !this.imageContainerfullscreen;
    }
  },
  mounted() {
    if (!this.payload.selfsend) {
      this.imgOpacity = 1
      return
    }
    if (this.payload.type == 0 || this.uploaded) return;
    

    console.log("开始上传：", this.payload.body.name);

    let param = new FormData();

    param.append("multiplefiles", this.payload.body);
    param.append("strid", this.current_user.strid);
    param.append("token", this.current_user.token);

    param.append("receiver_str_id", this.payload.receiver_str_id);

    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: myProgressEvent => {
        if (myProgressEvent.lengthComputable)
          this.uploadedPercent = myProgressEvent.loaded / myProgressEvent.total;
      }
    };

    let uploadUrl = this.server + "/upload";

    axios
      .post(uploadUrl, param, config)
      .then(res => {
        if (res.data.status == 0) {
          this.finished = true;
        } else {
          alert(res.data.reason);
        }
      })
      .catch(err => {
        alert(err);
      });

    this.uploaded = true;
  }
};
</script>

<style lang="scss" scoped>
$avatar_size: 40px;
$bubble_color: #ffc78e;
$bubble_selfsend_color: rgba(100, 124, 237, 0.5);

.progressBar {
  width: 100%;
  height: 2px;
  background-color: coral;
  border-radius: 1px;
}

#message {
  padding-top: 5px;
  display: flex;
  width: 100%;

  > .file {
    width: 55%;
    min-width: 200px;
    height: 80px;
    margin: 0 10px;
    border-radius: 5px;
    background-color: cornflowerblue;
    > div {
      width: 100%;
      height: 100%;
      padding: 0;
      margin: 0;
      border-radius: 5px;
      justify-content: space-around;
      display: flex;
      flex-wrap: nowrap;
      > .icon {
        height: 100%;
      }
      > .info {
        width: 80px;

        font-weight: 400;
        font-size: 1em;
        line-height: 20px;
        color: snow;
      }
      > .download {
        width: 40px;
        height: 100%;
        position: relative;
        > .fileSize {
          color: snow;
          font-size: 12px;
        }
        > img {
          position: absolute;
          bottom: 0;
        }
      }
    }
  }
  > .image {
    width: 45%;
    margin: 0 10px;
    img {
      width: 100%;
      padding: 0;
      margin: 0;
      border-radius: 5px;
    }
  }
  > .image.imageContainerfullscreen {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;

    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
    z-index: 1000;
    img {
      display: block;
      width: 100%;
      position: relative;
      right: 0;
      padding: 0;
      border-radius: 0;
      margin: 0;
    }
  }
  > .video {
    width: 60%;
    margin: 0 10px;
    video {
      width: 100%;
      padding: 0;
      margin: 0;
      border-radius: 5px;
    }
  }

  > .audio {
    width: 80%;
    margin: 0 10px;
    audio {
      width: 100%;
      padding: 0;
      margin: 0;
      border-radius: 5px;
    }
  }

  flex-wrap: nowrap;
  > .avatar > img {
    display: block;
    width: $avatar_size;
    height: $avatar_size;
  }
  > .text {
    max-width: calc(100% - 70px);
  }
  > .text > p {
    background-color: $bubble_color;
    padding: 5px 8px;
    display: inline-block;
    border-radius: 4px;
    margin: 10px 0 5px 7px;
    position: relative;
    word-break: break-all;
    text-align: left;
  }
}
#message.selfsend {
  flex-direction: row-reverse;
  > .text > p {
    background-color: $bubble_selfsend_color;
    margin: 10px 7px 5px 0px;
    // white-space: pre;
  }
}
</style>