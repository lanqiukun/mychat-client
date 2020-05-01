<template>
  <div id="message" :class="{selfsend: payload.selfsend}">
    <div class="avatar">
      <img v-if="payload.selfsend" :src="selfAvatar" alt />
      <img v-else :src="targetAvatarUrl" alt />
    </div>

    <div v-if="payload.type == 0" class="text">
      <span>{{payload.body}}</span>
    </div>

    <div v-if="payload.type == 1" class="file">
      <span>file:{{payload.body}}</span>
    </div>

    <div v-if="payload.type == 2" class="image" :class="{imageContainerfullscreen}" @click="imageContainerClicked">
      <img :src="payload.body" alt />
    </div>

    <div v-if="payload.type == 3" class="video">
      <span>video:{{payload.body}}</span>
    </div>

    <div v-if="payload.type == 4" class="audio">
      <span>audio:{{payload.body}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    payload: Object,
    targetAvatarUrl: String
  },
  data() {
    return {
      selfAvatar: this.current_user.avatar,
      imageContainerfullscreen: false,
    };
  },
  methods: {
    imageContainerClicked() {
      this.imageContainerfullscreen = !this.imageContainerfullscreen;
      
    },
    sendFile(e) {

      let config = {
                      headers: { "Content-Type": "multipart/form-data" },
                      onUploadProgress: myProgressEvent => {
                        if (myProgressEvent.lengthComputable) 
                          console.log(myProgressEvent.loaded, myProgressEvent.total)                       
                      },
                    };

      let uploadUrl = this.server + "/upload";

      axios
        .post(uploadUrl, param, config)
        .then(res => {
        
          if (res.data.status == 0) {
            console.log(res.data)
          } else {
            alert(res.data.reason);
          }
        })
        .catch(err => {
          alert(err);
        });
    },
  }
};
</script>

<style lang="scss" scoped>
$avatar_size: 40px;
$bubble_color: #ffc78e;
$bubble_selfsend_color: rgba(100, 124, 237, 0.5);

#message.selfsend {
  flex-direction: row-reverse;
}

#message.selfsend > .text > span {
  background-color: $bubble_selfsend_color;
  margin: 10px 10px 5px 0px;

  padding: 5px 8px;
  display: inline-block;
  border-radius: 4px;
  position: relative;
}

// #message.selfsend > .text > span::before {
//   content: "";
//   border: 8px solid transparent;

//   border-left: 8px solid $bubble_selfsend_color;

//   position: absolute;
//   top: 6px;
//   right: -16px;
// }

// #message.selfsend > .text > span::after {
//   content: none;
// }

#message {
  padding-top: 5px;
  display: flex;
  width: 100%;

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

  flex-wrap: nowrap;
  > .avatar > img {
    display: block;
    width: $avatar_size;
    height: $avatar_size;
  }
  > .text {
    max-width: calc(100% - 60px);
  }
  > .text > span {
    background-color: $bubble_color;
    padding: 5px 8px;
    display: inline-block;
    border-radius: 4px;
    margin: 10px 0 5px 10px;
    position: relative;
    white-space: pre;
  }
  // > .text > span::after {
  //   content: "";
  //   border: 8px solid transparent;
  //   border-right: 8px solid $bubble_color;
  //   position: absolute;
  //   top: 6px;
  //   left: -16px;
  // }
}
</style>