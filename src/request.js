import Vue from 'vue'

//1 表示开发环境，0表示线上环境
let environment = 0




let localhost = "http://192.168.31.253:80"
let remotehost = "http://116.85.40.216:80"

let localserver = "http://192.168.31.253:8080"
let remoteserver = "http://116.85.40.216:8080"

let localwsserver = "ws://192.168.31.253:8080"
let remotewsserver = "ws://116.85.40.216:8080"


if (environment == 1) {
    Vue.prototype.host = localhost
    Vue.prototype.server = localserver
    Vue.prototype.wsserver = localwsserver
} else {
    Vue.prototype.host = remotehost
    Vue.prototype.server = remoteserver
    Vue.prototype.wsserver = remotewsserver

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
            }
        }).catch(err => {
            console.log("请求联系人信息时发生错误")
            console.log(err)
        })
}