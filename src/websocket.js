import Vue from 'vue'
import router from './router'


Vue.prototype.current_user = {
    strid: "",
    nickname: "",
    avatar: "",
    token: "",
    login: false
}

let WebSocketBasicUrl = "ws://" + "116.85.40.216:8080/ws?token="

// let WebSocketBasicUrl = "ws://" + "192.168.31.253:8080/ws?token="

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
    if (Vue.prototype.current_user.login) {
        console.log('连接中断,正在重新连接', e)
        setTimeout(() => {
            initWebSocket()
        }, 3000);
    } else
        router.replace("/login").catch(a => 0)

}


function onopen() {

    router.replace("/home").catch(a => 0)

}

import store from './store/index.js'


function onmessage(e) {
    let res = JSON.parse(e.data)

    //响应了已知错误
    if (res.response_type == 5 && res.status == 1) {
        handle_error(res)
        return
    }

    if (res.response_type == 0) {
        console.log(res.id)
        console.log(res.nickname)
        console.log(res.avatar)
        return
    }

    //处理message响应
    if (res.response_type == 1) {
        handle_message(res)
        return
    }

}



function handle_message(res) {
    let target_contact = store.getters.getContact(res.sender_str_id)

    if (!target_contact) {
        store.state.contact.push({
            strid: res.sender_str_id,
            avatar: null,
            nickname: null,
            message: []
        })
        target_contact = store.getters.getContact(res.sender_str_id)
    }

    Vue.prototype.user.requestBasicInfo(target_contact)

    this.$store.getters.pushMessageAndUpdateOrder({
        selfsend: false,
        body: res.body,
        time: new Date().Format("yyyy-MM-dd hh:mm:ss")
    }, target_contact)


    // target_contact.message.push({
    //     selfsend: false,
    //     body: res.body,
    //     time: new Date().Format("yyyy-MM-dd hh:mm:ss")
    // })

    // store.getters.updateContactIndex(res.sender_str_id)
}

function handle_error(res) {
    //先别重试了,用户的凭据不可用
    Vue.prototype.current_user.login = false
    alert(res.reason)
    //让用户重新去登录页面
    router.replace("/login").catch(a => 0)
}