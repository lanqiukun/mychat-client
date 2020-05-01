<template>
  <div id="discover">
    <div>num is: {{theNum}}</div>
    <asdf :num="theNum"></asdf>
    <button @click="add">add</button>
  </div>
</template>


<script>
import asdf from "./asdf"

export default {
  name: "discover",
  data() {
    return {
      theNum: 230
    }
  },
  methods: {
    add() {
      this.theNum++
    }
  },
  components: {
    asdf
  }
};
</script>


<style scoped>
</style>