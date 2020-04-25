<template>
  <div id="session">
    <div
      class="item"
      v-for="(item, index) in this.contact"
      :key="index"
      @click="open_dialog(item.strid)"
    >
      <div class="avatar">
        <img :src="item.avatar" alt />
      </div>

      <div class="middle">
        <div class="nickname">
          <span>{{item.nickname}}</span>
        </div>

        <div class="lastmessage">
          <div>{{item.message.slice(-1)[0].body}}</div>
        </div>
      </div>

      <div class="lasttime">
        <span>{{item.message.slice(-1)[0].time}}</span>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "chat",
  data() {
    return {
      contact: this.$store.state.contact
    };
  },
  methods: {
    open_dialog(strid) {
      this.$router.replace("/mydialog/" + strid).catch(a => 0);
    }
  },
  components: {},
  created() {
    console.log("chat created");
  },
  destroyed() {
    console.log("chat destroy");
  }
};
</script>


<style scoped>
#session {
  width: 100%;
}

#session > :first-child {
  margin-top: 2px;
}

#session > .item {
  border-bottom: thin solid rgba(128, 128, 128, 0.1);
}

#session > :last-child.item {
  border-bottom: unset;
}

.item {
  width: 98%;
  height: 52px;
  margin: 0px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1px;
  margin-top: 0;
}

.item:hover {
  cursor: pointer;
}

.avatar {
  position: relative;
  width: 52px;
}

.avatar > * {
  display: block;
  width: 47px;
  height: 47px;
}

.middle {
  flex-grow: 1;
  width: calc(100% - 160px);
  height: 46px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0 2px;
  flex-shrink: 1;
}

.middle > :first-child {
  font-size: 16px;
  font-weight: lighter;
  margin-bottom: 6px;
}

.middle > :last-child {
  font-family: cursive;
  font-size: 12px;
  letter-spacing: 1px;
}

.lastmessage div {
  height: 13px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.lasttime {
  font-family: quicksand;
  display: block;
  width: 80px;
  position: relative;
  right: 2%;
  bottom: 10px;
  font-size: 14px;
}
</style>