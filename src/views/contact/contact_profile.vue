<template>
    <div id="contact_profile">
        {{this.selfId}}
        <br>
        {{this.selfNickname}}
        <br>
        
        <img :src="this.selfAvatar" width="100px" height="100px">
    </div>
</template>


<script>
import Vue from 'vue'
export default {
    name: "contact_profile",
    data() {
        return {

        }
    },
    mounted() {
        console.log("contact profile")

    },

    methods: {

    }
}
</script>


<style scoped>

</style>