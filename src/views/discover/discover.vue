<template>
  <div id="discover">
    <div style="heght: 50px"></div>discover
    <router-view></router-view>
    <div @click="closews">close ws</div>
  </div>
</template>


<script>
export default {
  name: "discover",
  methods: {
    closews() {
      ws.close()
    }
  }
};
</script>


<style scoped>
</style>