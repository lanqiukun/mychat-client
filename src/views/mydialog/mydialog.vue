<template>
  <div id="mydialog">
    <div id="mydialoghead">
      <div>
        <div id="back" @click="back_to_session">
          <img src="../../assets/img/mydialog/back.png" alt />
        </div>
        <div
          class="dialognickname"
          @click="debugInfo"
        >{{contact ? contact.nickname : relation.nickname}}</div>
        <div id="more">
          <img src="../../assets/img/mydialog/more.png" alt />
        </div>
      </div>
    </div>
    <div style="height: 49px"></div>

    <div id="mydialogbody"  @click="messagesClicked">
      <div class="messages" v-if="contact">
        <message
          v-for="(message, index) in contact.message"
          :key="index"
          :payload="message"
          :targetAvatarUrl="contact ? contact.avatar : relation.avatar"
        ></message>
      </div>
    </div>

    <div id="emojiPanel" v-if="showEmojiPanel">
      <emoji @addEmoji="addEmoji"></emoji>
    </div>

    <div id="multipartPanel" v-if="showMultipartPanel">
      <multipart @sendFile="sendFile"></multipart>
    </div>

    <div id="mydialogfoot">
      <div class="voice icon" @click="debug">
        <div>
          <img src="../../assets/img/mydialog/voice.png" alt />
        </div>
      </div>

      <div class="input">
        <input
          v-on:keyup.enter="send_message"
          type="text"
          v-model="message"
          v-focus="true"
          @focus="inputFocus"
          @blur="inputBlur"
        />
        <!-- <textarea
       
          rows="2"
          v-model="message"
          v-focus="true"
          @focus="inputFocus"
          @blur="inputBlur"
        ></textarea>-->
      </div>

      <div class="emoji icon" @click="toggleEmojiPanel">
        <div>
          <img src="../../assets/img/mydialog/emoji.png" alt />
        </div>
      </div>

      <div v-show="hasMessageContent" class="send icon" @click="click2send">
        <div>
          <img src="../../assets/img/mydialog/send.png" alt />
        </div>
      </div>

      <div v-show="!hasMessageContent" class="more icon" @click="toggleMultipartPanel">
        <div>
          <img src="../../assets/img/mydialog/domore.png" alt />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import message from "./message";
import emoji from "./emoji";
import multipart from "./multipart";


export default {
  name: "mydialog",
  data() {
    return {
      strid: null,
      contact: null,
      relation: null,
      message: "",
      showEmojiPanel: false,
      showMultipartPanel: false,
      mydialogbody: null,
    };
  },
  components: {
    message,
    emoji,
    multipart
  },

  computed: {
    hasMessageContent() {
      return this.message.length >= 1;
    }
  },
  methods: {
    messagesClicked() {
      this.showEmojiPanel = false;
      this.showMultipartPanel = false;
    },
    debug() {
      console.log(
        this.showEmojiPanel,
        this.showSendButton,
        this.showMultipartPanel
      );
    },
    debugInfo() {
      console.log(this.contact);
      console.log(this.relation);
      console.log(this.$store.state.contact);
      console.log(this.$store.state.relation);
    },
    handle_scroll() {
      console.log(this.mydialogbody.scrollHeight);
      console.log(this.mydialogbody.clientHeight);
      console.log(this.mydialogbody.scrollTop);
      


    },
    back_to_session() {
      this.$router.replace("/home/chat").catch(a => 0);
    },
    send_message(event, type = 0, file) {


      this.showSendButton = false;
      
      if (type == 0 && !this.hasMessageContent) return;


      let msg2local = {
        selfsend: true,
        type,
        body: type == 0 ? this.message : file,
        time: new Date().Format("yyyy-MM-dd hh:mm:ss")
      };


      if (!this.contact) {
        this.$store.state.contact.push({
          strid: this.relation.strid,
          avatar: this.relation.avatar,
          nickname: this.relation.nickname,
          message: []
        });
        this.contact = this.$store.getters.getContact(this.strid);
      }

      this.$store.getters.pushMessageAndUpdateOrder(msg2local, this.contact);
      if (type == 0) {
              let msg2server = {
                sender_str_id: this.current_user.strid,
                receiver_str_id: this.strid,
                type,
                body: this.message
              };
        this.ws.send(JSON.stringify(msg2server));
        this.message = "";
      }

      setTimeout(() => mydialogbody.scrollTop = mydialogbody.scrollHeight - mydialogbody.clientHeight, 50);
      setTimeout(() => mydialogbody.scrollTop = mydialogbody.scrollHeight - mydialogbody.clientHeight, 500);
    },
    addEmoji(emoji) {
      this.message += emoji;
    },

    sendFile(type, files) {
      this.showMultipartPanel = false

      for (let file of files) {
        this.send_message(null, type, file)
      }
      
    },
    
    toggleEmojiPanel() {
      this.showEmojiPanel = !this.showEmojiPanel;
    },
    toggleMultipartPanel() {
      this.showMultipartPanel = !this.showMultipartPanel;
    },
    inputFocus() {
      // this.showSendButton = true
    },
    inputBlur() {
      // this.showSendButton = false
    },
    click2send() {
      this.send_message();
      this.showEmojiPanel = false;
    }
  },
  mounted() {
    this.mydialogbody = document.getElementById("mydialogbody");


  },
  created() {
    this.strid = this.$route.params.target;
    this.contact = this.$store.getters.getContact(this.strid);
    this.relation = this.$store.getters.getRelation(this.strid);
    console.log(this.contact);
    console.log(this.relation);

    console.log("mydialog created");
  },
  destroyed() {},
  activated() {
    console.log("mydialog activated");

    this.strid = this.$route.params.target;
    this.contact = this.$store.getters.getContact(this.strid);
    this.relation = this.$store.getters.getRelation(this.strid);
  },
  deactivated() {
    console.log("mydialog deactivated");
  }
};
</script>



<style lang="scss" scoped>
#mydialog {
  height: 100%;
}

#mydialoghead {
  position: fixed;
  z-index: 1000;
  top: 0;
  width: 100%;
  background-color: #090723;
  > div {
    width: 94%;
    margin: 0 auto;
    height: 49px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
  }
}

#mydialogfoot {
  width: 100%;
  height: 35px;

  > .icon:hover {
    cursor: pointer;
  }

  border-top: thin solid rgba(128, 128, 128, 0.2);

  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
  > .input {
    width: calc(100% - 28px - 28px - 28px - 28px);
    > * {
      width: 100%;
      height: 23px;
      display: block;
      flex-grow: 1;
      padding: 0;
      margin: 0;
      border: none;
      background-color: transparent;
      position: relative;
      border-bottom: 1px solid rgba(128, 128, 128, 0.4);
      outline: none;
      overflow: hidden;
      resize: none;
    }
    > *:focus {
      border-bottom: 1px solid rgba(0, 128, 0, 0.4);
    }
  }
}

#emojiPanel,
#multipartPanel {
  position: fixed;
  width: 100%;
  bottom: 50px;
}
</style>

<style scoped>
.dialognickname {
  color: snow;
  line-height: 28px;
  font-weight: bold;
  font-size: 14px;
}

#mydialog img {
  display: block;
  width: 28px;
  height: 28px;
}

#mydialogbody {
  width: 100%;
  height: calc(100% - 49px - 36px);
  overflow-y: scroll;
}

.messages {
  margin: 0 1%;
  height: 100%;
  /* background-color: royalblue; */
}
</style>
