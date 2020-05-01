import Vue from 'vue'

//1 表示开发环境，0表示线上环境
let environment = 1




const http_protocol = "http://"
const ws_protocol = "ws://"

const devhost = "192.168.31.253"
const onlinehost = "116.85.40.216"

const front_port = ":80"
const server_port = ":8080"



if (environment == 1) {
    Vue.prototype.host =   http_protocol + devhost + front_port
    Vue.prototype.server = http_protocol + devhost + server_port
    Vue.prototype.wsserver = ws_protocol + devhost + server_port
} else {
    Vue.prototype.host =   http_protocol + onlinehost + front_port
    Vue.prototype.server = http_protocol + onlinehost + server_port
    Vue.prototype.wsserver = ws_protocol + onlinehost + server_port

}

import axios from "axios"

Vue.prototype.fillinfo = function (strid, target) {

    axios.get(Vue.prototype.server + "/contactinfo?strid=" + strid).
        then(res => {
            if (res.data.status != 0) {
                console.log("请求个人信息时发生错误")
                return
            } else {

                let body = JSON.parse(res.data.body)

                target.avatar = body.avatar
                target.nickname = body.nickname
                console.log("fillinfo finished")
                console.log(Vue.prototype.current_user)
                
                if (strid == target.strid)
                    console.log("当前用户信息获取成功")

            }
        }).catch(err => {
            console.log("请求联系人信息时发生错误")
            console.log(err)
        })
}