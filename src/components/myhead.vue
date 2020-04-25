<template>
  <div id="myhead">
    <div id="title">MyChat</div>
    <div id="icons">
      <div id="search">
        <img src="../assets/img/myhead/search.png" alt />
      </div>
      <div id="add">
        <img src="../assets/img/myhead/add.png" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {

  }
};
</script>

<style scoped>
#myhead {
  width: 100%;
  height: 49px;

  position: fixed;
  top: 0;
  z-index: 1000;

  font-weight: bolder;

  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #090723;
  box-shadow: 0 -2px 5px rgba(100, 100, 100, 0.5);
}

#title {
  line-height: 100%;
  color: snow;
  position: relative;
  left: 5%;
}

#icons {
  height: 100%;
  position: relative;
  right: 5%;

  display: flex;
  justify-content: center;
  align-items: center;
}

#icons img {
  display: block;

  margin: 0 10px;
  width: 24px;
  height: 24px;
}
</style>
