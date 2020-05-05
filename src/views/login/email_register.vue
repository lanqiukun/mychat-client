<template>
  <div id="emailLogin">
    <div class="login">
      <div class="email-password">
        <input
          type="text"
          placeholder="输入用户名(可改)"
          autocomplete="false"
          autofocus
          v-model="nickname"
          @keydown.enter="email2login"
        />
        <input
          type="text"
          placeholder="输入邮箱账号"
          autocomplete
          v-model="email"
          @keydown.enter="email2login"
        />
        <input
          type="password"
          placeholder="输入密码"
          autocomplete="false"
          v-model="password"
          @keydown.enter="email2login"
        />
      </div>

      <div v-if="!loading" class="login_button unclicked">
        <div @click="email2login">注 册</div>
      </div>

      <div v-if="loading" class="login_button">
        <img src="../../assets/img/login/loading.gif" width="auto" height="100%" />
      </div>
    </div>

    <div class="register" @click="register">登 录</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      nickname: "",
      email: "",
      password: "",
      loading: false
    };
  },
  methods: {
    register() {
      this.$router.replace("/email-login");
    },
    email2login() {
      if (!this.validateEmail(this.email)) {
        alert("邮箱格式不正确哦~");
        return;
      }
      if (this.password.length < 1) {
        alert("还没有输入密码偶~");
        return;
      }
      if (this.password.length < 6) {
        alert("密码至少要6位偶~");
        return;
      }

      this.loading = true;
    //   console.log(this.email, this.password);

      axios
        .post(
          this.server + "/email-register",
          {
            nickname: this.nickname,
            email: this.email,
            password: this.password
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          this.loading = false;

          if (res.data.status == 1) {
            alert(res.data.reason);
            this.$router.replace("/");
            return;
          }
          console.log(res.data);
          setTimeout(() => {
              alert("点击你邮箱里的注册链接来激活账户~")
          }, 200);
        })
        .catch(err => {
          this.loading = false;
          alert("注册时发生错误");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
#emailLogin {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-image: url("https://bucket20200319.oss-cn-shenzhen.aliyuncs.com/test/bg.jpg");
  background-position: center;
  background-size: cover;
  .login {
    width: 100%;
    max-width: 240px;
    .login_button {
      width: 160px;
      position: relative;
      top: 20px;
      height: 36px;
      margin: 0 auto;
      line-height: 36px;
      color: snow;
      //   font-weight: bold;
      border-radius: 5px;
      text-align: center;
    }
    .login_button.unclicked {
      background-color: transparent;
      border: 1px solid #ccc5b6;
    }
    .email-password {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      > input {
        width: 100%;
        margin: 5px;
        font-size: 18px;
        background-color: transparent;
        height: 30px;
        border: none;
        color: black;
        outline: none;
      }
    }
  }
  .register {
    color: snow;
  }
  .register:hover {
    cursor: pointer;
  }
}
</style>