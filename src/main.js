import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
// 引入模块后自动生效
import '@vant/touch-emulator'
import VueTouch from 'vue-touch'
import http from './http'
import utils from './utils'

Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$utils = utils
Vue.use(Vant)
Vue.use(VueTouch, {
  name: 'v-touch'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
