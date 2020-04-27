import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



require('./assets/css/nomalize.css')
require('./assets/css/basic.css')
require('./assets/css/font.css')

require('./utils.js')

//websocket有依赖于request.js的变量
require('./request.js')
require('./websocket.js')

