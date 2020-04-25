<template></template>

<script>
import axios from "axios";
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {
    this.current_user.strid = "63495249";
    this.current_user.nickname = "lanqiukun";
    this.current_user.token = "16409691636468435972";
    this.current_user.avatar = "https://bucket20200319.oss-cn-shenzhen.aliyuncs.com/test/avatar.jpg";
    this.current_user.login = true;

    this.initWebSocket();
    return;
    let code = this.getPara("code");
    if (code == null) this.$router.replace("/login");
    else {
      axios
        .post(
          "http://116.85.40.216:8080/wstokenuserid",
          {
            code
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          let data = res.data;
          console.log(res);
          this.current_user.strid = data.id;
          this.current_user.nickname = data.nickname;
          this.current_user.avatar = data.avatar_url;
          this.current_user.token = data.ws_token;
          this.current_user.login = true;

          //   console.log(this.current_user.strid)
          //   console.log(this.current_user.nickname)
          //   console.log(this.current_user.avatar)
          //   console.log(this.current_user.ws_token)

          //   console.log("令牌、user_id请求成功");
          this.initWebSocket();
        })
        .catch(err => {
          alert("登录失败,请重试！");
          this.$router.replace("/login")
        });
    }
  }
};
</script>

