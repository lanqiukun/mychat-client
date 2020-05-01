<template>
  <div>
    <div v-if="code == null"></div>
    <div v-else>
      <h3>请稍等。。</h3>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      code: null
    };
  },
  methods: {},
  created() {

    if (!this.isMobile()) {
      localStorage.setItem("strid", "63495249");
      localStorage.setItem("token", "3110679384859815046");
    } else {
      localStorage.setItem("strid", "53718011");
      localStorage.setItem("token", "15659457055628006996");
    }

    let localStorageStrid = localStorage.getItem("strid");
    let localStorageToken = localStorage.getItem("token");
    if (!localStorageStrid || !localStorageToken) {
      console.log("local storage 没有保存凭据");

      this.code = this.getPara("code");
      if (this.code == null) this.$router.replace("/login");
      else {
        console.log(this.server);
        axios
          .post(
            this.server + "/getidtoken",
            {
              code: this.code
            },
            {
              headers: {
                "Content-Type": "application/json"
              }
            }
          )
          .then(res => {
            if (res.data.status == 1) {
              alert(res.data.reason + "请再试一次");
              this.$router.replace("/");
              return;
            }

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
            alert("未知错误，登录失败,请重试！");
            this.$router.replace("/");
          });
      }
    } else {
      console.log("尝试使用local storage保存的凭据");
      axios
        .get(
          this.server +
            "/authenticationcredentials?id=" +
            localStorageStrid +
            "&token=" +
            localStorageToken
        )
        .then(res => {
          console.log(res.data);
          console.log(res.data.valid_credentials);
          if (res.data.valid_credentials) {
            console.log("使用local storage中的凭据通过了服务器验证");
            this.current_user.strid = localStorageStrid;
            this.current_user.token = localStorageToken;
            console.log("合法用户进入home界面");
            this.$router.replace("/home");
            return;
          } else {
            console.log("local storage保存的凭据无效");

            localStorage.removeItem("strid");
            localStorage.removeItem("token");
          }
        })
        .catch(err => {
          console.log(err);
          console.log("发生了错误，正在清除local storage中的凭据");
          localStorage.removeItem("strid");
          localStorage.removeItem("token");
        });
    }
  }
};
</script>

