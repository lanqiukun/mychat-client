<template>
  <div id="home">
    <myhead></myhead>
    <div style="height: 49px"></div>

    <div id="homeslot">
      <!-- <keep-alive> -->
        <router-view></router-view>
      <!-- </keep-alive> -->
    </div>

    <tabbar>
      <tabbar-item category="聊天" link="/home/chat">
        <img slot="activated" src="../../assets/img/tabbar/chat1.png" alt />
        <img slot="deactivated" src="../../assets/img/tabbar/chat0.png" alt />
      </tabbar-item>

      <tabbar-item category="联系人" link="/home/contact">
        <img slot="activated" src="../../assets/img/tabbar/contact1.png" alt />
        <img slot="deactivated" src="../../assets/img/tabbar/contact0.png" alt />
      </tabbar-item>

      <tabbar-item category="发现" link="/home/discover">
        <img slot="activated" src="../../assets/img/tabbar/discover1.png" alt />
        <img slot="deactivated" src="../../assets/img/tabbar/discover0.png" alt />
      </tabbar-item>

      <tabbar-item category="我的" link="/home/profile">
        <img slot="activated" src="../../assets/img/tabbar/profile1.png" alt />
        <img slot="deactivated" src="../../assets/img/tabbar/profile0.png" alt />
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import myhead from "../../components/myhead";
import tabbar from "../../components/tabbar";
import tabbarItem from "../../components/tabbar_item";
import axios from 'axios'

export default {
  components: {
    tabbar,
    tabbarItem,
    myhead
  },
  created() {
    console.log("home component created")
    console.log(this.current_user.strid
    )
  },

  mounted() {

    console.log("正在请求联系人数据")
    let requestContactUrl = "http://116.85.40.216:8080/getcontact?id=" + this.current_user.strid + "&token=" + this.current_user.token
    console.log(requestContactUrl)
    axios.get(requestContactUrl).then(res => {
      let data = res.data
      console.log("data is: ")
      console.log(data)
      if (data.status == 1)
        alert(data.reason)
      
      let str = data.body
      // str = '[{"nickname":"Edison","avatar":"https://bucket20200319.oss-cn-shenzhen.aliyuncs.com/test/avatar.jpg","alias":"Mychat Author","strid":"98688141287751680"}]'
      console.log("str: " + str)
      let body = JSON.parse(str)
      
      // console.log("body: ")
      // console.log(body)
      
      this.$store.state.relation = body
      console.log(this.$store.state.relation)
      console.log("初始化联系人信息成功")
    }).catch(err => {
      alert(err)
    })
  },
  destroyed() {
    console.log("home component destroyed")
  }
};
</script>

<style scoped>
#home {
  height: 100%;
}
#homeslot {
  width: 100%;
  height: calc(100% - 49px - 49px);
  overflow: scroll;
  overflow-x: hidden;
}
</style>