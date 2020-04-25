<template>
  <div id="tabbar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "tabbar",
  data() {
    return {};
  },
  methods: {

  }
};
</script>

<style scoped>
#tabbar {
  width: 100%;
  height: 49px;
  position: fixed;
  bottom: 0;
  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #f6f6f6;
  box-shadow: 0 -2px 5px rgba(100, 100, 100, 0.1);
}
</style>