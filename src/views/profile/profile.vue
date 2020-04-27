<template>
    <div id="profile">
        {{current_user.strid}}
        <br>
        {{current_user.nickname}}
        <br>
        
        <img :src="current_user.avatar" width="100px" height="100px">
        <div @click="logout">logout</div>
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
            
            localStorage.removeItem("strid")
            localStorage.removeItem("token")

            this.current_user.strid = ""
            this.current_user.nickname = ""
            this.current_user.avatar = ""
            this.current_user.login = false
            this.ws.close();

            this.$router.replace("/")

        }
    }
}
</script>


<style scoped>

</style>