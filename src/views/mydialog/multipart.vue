<template>
  <div id="multipart">
    <div @click="selectFile">
      <img src="../../assets/img/mydialog/file.png" alt />
      <input id="files" type="file" name="files" @change="fileChange(1, $event)" multiple />
    </div>
    <div @click="selectImageFile">
      <img src="../../assets/img/mydialog/picture.png" alt />
      <input
        id="imagefiles"
        type="file"
        name="imagefiles"
        @change="fileChange(2, $event)"
        accept="image/*"
        multiple
      />
    </div>
    <div @click="selectVideoFile">
      <img src="../../assets/img/mydialog/video.png" alt />
      <input
        id="videofiles"
        type="file"
        name="videofiles"
        @change="fileChange(3, $event)"
        accept="video/*"
        multiple
      />
    </div>
    <div @click="selectAudioFile">
      <img src="../../assets/img/mydialog/audio.png" alt />
      <input
        id="audiofiles"
        type="file"
        name="audiofiles"
        @change="fileChange(4, $event)"
        accept="audio/*"
        multiple
      />
    </div>
  </div>
</template>

<script>


export default {
  data() {
    return {
      files: null,
      imagefiles: null,
      videofiles: null,
      audiofiles: null
    };
  },

  methods: {
    selectFile() {
      this.files.click();
    },
    selectImageFile() {
      this.imagefiles.click();
    },
    selectVideoFile() {
      this.videofiles.click();
    },
    selectAudioFile() {
      this.audiofiles.click();
    },

    fileChange(type, event) {
      this.$emit("sendFile", type, event.target.files)
    },

  },

  //要等到vue把元素挂载到dom上面，再执行document.getElementById函数才能确保能取到元素
  mounted() {
    (this.files = document.getElementById("files")),
      (this.imagefiles = document.getElementById("imagefiles")),
      (this.videofiles = document.getElementById("videofiles")),
      (this.audiofiles = document.getElementById("audiofiles"));

    //   console.log(this.files)
    //   console.log(this.imagefiles)
    //   console.log(this.videofiles)
    //   console.log(this.audiofiles)
  }
};
</script>


<style lang="scss" scoped>
#multipart {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  background-color: rgba(255, 250, 250, 0.75);
  > div {
    border-radius: 50%;
    > input {
      width: 0;
      height: 0;
    }
  }
}
</style>