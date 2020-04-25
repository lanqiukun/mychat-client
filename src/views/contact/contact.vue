<template>
  <div id="contact">
    <div id="relation">
      <div
        class="relation"
        v-for="(item, index) in relation"
        :key="index"
        @click="open_dialog(item.strid)"
      >
        <div class="avatar">
          <img :src="item.avatar" alt />
        </div>

        <div class="alias">
          <span>{{item.alias ? item.alias : item.nickname}}</span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "contact",
  data() {
    return {
      relation: this.$store.state.relation
    };
  },
  methods: {
    open_dialog(strid) {
      console.log(strid);
      this.$router.replace("/mydialog/" + strid).catch(a => 0);
    }
  },
  created() {
    console.log("contact created");
  },

  destroyed() {
    console.log("contact destroy");
  }
};
</script>


<style scoped>
.relation {
  width: 98%;
  height: 52px;
  margin: 0px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1px;
  margin-top: 0;
}

.relation:hover {
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

.relation > :last-child {
  flex-grow: 1;
  font-family: quicksand, cursive;
  font-weight: 700;
}
</style>