<template>
    <div id="profile">用户id:
        {{current_user.strid}}
        <br>用户昵称：
        {{current_user.nickname}}
        <br>用户头像：
        
        <img :src="current_user.avatar" width="100px" height="100px">

        <div id="down">
            <div @click="logout">logout</div>
            <div @click="clear">清除登录信息</div>
        </div>

    </div>
</template>


<script>
import Vue from 'vue'
export default {
    name: "profile",
    data() {
        return {
            current_user: this.current_user
        }
    },
  created() {
    console.log("profile created");

  },

    methods: {
        logout() {
            

            this.current_user.strid = ""
            this.current_user.nickname = ""
            this.current_user.avatar = ""
            this.current_user.login = false
            this.ws.close();


            this.$router.replace("/")

        },
        clear() {


            
            localStorage.removeItem("strid")
            localStorage.removeItem("token")
            this.$router.replace("/")
        }
    }
}
</script>



<style lang="scss" scoped>
    #down {
        display: flex;
        justify-content: space-around;
    }
</style>