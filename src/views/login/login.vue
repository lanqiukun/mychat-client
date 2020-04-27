<template>
  <div id="login">
    <div id="github" @click="github_login">
      <div class="icon">
        <img :class="{'rotate': !clicked}" src="../../assets/img/login/github.png" alt />
      </div>
      <div class="description">
        <div v-if="clicked">GitHub登录</div>
      </div>
    </div>
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
        window.location.href = "https://github.com/login/oauth/authorize?client_id=ba3fb2199f63b790df64&scope=user:email";
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
    width: 100%;
    height: 100%;

    .icon,
    .description {
      position: fixed;
      width: 100%;
      margin: 0 auto;
      animation-duration: 1600ms;
      animation-timing-function: ease;
      animation-iteration-count: initial;
      animation-name: raise;
    }

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      bottom: 35%;

      animation-delay: 0ms;
    }

    .description {
      display: flex;
      justify-content: center;
      align-items: center;
      bottom: calc(35% - 25px);
      

      animation-delay: 120ms;
      font-weight: bolder;
    }
  }
}

@keyframes raise {
  from {
    position: fixed;
    bottom: 0;
  }
}
</style>