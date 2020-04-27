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

    <div id="mydialogbody" @scroll="handle_scroll">
      <div class="messages" v-if="contact">
        <message
          v-for="(message, index) in contact.message"
          :key="index"
          :payload="message"
          :targetAvatarUrl="contact ? contact.avatar : relation.avatar"
        ></message>
      </div>
    </div>

    <div id="mydialogfoot">
      <div class="voice">
        <div>
          <img src="../../assets/img/mydialog/voice.png" alt />
        </div>
      </div>

      <div class="input">
        <input v-on:keyup.enter="send_message" type="text" v-model="message" v-focus="true" />
      </div>

      <div class="emoji">
        <div>
          <img src="../../assets/img/mydialog/emoji.png" alt />
        </div>
      </div>

      <div class="more">
        <div>
          <img src="../../assets/img/mydialog/domore.png" alt />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import message from "./message";

export default {
  name: "mydialog",
  data() {
    return {
      strid: null,
      contact: null,
      relation: null,
      message: ""
    };
  },
  components: {
    message
  },
  methods: {
    debugInfo() {
      console.log(this.contact);
      console.log(this.relation);
      console.log(this.$store.state.contact);
      console.log(this.$store.state.relation);
    },
    handle_scroll() {
      console.log(document.getElementById("mydialogbody").scrollHeight);
      console.log(document.getElementById("mydialogbody").clientHeight);
      console.log(document.getElementById("mydialogbody").scrollTop);
    },
    back_to_session() {
      this.$router.replace("/home/chat").catch(a => 0);
    },
    send_message() {
      let msg2server = {
        sender_str_id: this.current_user.strid,
        receiver_str_id: this.strid,
        type: 0,
        body: this.message
      };

      let msg2local = {
        selfsend: true,
        body: this.message,
        time: new Date().Format("yyyy-MM-dd hh:mm:ss")
      };

      console.log(msg2server.sender_str_id, msg2server.receiver_str_id);

      if (this.message === "") this.message = " ";

      //没有该联系人的活跃聊天
      if (!this.contact) {
        this.$store.state.contact.push({
          strid: this.relation.strid,
          avatar: this.relation.avatar,
          nickname: this.relation.nickname,
          message: []
        });
        console.log(this.relation);
        console.log(this.$store.state.contact);
        this.contact = this.$store.getters.getContact(this.strid);
        console.log(this.contact);
      }

      // console.log(this.relation)
      // console.log(this.contact)

      this.$store.getters.pushMessageAndUpdateOrder(msg2local, this.contact);

      this.ws.send(JSON.stringify(msg2server));

      this.message = "";

      let mydialogbody = document.getElementById("mydialogbody");

      for (let i = 0; i < 10; i++)
        setTimeout(() => {
          mydialogbody.scrollTop =
            mydialogbody.scrollHeight - mydialogbody.clientHeight;
        }, i * 50);
    }
  },
  computed: {},
  mounted() {
    console.log(11111111111)
    console.log(this.current_user.avatar)
    console.log(this.current_user.strid)
    console.log(this.current_user.token)
    console.log(this.current_user.nickname)
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

  border-top: thin solid rgba(128, 128, 128, 0.2);

  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
  > .input {
    width: calc(100% - 28px - 28px - 28px - 28px);
    > input {
      width: 100%;
      height: 23px;
    }
  }
  > div > input {
    display: block;
    flex-grow: 1;
    padding: 0;
    margin: 0;
    border: none;
    background-color: transparent;
    position: relative;
    border-bottom: 1px solid rgba(128, 128, 128, 0.4);
    outline: none;
  }
  > div > input:focus {
    border-bottom: 1px solid rgba(0, 128, 0, 0.4);
  }
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
