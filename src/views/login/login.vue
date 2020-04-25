<template>
  <div id="login">
    <div id="github" @click="github_login">
      <div>
        <img :class="{'rotate': !clicked}" src="../../assets/img/login/github.png" alt />
        <div v-if="clicked">GitHub登录</div>
      </div>
    </div>
    <!-- login page
        <input type="text" placeholder="请输入账号" @keydown.enter="login" v-model="account" autofocus>
    <div @click="login">登录</div>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      clicked: true
    };
  },
  methods: {
    getQueryVariable(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
          return pair[1];
        }
      }
      return null;
    },

    github_login() {
      this.clicked = false;
      
      if (this.getQueryVariable("code") == null)
        window.location.href =
          "https://github.com/login/oauth/authorize?client_id=ba3fb2199f63b790df64";
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.rotate {
    transition-duration: 60s;
    transform: rotate(20000deg);
}

#login {
  width: 100%;
  height: 100%;
  background-image: url("https://bucket20200319.oss-cn-shenzhen.aliyuncs.com/test/bg.jpg");
  background-position: center;
  background-size: cover;
  > #github {
    position: fixed;
    width: 100%;
    bottom: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    animation-delay: 0ms;
    animation-duration: 1600ms;
    animation-timing-function: ease;
    animation-iteration-count: initial;
    animation-name: down;

    > div > div {
      animation-delay: 100ms;
    }

    > div {
      height: 160px;
      margin-top: 10px;
      font-weight: bold;
    }
  }
}

@keyframes down {
  from {
    bottom: 0;
  }
}
</style>