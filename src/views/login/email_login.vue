<template>
  <div id="email2login">
    <div class="login">
      <div class="email-password">
        <input
          type="text"
          placeholder="输入邮箱账号"
          autocomplete
          autofocus
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
        <div @click="email2login">登 录</div>
      </div>

      <div v-if="loading" class="login_button">
        <img src="../../assets/img/login/loading.gif" width="auto" height="100%" />
      </div>
    </div>

    <div class="register">注 册</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      loading: false
    };
  },
  methods: {
    email2login() {
      if (!this.validateEmail(this.email)) {
        alert("邮箱格式不正确哦~");
        return;
      }
      if (this.password.length < 1) {
        alert("还没有输入密码偶~");
        return;
      }
      this.loading = true;
      console.log(this.email, this.password);

      axios
        .post(
          this.server + "/verifyemailpassword",
          {
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

          let data = res.data;

          console.log(res);
          this.current_user.strid = data.strid;
          this.current_user.nickname = data.nickname;
          this.current_user.avatar = data.avatar_url;
          this.current_user.token = data.token;
          this.current_user.login = true;

          //将凭据写入localStorage
          localStorage.setItem("strid", data.strid);
          localStorage.setItem("token", data.token);

          console.log("已将凭据保存至local storage");
          console.log("令牌、user_id请求成功");
          console.log("合法用户进入home界面");

          this.$router.replace("/home");
        })
        .catch(err => {
          this.loading = false;
          alert("登录时发生错误");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
#email2login {
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
      background-color: rgba(100, 149, 237, 0.5);
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
}
</style>