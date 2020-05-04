import Vue from 'vue'
import router from './router'


Vue.prototype.current_user = {
    strid: "",
    nickname: "",
    avatar: "",
    token: "",
    login: false
}

// let WebSocketBasicUrl = "ws://" + "116.85.40.216:8080/ws?token="

let WebSocketBasicUrl = Vue.prototype.wsserver + "/ws?token="

Vue.prototype.initWebSocket = initWebSocket

function initWebSocket() {
    console.log("initializing websocket")
    Vue.prototype.ws = new WebSocket(WebSocketBasicUrl + Vue.prototype.current_user.token + "&id=" + Vue.prototype.current_user.strid);
    Vue.prototype.ws.onopen = onopen
    Vue.prototype.ws.onmessage = onmessage
    Vue.prototype.ws.onerror = onerror
    Vue.prototype.ws.onclose = onclose
}

//默认情况下发生了error事件后（比如连接失败），websocket触发close事件关闭连接
function onerror() {
    console.log("连接失败，正在重新连接")
}


function onclose(e) {
    console.log(e)
    if (Vue.prototype.current_user.login) {
        console.log('连接中断,正在重新连接', e)
        setTimeout(() => {
            initWebSocket()
        }, 3000);
    } else
        router.replace("/").catch(a => 0)

}


function onopen() {

    console.log("websocket连接成功建立")


}

import store from './store/index.js'


// let audio = new Audio("https://bucket20200319.oss-cn-shenzhen.aliyuncs.com/mychat/audio/tips.mp3")
let audio = new Audio(require('./assets/audio/tips.mp3'))


function onmessage(e) {
    let res = JSON.parse(e.data)

    //拿到一条websocket消息

    //先看看消息状态是否为0，否则处理错误
    if (res.status == 1) {
        handle_error(res)
        return
    }


    



    



    //处理好友消息
    if (res.response_type == 0) {
        handle_message(res)
        audio.play()
        return
    }

    //处理好友请求
    if (res.response_type == 1) {

    }

    //处理群消息
    if (res.response_type == 2) {

    }

    //处理群请求
    if (res.response_type == 3) {

    }

    //处理系统消息
    if (res.response_type == 4) {

    }

    //处理连接状态消息
    if (res.response_type == 5) {

    }

    //...
}

function handle_error(res) {
    //先别重试了,用户的凭据不可用
    Vue.prototype.current_user.login = false

    alert(res.reason)
    

    if (res.code == 1)
        router.replace("/email-login").catch(a => 0)

    //让用户重新去登录页面
    router.replace("/").catch(a => 0)
}


function handle_message(res) {
    let target_contact = store.getters.getContact(res.sender_str_id)

    if (!target_contact) {
       
        //first of all 先去联系人列表里面找出发消息的这个人
        let contact = store.getters.getRelation(res.sender_str_id)

        store.state.contact.push({
            strid: contact.strid,
            avatar: contact.avatar,
            nickname: contact.nickname,
            message: []
        })
        target_contact = store.getters.getContact(res.sender_str_id)
    }




    store.getters.pushMessageAndUpdateOrder({
        selfsend: false,
        body: res.body,
        type: res.type,
        time: new Date().Format("yyyy-MM-dd hh:mm:ss")
    }, target_contact)


}

