<template>
  <div id="registered">注册成功，正在跳转至登录界面</div>
</template>

<script>
export default {
  mounted() {
    setTimeout(() => {
      let newcomer = this.getPara("newcomer");
      let redirectUrl = "/email-login"
      if (newcomer != null) 
        redirectUrl = redirectUrl + "?newcomer=" + newcomer
      
      this.$router.replace(redirectUrl);
    }, 2000);
  }
};
</script>